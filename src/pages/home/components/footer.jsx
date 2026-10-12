import { TRACK } from "../../../analytics/track.constants";
import { track } from "../../../analytics/track";
import { socials } from "../../../data/social";

import annaLogo from "../../../assets/logos/anna-sky-living-yellow.svg";
import desarrolladoXperience from "../../../assets/logos/desarrollado-xperience.svg";

const buttons = [
  {
    id: "nosotros",
    label: "Nosotros",
    track: TRACK.footer.nosotros,
  },
  {
    id: "conoce-proyecto",
    label: "Conoce el proyecto",
    track: TRACK.footer.conoce,
  },
  {
    id: "amenidades",
    label: "Amenidades",
    track: TRACK.footer.amenidades,
  },
  {
    id: "modelos",
    label: "Modelos",
    track: TRACK.footer.modelos,
  },
  {
    id: "avance-de-obra",
    label: "Avance de obra",
    track: TRACK.footer.avance,
  },
];

export default function Footer() {
  return (
    <div className="self-center flex flex-col w-full max-w-[1160px] justify-center items-center py-[30px] px-[60px] gap-[30px]">
      <div className="flex flex-col w-full gap-[20px]">
        {/* Navegación */}
        <div className="flex w-full flex-col min-[800px]:flex-row justify-between items-center max-[800px]:gap-[5px]">
          <a href="#hero" onClick={() => track(TRACK.footer.logo)}>
            <img
              src={annaLogo}
              alt="Logo Anna Sky Living"
              className="md:w-[87px] xl:w-[143px] xl:h-[48px]"
            />
          </a>
          {buttons.map((button) => {
            return (
              <a
                href={`#${button.id}`}
                key={button.id}
                onClick={() => track(button.track)}
                className="button-text text-center font-bold uppercase p-[16px] min-[800px]:p-[10px] xl:p-[16px]"
              >
                {button.label}
              </a>
            );
          })}
        </div>

        {/* Social */}
        <div className="self-center flex flex-col xl:flex-row justify-between items-center w-full gap-[30px]">
          <div className="flex gap-[20px]">
            {socials.map((social) => {
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    const event = TRACK.footer.socials[social.id];
                    if (event) track(event);
                  }}
                  className="group flex size-[40px] justify-center items-center rounded-[5px] bg-naranja hover:bg-gris active:bg-blanco"
                >
                  <img
                    src={social.icon}
                    className="brightness-0 invert-100 group-active:hidden"
                  />
                  <img
                    src={social.iconActive}
                    className="hidden group-active:block"
                  />
                </a>
              );
            })}
          </div>

          <img
            src={desarrolladoXperience}
            alt="Desarrollado por Xperience"
            className="w-[120px] h-[32px]"
          />
        </div>
      </div>

      <p className="caption text-center">
        © 2026 ANNA SKY LIVING. Todos los derechos reservados.
      </p>
    </div>
  );
}
