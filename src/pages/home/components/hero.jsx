import Navbar from "./navbar";
import annaSkyLiving from "../../../assets/logos/anna-sky-living-white.svg";
import Reveal from "../../../components/animations/reveal";
import { track } from "../../../analytics/track";
import { TRACK } from "../../../analytics/track.constants";

export default function Hero() {
  return (
    <div id="hero" className="relative w-full h-lvh flex flex-col">
      {/* Background  */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="relative w-full h-full">
          {/* Image */}
          <img
            src="/foto/hero-background.jpg"
            alt="Render Anna Sky Living"
            className="absolute w-full h-full inset-0 object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 w-full h-full bg-azul/40" />
        </div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="self-center relative z-0 flex flex-col grow w-full max-w-[1280px] justify-center items-center md:items-start md:justify-end pb-[60px] px-[44px] md:p-[60px] gap-[30px]">
        {/* Logo */}
        <Reveal delay={0} duration={1.1}>
          <div className="relative w-full max-w-[287px] h-[95px] md:w-[302px] md:h-[100px] xl:w-[367px] xl:h-[122px]">
            <img
              src={annaSkyLiving}
              alt="Logo Anna Sky Living"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </Reveal>

        {/* Header 1 */}
        <Reveal delay={0.1} duration={1.1}>
          <h1 className="header-2 uppercase text-blanco text-center md:text-left font-bangla leading-none">
            Vive en las alturas de un nuevo estilo de vida
          </h1>
        </Reveal>

        {/* Button */}
        <Reveal delay={0.24} duration={1.1}>
          <a
            href="#showroom"
            onClick={() => track(TRACK.hero.showroom)}
            className="w-fit px-[26px] py-[16px] rounded-[5px] text-center button-text font-bold uppercase tracking-wider bg-naranja hover:bg-gris hover:text-blanco active:bg-blanco active:text-azul hover:cursor-pointer"
          >
            Visita nuestro showroom
          </a>
        </Reveal>
      </div>
    </div>
  );
}
