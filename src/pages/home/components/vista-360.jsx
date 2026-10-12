import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useIsXl } from "../../../hooks/useIsXl";
import { useElbowPath } from "../../../hooks/useElbowPath";
import { track } from "../../../analytics/track";
import { TRACK } from "../../../analytics/track.constants";

import towerImage from "../../../assets/images/temporal/vista-360.jpg";
import imagenIcon from "../../../assets/icons/vista-360/imagen.svg";
import clickIcon from "../../../assets/icons/vista-360/click.svg";
import chevronIcon from "../../../assets/icons/arrow.svg";

// vistas
import { VistasNivel } from "./vista-360/VistasNivel";
import { nivelesInfo } from "../../../data/vista-360/niveles";

// Ajusta estos valores a tu render de la torre
const IMG_W = 631;
const IMG_H = 810;
const TOWER = {
  xl: { x: 190, w: 270 }, // ≥ 1280px, image con xMidYMid
  base: { x: 165, w: 320 }, // < 1280px, image con none (mídelas)
};
const FIRST_Y = 18; // y del primer nivel
const heights = [
  60 /*nivel 28*/, 34 /*nivel 27*/, 36.5 /*nivel 26*/, 37 /*nivel 25*/,
  34 /*nivel 24*/, 37 /*nivel 23*/, 36.5 /*nivel 22*/, 34 /*nivel 21*/,
  35 /*nivel 20*/, 32.5 /*nivel 19*/, 34 /*nivel 18*/, 33 /*nivel 17*/,
  33 /*nivel 16*/, 40 /*nivel 15*/, 34 /*nivel 14*/, 32 /*nivel 12*/,
  34.5 /*nivel 11*/, 34 /*nivel 10*/, 35.5 /*nivel 9*/,
];

const LEVEL_GAP = 0;
const FIRST_LEVEL = 9;
const SKIPPED_LEVELS = [13]; // niveles que no existen en la torre

// Números reales de nivel, de abajo hacia arriba: 9, 10, 11, 12, 14, 15...
const levelNumbers = [];
for (let n = FIRST_LEVEL; levelNumbers.length < heights.length; n++) {
  if (!SKIPPED_LEVELS.includes(n)) levelNumbers.push(n);
}

const levels = heights.reduce((acc, h, i) => {
  const y = i === 0 ? FIRST_Y : acc[i - 1].y + acc[i - 1].h;
  acc.push({
    id: levelNumbers[heights.length - 1 - i], // el de arriba es el número más alto
    y,
    h,
  });
  return acc;
}, []);

const first = levels[0];
const last = levels[levels.length - 1];
const span = last.y - first.y;

const sweep = {
  y: levels.map((l) => l.y),
  height: levels.map((l) => l.h),
};

const AUTOPLAY_MS = 1000; // tiempo entre niveles
const SWEEP_S = 28; // segundos que tarda en recorrer toda la torre

