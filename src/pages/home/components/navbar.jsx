import { useState, useEffect } from "react";
import { motion, MotionConfig } from "motion/react";
import { socials, whatsappInfo } from "../../../data/social";
import { TRACK } from "../../../analytics/track.constants";
import { track } from "../../../analytics/track";

// Logo & icons
import annaWhiteLogo from "../../../assets/logos/anna-sky-living-white.svg";
import menuIcon from "../../../assets/icons/menu.svg";
import closeIcon from "../../../assets/icons/closeIcon.svg";
import nosotrosIcon from "../../../assets/icons/menu/nosotros.svg";
import conoceIcon from "../../../assets/icons/menu/conoce.svg";
import amenidadesIcon from "../../../assets/icons/menu/amenidades.svg";
import modelosIcon from "../../../assets/icons/menu/modelos.svg";
import avanceIcon from "../../../assets/icons/menu/avance.svg";
import contactoIcon from "../../../assets/icons/menu/contacto.svg";

import facebookIcon from "../../../assets/icons/menu/facebook-white.svg";
import instagramIcon from "../../../assets/icons/menu/instagram-white.svg";

const navbarButtons = [
  {
    id: "nosotros",
    label: "Nosotros",
    icon: nosotrosIcon,
    track: TRACK.header.nosotros,
  },
  {
    id: "conoce-proyecto",
    label: "Conoce el proyecto",
    icon: conoceIcon,
    track: TRACK.header.conoce,
  },
  {
    id: "amenidades",
    label: "Amenidades",
    icon: amenidadesIcon,
    track: TRACK.header.amenidades,
  },
  {
    id: "modelos",
    label: "Modelos",
    icon: modelosIcon,
    track: TRACK.header.modelos,
  },
  {
    id: "avance-de-obra",
    label: "Avance de obra",
    icon: avanceIcon,
    track: TRACK.header.avance,
  },
  {
    id: "contacto",
    label: "Contacto",
    icon: contactoIcon,
    track: TRACK.header.contacto,
  },
];

const socialButtons = [
  {
    ...socials[0],
    icon: facebookIcon,
    track: TRACK.header.socials.facebook,
  },
  {
    ...socials[1],
    icon: instagramIcon,
    track: TRACK.header.socials.instagram,
  },
  {
    ...whatsappInfo,
    track: TRACK.header.socials.whatsapp,
  },
];

// ANIMACIONES
// Curva tipo "easeOutExpo": arranca rápido, frena suave
const ease = [0.22, 1, 0.36, 1];

const sidebarVariants = {
  hidden: { x: "-100%" },
  show: { x: 0, transition: { duration: 0.45, ease } },
};

const panelVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delayChildren: 0.12,
      staggerChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 820) {
        setIsNavbarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openMenu = () => {
    track(TRACK.header.expand);
    setIsNavbarOpen(true);
  };
  const closeMenu = () => {
    track(TRACK.header.collapse);
    setIsNavbarOpen(false);
  };

  return (
    <div
      className={`relative z-10 flex justify-center items-center w-full transition-colors ease-out ${isNavbarOpen ? "bg-azul" : "bg-negro"}`}
    >
      {/* Menu desktop resposinve */}
      <div
        className={`relative flex z-100 w-full max-w-[1280px] justify-between min-[820px]:justify-around items-center p-[20px] ${isNavbarOpen ? "hidden" : ""}`}
      >
        {/* Botón Logo */}
        <a
          href="#hero"
          onClick={() => track(TRACK.header.logo)}
          className="relative w-[94px] h-[31px] hover:cursor-pointer"
        >
          <img
            src={annaWhiteLogo}
            alt="Logo Anna Sky Living"
            className="absolute inset-0 w-full h-full object-contain"
          />
        </a>

        {navbarButtons.map((button) => {
          return (
            <a
              key={button.id}
              href={`#${button.id}`}
              onClick={() => track(button.track)}
              className={`max-[820px]:hidden flex uppercase font-bold button-text text-center md:px-[10px] md:py-[16px] xl:p-[16px] rounded-[5px] hover:cursor-pointer hover:bg-gris hover:text-blanco active:bg-blanco active:text-negro ${button.id === "contacto" && "bg-naranja"}`}
            >
              {button.label}
            </a>
          );
        })}

        {/* Menu Icon */}
        <button
          onClick={() => (isNavbarOpen ? closeMenu() : openMenu())}
          className={`flex min-[820px]:hidden size-[56px] justify-center items-center rounded-[10px] p-[10px] transition-colors ${isNavbarOpen ? "bg-blanco" : "bg-naranja"}`}
        >
          <img src={isNavbarOpen ? closeIcon : menuIcon} alt="Ícono de Menu" />
        </button>
      </div>

      {/* Menu mobile */}
      {isNavbarOpen && (
        <MotionConfig reducedMotion="user">
          <motion.div
            initial="hidden"
            animate="show"
            className="absolute top-0 left-0 flex w-full h-svh min-[820px]:hidden"
          >
            {/* Sidebar decoracion */}
            <motion.div
              variants={sidebarVariants}
              className="shrink-0 h-full w-[25%] bg-azul/60 backdrop-blur-sm"
            />

            {/* Content */}
            <motion.div
              variants={panelVariants}
              className="flex flex-col w-full p-[20px] bg-azul"
            >
              {/* Navbar */}
              <div className="flex w-full items-center justify-between">
                {/* Botón Logo */}
                <a
                  href="#hero"
                  className="relative w-[94px] h-[31px] hover:cursor-pointer"
                >
                  <img
                    src={annaWhiteLogo}
                    alt="Logo Anna Sky Living"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </a>

                {/* Close button */}
                <button
                  onClick={() => (isNavbarOpen ? closeMenu() : openMenu())}
                  className={`flex min-[820px]:hidden size-[56px] justify-center items-center rounded-[10px] p-[10px] transition-colors shadow-2xl shadow-black ${isNavbarOpen ? "bg-blanco" : "bg-naranja"}`}
                >
                  <img
                    src={isNavbarOpen ? closeIcon : menuIcon}
                    alt="Ícono de Menu"
                  />
                </button>
              </div>

              {/* Botonees, redes y caption */}
              <div className="flex flex-col py-[50px] gap-[35px]">
                {/* Botones */}
                <div className="flex flex-col w-full grow max-h-[510px] gap-[35px]">
                  <div className="flex flex-col gap-[35px]">
                    {navbarButtons.map((button, index) => {
                      return (
                        <motion.a
                          key={index}
                          href={`#${button.id}`}
                          onClick={() => {
                            track(button.track);
                            setIsNavbarOpen(false);
                          }}
                          variants={itemVariants}
                          className="group w-fit flex items-center font-bold text-left gap-[10px] p-[16px] rounded-[10px] transition-colors transition-shadow hover:bg-gris hover:cursor-pointer hover:shadow-[0px_13px_6px_-4px_rgba(0,0,0,0.2)] hover:shadow-black/20 active:bg-blanco"
                        >
                          <img
                            src={button.icon}
                            alt={`Ícono de ${button.id}`}
                            className="h-[16px] group-active:brightness-0 active:invert-100"
                          />
                          <span className="button-text text-blanco uppercase group-hover:opacity-80 group-active:text-azul">
                            {button.label}
                          </span>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                {/* Social icons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex w-full max-w-[250px] justify-between p-[20px]"
                >
                  {socialButtons.map((button, index) => {
                    return (
                      <a
                        key={index}
                        href={button.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track(button.track)}
                      >
                        <img src={button.icon} alt="Ícono red social" />
                      </a>
                    );
                  })}
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="caption w-full max-w-[250px]"
                >
                  © 2026 ANNA SKY LIVING. Todos los derechos reservados.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </MotionConfig>
      )}
    </div>
  );
}
