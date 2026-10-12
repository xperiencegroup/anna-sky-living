import {
  mailInfo,
  mapsInfo,
  phoneInfo,
  whatsappInfo,
} from "../../../data/social";
import { track } from "../../../analytics/track";
import { TRACK } from "../../../analytics/track.constants";

const bannerBg = "/foto/visitanos-background.jpg";

// Icons
import phoneIcon from "../../../assets/icons/phone.svg";
import mailIcon from "../../../assets/icons/mail.svg";
import pinIcon from "../../../assets/icons/pin.svg";
import Reveal from "../../../components/animations/reveal";

// mapa
const mapa = "/foto/visitanos/mapa-anna-sky-horizontal.jpg";
const mapaMobile = "/foto/visitanos/mapa-anna-sky-vertical.jpg";

const features = [
  {
    description: phoneInfo.label,
    icon: phoneIcon,
    href: phoneInfo.href,
    track: TRACK.visitanos.telefono,
  },
  {
    description: mailInfo.label,
    icon: mailIcon,
    href: mailInfo.href,
    track: TRACK.visitanos.correo,
  },
  {
    title: "Showroom de Ventas",
    description:
      "Plaza Vía 01. Rogelio Cantú Gómez 1000, Colinas de San Jerónimo, Monterrey, NL. local 23 y 24",
    icon: pinIcon,
    href: mapsInfo.href,
    track: TRACK.visitanos.ubicacion,
  },
];

export default function Visitanos() {
  return (
    <div className="w-full">
      {/* Medio banner */}
      <div
        id="showroom"
        className="relative flex justify-center items-center w-full min-h-[50vh]"
      >
        {/* imagen de fondo */}
        <img
          src={bannerBg}
          alt="Lobby de Anna Sky Living"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* overlay */}
        <div className="absolute w-full h-full bg-linear-to-r from-azul/90 via-50% via-azul/40" />

        <div className="relative flex w-full max-w-[1280px] h-full items-center">
          <div className="flex flex-col w-full justify-center items-center md:justify-start md:items-start md:w-[400px] md:pl-[60px] gap-[20px]">
            <h3 className="header-2 text-center md:text-left font-bangla uppercase leading-[120%]">
              <Reveal delay={0}>
                <span className="block">Visita</span>
              </Reveal>

              <Reveal delay={0.1}>
                <span className="block">nuestro</span>
              </Reveal>

              <Reveal delay={0.18}>
                <span className="block">showroom</span>
              </Reveal>
            </h3>

            <Reveal delay={0.1}>
              <a
                href={whatsappInfo.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track(TRACK.visitanos.whatsapp)}
                className="w-fit px-[26px] py-[16px] rounded-[5px] button-text text-blanco font-bold uppercase tracking-wide bg-naranja hover:bg-gris active:bg-blanco active:text-azul hover:cursor-pointer"
              >
                Contáctanos
              </a>
            </Reveal>
          </div>
        </div>

        <p className="absolute bottom-2 caption text-blanco font-light">
          Imágenes con fines ilustrativos*
        </p>
      </div>

      {/* Banner completo con mapa */}
      <div className="relative flex flex-col justify-center items-center w-full gap-[30px] pt-[60px]">
        {/* Info */}
        <div className="flex flex-col w-full max-w-[1280px] gap-[30px]">
          <Reveal delay={0}>
            <h3 className="header-2 text-center text-blanco font-bangla uppercase px-[20px]">
              Te esperamos.
              <br /> Visítanos y descubre tu próximo hogar.
            </h3>
          </Reveal>

          {/* features */}
          <div className="flex flex-col md:flex-row justify-center items-center px-[20px]">
            {features.map((feature, index) => {
              return (
                <Reveal
                  key={index}
                  delay={0.1 + index * 0.08}
                  y={20}
                  className="w-full max-w-[370px]"
                >
                  <a
                    href={feature.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track(feature.track)}
                    className={`flex flex-col w-full max-w-[370px] h-[157px] p-[20px] gap-[10px] justify-center items-center ${index === 1 ? "border-x-2 border-amarillo md:border-none" : "border-x-2 border-amarillo"}`}
                  >
                    <img src={feature.icon} className="h-[26px]" />
                    <p className="paragraph-icon text-center text-blanco font-light tracking-tight leading-[120%]">
                      {feature.title && (
                        <span className="font-bold">
                          {feature.title} <br />
                        </span>
                      )}
                      <span className={`${index === 2 ? "" : "font-bold"}`}>
                        {feature.description}
                      </span>
                    </p>
                  </a>
                </Reveal>
              );
            })}
          </div>

          {/* Map */}
          <a
            href={mapsInfo.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(TRACK.visitanos.mapa)}
            className="relative w-full max-w-[1280px] h-svh md:h-[50svh] xl:h-svh"
          >
            <img
              src={mapa}
              className="hidden md:block absolute inset-0 w-full h-full object-cover"
            />
            <img
              src={mapaMobile}
              className="block md:hidden absolute inset-0 w-full h-full object-cover"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
