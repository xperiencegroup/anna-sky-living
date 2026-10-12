import { useState, useCallback } from "react";
import { Carousel } from "../../../components/embla-carousel/carousel";
import { motion } from "motion/react";
import { TRACK } from "../../../analytics/track.constants";

// images
const avance1 = "/foto/avances/avance-1.jpg";
const avance2 = "/foto/avances/avance-2.jpg";
const avance4 = "/foto/avances/avance-4.jpg";
const avance7 = "/foto/avances/avance-7.jpg";
const avance8 = "/foto/avances/avance-8.jpg";
const avance9 = "/foto/avances/avance-9.jpg";
const avance12 = "/foto/avances/avance-12.jpg";
const avance14 = "/foto/avances/avance-14.jpg";
const avance17 = "/foto/avances/avance-17.jpg";
const avance18 = "/foto/avances/avance-18.jpg";
const slideFinalImage = "/foto/avances/slide-final.jpg";

// videos 2025
const video1 = "/video/2025/2025-09.mp4";
const video2 = "/video/2025/2025-10.mp4";
const video4 = "/video/2025/2025-11.mp4";
const video7 = "/video/2025/2025-12.mp4";

// videos 2026
const video8 = "/video/2026/2026-01.mp4";
const video9 = "/video/2026/2026-02.mp4";
const video12 = "/video/2026/2026-03.mp4";
const video14 = "/video/2026/2026-05.mp4";
const video17 = "/video/2026/2026-06.mp4";
const video18 = "/video/2026/2026-08.mp4";

// slide final content
import annaLogoYellow from "../../../assets/logos/anna-sky-living-yellow.svg";
import timeline from "../../../assets/images/avances/slide-final-timeline.svg";
import Reveal from "../../../components/animations/reveal";

const slidesData = [
  {
    date: "SEPTIEMBRE 2025",
    description: "Colado nivel 11",
    image: avance1,
    video: video1,
  },
  {
    date: "OCTUBRE 2025",
    description: "Torre 2, nivel 7",
    image: avance2,
    video: video2,
  },
  {
    date: "NOVIEMBRE 2025",
    description: "Losa catorce de la\ntorre uno",
    image: avance4,
    video: video4,
  },
  {
    date: "DICIEMBRE 2025",
    description: "Colado de nivel 16,\ntorre 1",
    image: avance7,
    video: video7,
  },
  {
    date: "ENERO 2026",
    description: "Colado de nivel 17\ntorre 1",
    image: avance8,
    video: video8,
  },
  {
    date: "FEBRERO 2026",
    description: "Colado de nivel 19\ndptos. torre 2",
    image: avance9,
    video: video9,
  },
  {
    date: "MARZO 2026",
    description: "Nivel 22, torre 1",
    image: avance12,
    video: video12,
  },
  {
    date: "MAYO 2026",
    description: "Avance de obra nivel\n12, torre 2",
    image: avance14,
    video: video14,
  },
  {
    date: "JUNIO 2026",
    description: "Avance de obra nivel 12, torre 2",
    image: avance17,
    video: video17,
  },
  {
    date: "AGOSTO 2026",
    description: "Avance de obra nivel 12, torre 2",
    image: avance18,
    video: video18,
  },
];

const slideFinal = (
  <div className="group relative flex shrink-0 flex-col w-[260px] h-[520px] p-[20px] overflow-hidden bg-azul-intenso hover:cursor-pointer transition-all duration-500 ease-out">
    {/* Overlay */}
    <div className="absolute z-10 inset-0 w-full h-full bg-linear-to-b from-azul-intenso/60 to-azul-intenso" />

    {/* Bg image */}
    <img
      src={slideFinalImage}
      alt="Continuamos Avanzando..."
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Content */}
    <div className="relative z-10 flex flex-col w-full h-full justify-center items-center gap-[15px]">
      <img
        src={annaLogoYellow}
        alt="Logo Anna Sky Living"
        className="w-full max-w-[200px]"
      />

      <p className="paragraph-icon text-center font-bold">
        Continuamos <br /> avanzando...
      </p>

      <img src={timeline} alt="Línea de tiempo" />
    </div>
  </div>
);

