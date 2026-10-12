const conoceImage = "/foto/conoce-proyecto.jpg";
import { usePopupStore } from "../../../store/usePopupStore";

// icons
import ubicacionIcon from "../../../assets/icons/pin.svg";
import disenoIcon from "../../../assets/icons/diseno.svg";
import plusvaliaIcon from "../../../assets/icons/plusvalia.svg";

import descargar from "../../../assets/icons/descargar.svg";
import Reveal from "../../../components/animations/reveal";
import { track } from "../../../analytics/track";
import { TRACK } from "../../../analytics/track.constants";

const caracteristicas = [
  {
    label: "Ubicación",
    description:
      "En el corazón  de una zona estratégica, cerca de todo lo que necesitas.",
    icon: ubicacionIcon,
  },
  {
    label: "Diseño",
    description:
      "Arquitectura contemporánea con acabados de lujo, diseñada por Luis Azcunaga Arquitectos.",
    icon: disenoIcon,
  },
  {
    label: "Plusvalía",
    description:
      "Inversión inteligente en un proyecto con alto potencial de crecimiento.",
    icon: plusvaliaIcon,
  },
];

export default function ConoceElProyecto() {
  const openPopup = usePopupStore((state) => state.openPopup);

  return (
    <section
      id="conoce-proyecto"
      className="flex justify-center items-center w-full bg-blanco"
    >
      <div className="flex flex-col xl:flex-row w-full max-w-[1280px] justify-center items-center gap-[40px]">
        {/* Left panel */}
        <div className="flex flex-col w-full max-w-[700px] xl:w-[620px] px-[44px] md:px-[50px] xl:px-0 pt-[60px] xl:pb-[60px] gap-[30px] md:gap-[15px]">
          <div className="flex flex-col gap-[30px] xl:gap-[15px]">
            <Reveal delay={0}>
              <h2 className="header-2 text-negro font-bangla uppercase leading-[120%] tracking-wide">
                Conoce el proyecto
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="paragraph font-light leading-[120%] text-azul-intenso">
                <span className="font-bold">ANNA SKY LIVING</span> representa
                una nueva forma de vivir la ciudad.
                <br />
                <br />
                Un proyecto que combina diseño, funcionalidad y experiencias en
                un entorno pensado para elevar la vida cotidiana. Su
                arquitectura contemporánea desarrollada por el despacho de
                arquitectos Luis Azcunaga, y sus espacios cuidadosamente
                planeados crean un equilibrio entre privacidad, bienestar y
                convivencia.
                <br />
                <br />
                Más que un conjunto residencial, es una comunidad donde cada
                detalle ha sido concebido para ofrecer comodidad y valor a largo
                plazo.
                <br />
                Las amenidades, las áreas de encuentro y los espacios de
                recreación complementan una propuesta que responde a las
                necesidades de un estilo de vida moderno y dinámico.
              </p>
            </Reveal>
          </div>

          {/* Características */}
          <div className="flex flex-col w-full md:flex-row">
            {caracteristicas.map((caracteristica, index) => (
              <Reveal
                key={index}
                delay={0.18 + index * 0.08}
                className={`max-md:self-center flex flex-col justify-center items-center w-full max-w-[280px] md:flex-1 xl:w-[207px] py-[18px] px-[15px] gap-[15px] ${
                  index === 1
                    ? "border-x-2 border-amarillo md:border-none"
                    : "border-x-2 border-amarillo"
                }`}
              >
                <img src={caracteristica.icon} alt="" />

                <h4 className="paragraph-caps text-negro font-bold uppercase leading-none">
                  {caracteristica.label}
                </h4>

                <p className="parrafos-small text-center text-negro font-light leading-[120%]">
                  {caracteristica.description}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Botón */}
          <Reveal
            delay={0.18 + caracteristicas.length * 0.08}
            className="max-xl:self-center "
          >
            <button
              onClick={() => {
                openPopup("brochure-comercial");
                track(TRACK.conoceProyecto.brochure);
              }}
              className="w-fit flex items-center px-[26px] py-[16px] gap-[10px] rounded-[5px] button-text font-bold uppercase tracking-wider bg-naranja hover:bg-gris active:bg-azul hover:cursor-pointer"
            >
              <img
                src={descargar}
                alt="Ícono de descargar"
                className="h-[16px]"
              />
              Brochure Comercial
            </button>
          </Reveal>
        </div>
        {/* Right panel */}
        <div className="relative w-full xl:max-w-[555px] h-svh md:h-[50svh] xl:h-[745px]">
          <img
            src={conoceImage}
            alt="Anna Sky Living"
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
          <p className="absolute bottom-4 right-1/2 translate-x-[50%] caption text-blanco font-light">
            Imágenes con fines ilustrativos*
          </p>
        </div>
      </div>
    </section>
  );
}
