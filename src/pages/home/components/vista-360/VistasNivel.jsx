import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { track } from "../../../../analytics/track";
import { TRACK } from "../../../../analytics/track.constants";

import chevronIcon from "../../../../assets/icons/arrow.svg";

export function VistasNivel({ nivelId, nivel, onVolver, photoRef }) {
  const [activa, setActiva] = useState(0);

  // Lista unificada: si hay video, va primero y ocupa el lugar de la 1.ª imagen
  const medios = nivel.video
    ? [
        { tipo: "video", src: nivel.video, poster: nivel.imagenes[0] },
        ...nivel.imagenes.slice(1).map((src) => ({ tipo: "imagen", src })),
      ]
    : nivel.imagenes.map((src) => ({ tipo: "imagen", src }));

  const total = medios.length;
  const ir = (dir) => {
    track(
      dir === 1
        ? TRACK.vista360.carousel.next(nivelId)
        : TRACK.vista360.carousel.prev(nivelId),
    );

    setActiva((i) => (i + dir + total) % total);
  };
  const medio = medios[activa];
  const seleccionarMedio = (index) => {
    if (index === activa) return;

    track(TRACK.vista360.carousel.media(nivelId, index + 1));
    setActiva(index);
  };

  return (
    <div className="self-center flex flex-col gap-[30px] xl:gap-[20px] w-full min-w-0 max-w-[592px]">
      {/* Volver: arriba en pantallas chicas */}
      <div className="max-md:hidden flex xl:hidden max-md:pl-[10px]">
        <button
          type="button"
          onClick={onVolver}
          className="flex items-center w-fit px-[20px] py-[15px] gap-[10px] rounded-[10px] button-big font-bold bg-naranja text-blanco uppercase cursor-pointer"
        >
          <img src={chevronIcon} alt="" className="rotate-180 h-[16px] w-fit" />
          <span>Volver</span>
        </button>
      </div>

      <h2 className="max-md:text-center font-bangla font-light header-3 tracking-wide leading-none text-blanco">
        VISTAS 360°
      </h2>
      <h3 className="max-md:text-center font-bangla header-2 leading-tight text-naranja">
        {nivel.titulo}
      </h3>

      {/* Carrusel de imágenes y videos */}
      <div className="flex flex-col-reverse xl:flex-col gap-[30px] xl:gap-[20px] min-w-0">
        {/* Medio principal con crossfade */}
        <div
          ref={photoRef}
          className="relative w-full aspect-[592/408] overflow-hidden border-2 border-naranja bg-azul"
        >
          <AnimatePresence initial={false}>
            {medio.tipo === "video" ? (
              <motion.video
                key={activa}
                src={medio.src}
                poster={medio.poster}
                controls={false}
                autoPlay
                muted
                loop
                playsInline
                aria-label={`Video de las vistas del ${nivel.titulo}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              <motion.img
                key={activa}
                src={medio.src}
                alt={`Vista ${activa + 1} del ${nivel.titulo}`}
                draggable={false}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 size-full object-cover"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Miniaturas + flechas */}
        <div className="flex items-center w-full min-w-0 gap-[8px] sm:gap-[12px] max-md:px-[10px]">
          <button
            type="button"
            onClick={() => ir(-1)}
            aria-label="Anterior"
            className="group flex shrink-0 justify-center items-center w-[24px] p-[6px] bg-naranja hover:bg-gris active:bg-azul active:shadow-dropshadow rounded-[5.7px] cursor-pointer"
          >
            <img
              src={chevronIcon}
              alt=""
              className="w-full rotate-180 group-hover:opacity-80 group-active:opacity-80"
            />
          </button>

          <ul className="flex flex-1 min-w-0 gap-[8px] sm:gap-[14px]">
            {medios.map((m, i) => (
              <li key={i} className="flex-1 min-w-0 aspect-square">
                <button
                  type="button"
                  onClick={() => seleccionarMedio(i)}
                  aria-label={
                    m.tipo === "video" ? "Ver video" : `Ver imagen ${i + 1}`
                  }
                  aria-current={i === activa}
                  className={`relative block size-full overflow-hidden border-2 cursor-pointer transition-opacity ${
                    i === activa
                      ? "border-naranja"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={m.tipo === "video" ? m.poster : m.src}
                    alt=""
                    draggable={false}
                    className="size-full object-cover"
                  />

                  {/* Indicador de reproducción solo en la miniatura del video */}
                  {m.tipo === "video" && (
                    <span
                      aria-hidden
                      className="absolute inset-0 grid place-items-center bg-azul/30"
                    >
                      <span className="grid place-items-center size-[36px] rounded-full bg-naranja">
                        <svg
                          viewBox="0 0 24 24"
                          className="size-[16px] ml-[2px] fill-blanco"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => ir(1)}
            aria-label="Siguiente"
            className="group flex shrink-0 justify-center items-center w-[24px] p-[6px] bg-naranja hover:bg-gris active:bg-azul active:shadow-dropshadow rounded-[5.7px] cursor-pointer"
          >
            <img
              src={chevronIcon}
              alt=""
              className="w-full group-hover:opacity-80 group-active:opacity-80"
            />
          </button>
        </div>
      </div>

      {/* Volver: abajo en xl */}
      <button
        type="button"
        onClick={onVolver}
        className="hidden xl:flex items-center w-fit px-[20px] py-[15px] gap-[10px] rounded-[10px] button-big font-bold bg-naranja hover:bg-gris active:bg-azul active:shadow-dropshadow text-blanco hover:text-blanco/80 active:text-blanco/80 uppercase cursor-pointer"
      >
        <img src={chevronIcon} alt="" className="rotate-180 h-[16px] w-fit" />
        <span>Volver</span>
      </button>
    </div>
  );
}