export default function AvanceObra() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleSlideChange = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const amenidades = slidesData.map((slide, index) => {
    const isActive = index === currentSlide;
    const isHovered = index === hoveredIndex;
    const showVideo = isActive || isHovered;

    return (
      <div
        key={index}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        className="group relative flex shrink-0 flex-col w-[260px] h-[520px] p-[20px] overflow-hidden bg-azul-intenso hover:cursor-pointer transition-all duration-500 ease-out"
      >
        <div className="relative flex flex-col w-full h-full justify-center gap-[15px]">
          <h4 className="paragraph-icon font-bold tracking-tighter leading-[120%] text-blanco">
            {slide.date}
          </h4>
          <p className="h-[46px] paragraph text-blanco/80 font-light leading-[120%]">
            {slide.description}
          </p>

          <div className="relative grow w-full">
            <img
              src={slide.image}
              alt={`Imagen de avance fecha ${slide.date}`}
              className={`absolute inset-0 w-full h-full object-cover object-left transition-opacity duration-300 ${
                showVideo ? "opacity-0" : "opacity-100"
              }`}
            />

            {showVideo && (
              <video
                src={slide.video}
                poster={slide.image}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    );
  });

  const activeGroup = Math.floor(currentSlide / 4);

  const amenidadesFinal = [...amenidades, slideFinal];

  return (
    <section
      id="avance-de-obra"
      className="flex flex-col self-center w-full max-w-[1280px] h-fit justify-center items-center px-[30px] pt-[60px] pb-[30px] gap-[30px]"
    >
      <div className="flex flex-col justify-center items-center gap-[15px]">
        <Reveal delay={0} y={20}>
          <h2 className="header-2 font-bangla uppercase">Avance de obra</h2>
        </Reveal>

        <Reveal delay={0.1} y={20}>
          <p className="paragraph text-center font-light leading-[130%]">
            Seguimos desarrollando cada detalle de{" "}
            <span className="font-bold">ANNA SKY LIVING</span> con altos
            estándares de calidad y un enfoque constante en brindar una
            experiencia residencial excepcional.
          </p>
        </Reveal>
      </div>

      {/* progress bar */}
      <div className="flex w-full max-w-[1120px] h-[20px] md:h-[24px] xl:h-[31px]">
        {slidesData.map((slide, index) => {
          if (index % 4 !== 0) return null;

          const groupProgress = Math.min(
            Math.max((currentSlide - index) / 4, 0),
            1,
          );

          return (
            <div key={index} className="relative flex flex-1">
              {/* linea base (fondo gris) */}
              <div className="absolute z-0 w-full h-[1.5px] md:h-[2px] top-1/2 -translate-y-1/2 bg-gris" />

              {/* linea progresiva (amarilla) */}
              <motion.div
                className="absolute z-0 w-full h-[1.5px] md:h-[2px] top-1/2 -translate-y-1/2 bg-amarillo origin-left"
                initial={false}
                animate={{ scaleX: groupProgress }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />

              {/* Circulo */}
              <div
                className={`relative z-10 size-[20px] md:size-[24px] xl:size-[31px] rounded-full border-2 border-amarillo transition-colors ${
                  index > activeGroup * 4 ? "bg-gris" : "bg-amarillo"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Carousel */}
      <div className="flex items-center w-[270px] md:w-[70%] xl:w-[1120px] h-fit min-[375px]:h-[560px]">
        <Carousel
          slides={amenidadesFinal}
          variant="card"
          autoScrollOptions={{ stopOnMouseEnter: true }}
          onSlideChange={handleSlideChange}
          tracking={TRACK.avanceObra.carousel}
        />
      </div>
    </section>
  );
}
