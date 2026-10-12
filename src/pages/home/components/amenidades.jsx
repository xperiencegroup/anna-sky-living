import { Carousel } from "../../../components/embla-carousel/carousel";
import { motion } from "motion/react";
import useUIStore from "../../../store/useUIStore";
import { useIsXl } from "../../../hooks/useIsXl";

// icons
import albercaIcon from "../../../assets/icons/amenidades/alberca.svg";
import asadoresIcon from "../../../assets/icons/amenidades/asadores.svg";
import juegosIcon from "../../../assets/icons/amenidades/juegos.svg";
import gymIcon from "../../../assets/icons/amenidades/gym.svg";
import lobbyIcon from "../../../assets/icons/amenidades/lobby.svg";
import salaIcon from "../../../assets/icons/amenidades/sala-espera.svg";
import sportbarIcon from "../../../assets/icons/amenidades/sportbar.svg";
import teaIcon from "../../../assets/icons/amenidades/tea.svg";
import parqueIcon from "../../../assets/icons/amenidades/parque.svg";
import salonEventosIcon from "../../../assets/icons/amenidades/salon-eventos.svg";
import ludotecaIcon from "../../../assets/icons/amenidades/ludoteca.svg";
import firePitsIcon from "../../../assets/icons/amenidades/fire-pits.svg";
import padelIcon from "../../../assets/icons/amenidades/padel.svg";
import Reveal from "../../../components/animations/reveal";
import { TRACK } from "../../../analytics/track.constants";

// images
const albercaImage = "/foto/amenidades/alberca.webp";
const asadoresImage = "/foto/amenidades/asadores.webp";
const padelImage = "/foto/amenidades/cancha-de-padel.webp";
const firePitsImage = "/foto/amenidades/firepits.webp";
const gymImage = "/foto/amenidades/gym.webp";
const juegosImage = "/foto/amenidades/juegos.webp";
const lobbyImage = "/foto/amenidades/lobby.webp";
const ludotecaImage = "/foto/amenidades/ludoteca.webp";
const parqueImage = "/foto/amenidades/parque.webp";
const salaImage = "/foto/amenidades/sala.webp";
const salonEventosImage = "/foto/amenidades/salon-eventos.webp";
const sportbarImage = "/foto/amenidades/sport-bar.webp";
const teaImage = "/foto/amenidades/tearoom.webp";

const slidesData = [
  {
    id: "lobby",
    title: "Lobby",
    icon: lobbyIcon,
    image: lobbyImage,
  },
  {
    id: "sala-espera",
    title: "Sala de espera",
    icon: salaIcon,
    image: salaImage,
  },
  {
    id: "salon-eventos",
    title: "Salón de Eventos",
    icon: salonEventosIcon,
    image: salonEventosImage,
  },
  {
    id: "sport-bar",
    title: "Sport bar",
    icon: sportbarIcon,
    image: sportbarImage,
  },
  {
    id: "tea-room",
    title: "Tea room",
    icon: teaIcon,
    image: teaImage,
  },
  {
    id: "gym",
    title: "Gym",
    icon: gymIcon,
    image: gymImage,
  },
  {
    id: "ludoteca",
    title: "Ludoteca",
    icon: ludotecaIcon,
    image: ludotecaImage,
  },
  {
    id: "alberca",
    title: "Alberca",
    icon: albercaIcon,
    image: albercaImage,
  },
  {
    id: "padel",
    title: "Cancha de Pádel",
    icon: padelIcon,
    image: padelImage,
  },
  {
    id: "juegos",
    title: "Juegos Infantiles",
    icon: juegosIcon,
    image: juegosImage,
  },
  {
    id: "asadores",
    title: "Asadores",
    icon: asadoresIcon,
    image: asadoresImage,
  },
  {
    id: "fire-pits",
    title: "Fire pits",
    icon: firePitsIcon,
    image: firePitsImage,
  },
  {
    id: "corredor",
    title: "Corredor verde",
    icon: parqueIcon,
    image: parqueImage,
  },
];

export default function Amenidades() {
  const { selectedAmenidad, setSelectedAmenidad } = useUIStore();
  const isXl = useIsXl();

  const baseWidth = isXl ? 340 : 255;
  const expandedWidth = isXl ? 850 : 400;

  const amenidades = slidesData.map((slide) => {
    return (
      <motion.div
        key={slide.id}
        animate={{
          width: selectedAmenidad === slide.id ? expandedWidth : baseWidth,
        }}
        initial={false}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        onClick={() =>
          setSelectedAmenidad(selectedAmenidad === slide.id ? null : slide.id)
        }
        className={`pointer-events-none md:pointer-events-auto group relative z-0 flex shrink-0 flex-col h-[600px] xl:h-[670px] rounded-[15px] shadow-2xl overflow-hidden bg-cyan-500 shadow-[0_10.48px_18.16px_-6.98px_rgba(0,0,0,0.12),0_8.73px_15.89px_-6.98px_rgba(0,0,0,0.15)] hover:cursor-pointer transition-[outline-color,outline-width] duration-500 ease-out ${
          selectedAmenidad === slide.id
            ? "outline-3 outline-naranja"
            : "outline-0 outline-naranja"
        }`}
      >
        {/* Overlay and image */}
        <div className="absolute z-0 w-full h-full">
          <div className="relative w-full h-full">
            {/* image */}
            <img
              src={slide.image}
              alt={`Anna Sky Living - Amenidades ${slide.title}`}
              className="absolute w-full h-full inset-0 object-cover object-center"
            />

            {/* Overlay */}
            <div
              className={`absolute top-0 left-0 w-full h-full bg-linear-to-b from-azul/30 to-azul/80 transition-opacity group-hover:opacity-0 ${selectedAmenidad === slide.id && "opacity-0"}`}
            />
          </div>
        </div>

        {/* Text and icon */}
        <div
          className={`pointer-events-none relative flex flex-col w-full h-full justify-center items-center gap-[15px] transition-opacity ${slide.id === selectedAmenidad ? "opacity-0" : "opacity-100"}`}
        >
          <img
            src={slide.icon}
            draggable={false}
            alt="Ícono de amenidad"
            className="h-[45px]"
          />
          <h4 className="paragraph-icon text-center font-bold uppercase">
            {slide.title}
          </h4>
        </div>
      </motion.div>
    );
  });

  return (
    <section
      id="amenidades"
      className="relative flex flex-col self-center w-full max-w-[1280px] min-h-svh justify-center items-center px-[30px] pt-[30px] pb-[60px] gap-[30px]"
    >
      <div className="flex flex-col justify-center items-center gap-[35px]">
        <Reveal>
          <h2 className="header-2 text-center font-bangla uppercase leading-none">
            Amenidades
            <br />
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="header-2 text-center font-bangla uppercase leading-none">
            Disfruta lo extraordinario
          </h3>
        </Reveal>
      </div>

      {/* Carousel */}
      <div className="relative flex items-center w-[270px] md:w-[70%] xl:w-[1120px] h-fit min-[375px]:h-[630px] xl:h-[710px]">
        <Carousel
          slides={amenidades}
          variant="card"
          isAnySelected={selectedAmenidad}
          tracking={TRACK.amenidades.carousel}
        />

        <p className="absolute -bottom-8 min-[375px]:-bottom-4 right-1/2 translate-x-[50%] caption text-blanco font-light">
          Imágenes con fines ilustrativos*
        </p>
      </div>
    </section>
  );
}