export default function Vista360({ onSelectLevel }) {
  const [selected, setSelected] = useState(FIRST_LEVEL); // empieza en el primer nivel
  const [autoplay, setAutoplay] = useState(true);
  const [openLevel, setOpenLevel] = useState(null);

  const isXl = useIsXl();
  const { x: TOWER_X, w: TOWER_W } = isXl ? TOWER.xl : TOWER.base;

  // funciones principales
  const handleSelect = (id) => {
    track(TRACK.vista360.nivel(id));

    setAutoplay(false);
    setSelected(id);
    setOpenLevel(id);
    onSelectLevel?.(id);
  };

  const handleVolver = () => {
    if (openLevel !== null) {
      track(TRACK.vista360.volver(openLevel));
    }

    setOpenLevel(null);
    setAutoplay(true);
  };

  const times = levels.map((l) => (l.y - first.y) / span);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setSelected((prev) => (prev >= levels.length ? 1 : prev + 1));
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [autoplay]);

  const current = levels.find((l) => l.id === selected);

  // linea que enlaza nivel e imagen
  const rootRef = useRef(null);
  const [photoEl, setPhotoEl] = useState(null);

  const path = useElbowPath({
    rootRef,
    photoEl,
    levelId: openLevel,
    enabled: isXl,
  });

  return (
    // min-h-[1150px] para que la imagen no se estire y se vean todos los niveles de arriba
    <div
      ref={rootRef}
      className="relative self-center flex flex-col xl:flex-row w-full h-full xl:min-h-[1150px]"
    >
      {/* Columna izquierda: texto */}
      <div className="w-full flex items-center justify-center xl:justify-start xl:pl-[60px] pt-[40px]">
        <AnimatePresence mode="wait">
          {openLevel === null ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="xl:mx-auto flex flex-col gap-[20px] pb-[40px]"
            >
              <h2 className="font-bangla font-light header-3 tracking-wide leading-none text-blanco">
                VISTAS 360°
              </h2>

              <h3 className="font-bangla header-2 leading-tight text-blanco/90">
                EXPLORA LAS VISTAS
                <br />
                DESDE CADA NIVEL
              </h3>

              <p className="paragraph leading-snug font-extralight text-blanco max-w-[24ch]">
                Selecciona un nivel en la torre para conocer sus vistas 360°
              </p>

              <ul className="relative flex flex-col gap-[27px]">
                {/* línea conectora entre iconos */}
                <span
                  aria-hidden
                  className="absolute left-[25px] top-[51px] h-[28px] w-px bg-amarillo"
                />

                <li className="flex items-center gap-4">
                  <span className="grid place-items-center size-[51px] border border-amarillo text-amarillo">
                    <img
                      src={clickIcon}
                      alt="Ícono de click"
                      className="w-auto h-[35px]"
                    />
                  </span>
                  <span className="paragraph font-semibold tracking-wide text-blanco">
                    ELIGE UN NIVEL
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="grid place-items-center size-[51px] border border-amarillo text-amarillo">
                    <img
                      src={imagenIcon}
                      alt="Ícono de imagen"
                      className="w-[35px] h-auto"
                    />
                  </span>
                  <span className="paragraph font-semibold tracking-wide text-blanco">
                    EXPLORA SUS VISTAS
                  </span>
                </li>
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key={`nivel-${openLevel}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:mx-auto min-h-[480px] xl:min-h-svh flex items-center min-[592px]:pb-[40px] xl:pr-[40px]"
            >
              <VistasNivel
                nivelId={openLevel}
                photoRef={setPhotoEl}
                nivel={nivelesInfo[openLevel]}
                onVolver={handleVolver}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Columna derecha: torre */}
      <div className="relative w-full max-[680px]:max-w-[687px] max-xl:w-full xl:max-w-[655px] mx-auto aspect-[631/810] xl:mx-0 xl:aspect-auto xl:h-auto overflow-hidden">
        <svg
          viewBox={`0 0 ${IMG_W} ${IMG_H}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full"
          role="group"
          aria-label="Torre con vistas 360° desde cada nivel"
        >
          {/* Menos de 1280px: estirada para llenar la caja, más de 1280px: mantiene ratio fijo */}
          <image
            href={towerImage}
            width={IMG_W}
            height={IMG_H}
            preserveAspectRatio={isXl ? "xMidYMid" : "none"}
            draggable={false}
          />

          {/* Rectángulo naranja único: es el que se desplaza */}
          {(autoplay || current) && (
            <motion.rect
              x={TOWER_X}
              y={0}
              width={TOWER_W}
              initial={{ y: first.y, height: first.h - LEVEL_GAP }}
              animate={
                autoplay
                  ? sweep
                  : { y: current.y, height: current.h - LEVEL_GAP }
              }
              transition={
                autoplay
                  ? {
                      duration: SWEEP_S,
                      ease: "linear",
                      times,
                      repeat: Infinity,
                      repeatType: "loop", // al llegar abajo vuelve arriba
                    }
                  : { type: "spring", bounce: 0, duration: 0.5 }
              }
              vectorEffect="non-scaling-stroke"
              strokeWidth={2}
              className="pointer-events-none relative fill-naranja/45 stroke-naranja"
            />
          )}

          {/* Zonas clicables + etiqueta, una por nivel */}
          {levels.map(({ id, y, h }) => (
            <g key={id} className="group">
              <rect
                data-level={id}
                x={TOWER_X}
                y={y}
                width={TOWER_W}
                height={h - LEVEL_GAP}
                role="button"
                tabIndex={0}
                aria-label={`Nivel ${id}`}
                aria-pressed={selected === id}
                vectorEffect="non-scaling-stroke"
                strokeWidth={2}
                onClick={() => handleSelect(id)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && handleSelect(id)
                }
                className="cursor-pointer outline-none fill-transparent stroke-transparent transition-colors duration-200 hover:fill-naranja/30 focus-visible:stroke-blanco"
              />

              <text
                x={TOWER_X + TOWER_W / 2} // centro horizontal del nivel
                y={y + (h - LEVEL_GAP) / 2} // centro vertical del nivel
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize={12}
                aria-hidden
                className="hidden group-hover:block pointer-events-none select-none font-bold fill-blanco"
              >
                NIV. {id}
              </text>
            </g>
          ))}
        </svg>

        {/* linear gradient */}
        <div className="pointer-events-none absolute w-full h-full inset-0 bg-linear-to-r from-azul via-15% via-azul/10 to-azul/30"></div>

        <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 caption text-center font-light text-blanco">
          Imágenes con fines ilustrativos*
        </p>
      </div>

      {/* botón volver < 800px ancho viewport */}
      {openLevel && (
        <div className="md:hidden flex w-full justify-center items-center pt-[30px] pb-[55px] px-[40px]">
          <button
            type="button"
            onClick={handleVolver}
            className="group flex items-center justify-center w-full max-w-[295px] px-[20px] py-[15px] gap-[10px] rounded-[10px] button-big font-bold bg-naranja hover:bg-gris text-blanco uppercase cursor-pointer"
          >
            <img
              src={chevronIcon}
              alt=""
              className="rotate-180 h-[16px] w-fit"
            />
            <span>Volver</span>
          </button>
        </div>
      )}

      {isXl && (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
        >
          <AnimatePresence mode="wait">
            {path && (
              <motion.path
                key={path.id}
                d={path.d}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                fill="none"
                strokeWidth={2}
                strokeLinejoin="round"
                className="stroke-naranja"
              />
            )}
          </AnimatePresence>
        </svg>
      )}
    </div>
  );
}
