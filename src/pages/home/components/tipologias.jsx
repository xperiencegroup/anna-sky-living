import { useSearchParams } from "react-router";
import { track } from "../../../analytics/track";
import { TRACK } from "../../../analytics/track.constants";

const tipoA = "/foto/tipologias/tipo-a.png";
const tipoB = "/foto/tipologias/tipo-b.png";
const tipoC = "/foto/tipologias/tipo-c.png";
const tipoD = "/foto/tipologias/tipo-d.png";
const tipoE = "/foto/tipologias/tipo-e.png";
const tipoF = "/foto/tipologias/tipo-f.png";
const tipoLO = "/foto/tipologias/tipo-lock-off.png";

import imageIcon from "../../../assets/icons/imagen.svg";
import Reveal from "../../../components/animations/reveal";

const modelos = [
  {
    id: "tipo-a",
    label: "Modelo tipo a",
    image: tipoA,
  },
  {
    id: "tipo-b",
    label: "Modelo tipo b",
    image: tipoB,
  },
  {
    id: "tipo-c",
    label: "Modelo tipo c",
    image: tipoC,
  },
  {
    id: "tipo-d",
    label: "Modelo tipo d",
    image: tipoD,
  },
  {
    id: "tipo-e",
    label: "Modelo tipo e",
    image: tipoE,
  },
  {
    id: "tipo-f",
    label: "Modelo tipo f",
    image: tipoF,
  },
];

export default function Tipologias() {
  const [, setSearchParams] = useSearchParams();

  const abrirModal = (modelo) => {
    track(TRACK.modelos.ver(modelo.id));
    setSearchParams({ modelo: modelo.id });
  };

  return (
    <section
      id="modelos"
      className="w-full flex flex-col justify-center items-center py-[45px] md:py-[60px] px-[20px] gap-[30px] bg-blanco"
    >
      <div className="flex flex-col justify-center items-center gap-[15px]">
        <Reveal>
          <h2 className="header-2 font-bangla text-negro uppercase tracking-wider">
            Tipologías
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="paragraph text-center font-light w-full max-w-[632px] lg:max-w-[1100px] text-negro">
            Siete modelos diseñados para diferentes estilos de vida, con
            distribuciones funcionales y acabados de primera
          </p>
        </Reveal>
      </div>

      {/* Modelos */}
      <div className="flex w-full max-w-[1200px] flex-wrap justify-center gap-[20px]">
        {modelos.map((modelo) => {
          return (
            <div
              key={modelo.id}
              className="flex flex-col justify-between items-center w-full max-w-[374px] h-[313px] p-[20px] gap-[15px] border border-naranja rounded-[15px] shadow-md"
            >
              <div className="relative w-full max-w-[244px] h-[174px]">
                <img
                  src={modelo.image}
                  alt={`Imagen ${modelo.label}`}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col items-center shrink-0 gap-[10px]">
                <h3 className="header-model text-center font-bangla leading-none uppercase text-negro">
                  {modelo.label}
                </h3>
                <button
                  onClick={() => abrirModal(modelo)}
                  className="flex w-fit px-[36px] py-[16px] gap-[10px] justify-center items-center button-big font-bold tracking-wide leading-none rounded-[10px] bg-naranja hover:bg-gris active:bg-azul hover:drop-shadow-xl active:drop-shadow-xl uppercase hover:cursor-pointer"
                >
                  <img
                    src={imageIcon}
                    alt="Ícono de imagen"
                    className="w-[18px]"
                  />
                  Ver modelo
                </button>
              </div>
            </div>
          );
        })}

        <div className="flex flex-col min-[808px]:flex-row justify-center items-center w-full max-w-[375px] min-[808px]:max-w-[768px] min-[1202px]:max-w-[1166px] h-[410px] min-[808px]:h-[313px] p-[20px] gap-[15px] border border-naranja rounded-[15px] shadow-md">
          {/* image */}
          <div className="relative w-full max-w-[421px] h-[284px]">
            <img
              src={tipoLO}
              alt="Modelo Lock Off"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>

          {/* Texto */}
          <div className="flex flex-col w-full max-w-[631px] justify-between items-center text-center gap-[20px]">
            <h3 className="header-2 font-bangla uppercase text-negro">
              Modelo Lock off
            </h3>
            <p className="paragraph-icon font-bold text-negro">
              Distribución de 2 departamentos con 2 recamaras
              <br />
              abajo de la planta arquitectónica
            </p>
            <button
              onClick={() =>
                abrirModal({
                  id: "lock-off",
                })
              }
              className="flex w-fit px-[36px] py-[16px] gap-[10px] justify-center items-center button-big font-bold tracking-wide leading-none rounded-[10px] bg-naranja hover:bg-gris active:bg-azul hover:drop-shadow-xl active:drop-shadow-xl uppercase hover:cursor-pointer"
            >
              <img src={imageIcon} alt="Ícono de imagen" className="w-[18px]" />
              Ver modelo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
