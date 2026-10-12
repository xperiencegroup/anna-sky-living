import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePopupStore } from "../../../../../store/usePopupStore";
import { supabase } from "../../../../../lib/supabase";
import { track } from "../../../../../analytics/track";
import { TRACK } from "../../../../../analytics/track.constants";

const heroImage = "/foto/popup-bg-hero.jpg";
const modeloTrecasa = "/foto/popup-registro-modelo.png";
import grupoTrecasaLogo from "../../../../../assets/logos/grupo-trecasa.png";

import closeIcon from "../../../../../assets/icons/close.svg";
import sendIcon from "../../../../../assets/icons/send.svg";
import closeIconActive from "../../../../../assets/icons/close-blue.svg";
import userIcon from "../../../../../assets/icons/popup/user.svg";
import mailIcon from "../../../../../assets/icons/popup/mail.svg";
import phoneIcon from "../../../../../assets/icons/popup/phone.svg";
import camaIcon from "../../../../../assets/icons/modelos/cama.svg";
import carroIcon from "../../../../../assets/icons/modelos/estacionamiento.svg";
import pinIcon from "../../../../../assets/icons/pin-orange.svg";

const features = [
  { id: "habitaciones", label: "2 Habitaciones", icon: camaIcon },
  {
    id: "estacionamiento",
    label: "2 Cajones de Estacionamiento",
    icon: carroIcon,
  },
  {
    id: "dinastia",
    label: "Dinastía",
    icon: pinIcon,
  },
];

export default function IngresaPopup({ isOpen }) {
  const [, setSubmitState] = useState("idle");
  const closePopup = usePopupStore((state) => state.closePopup);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    track(TRACK.popupInicial.cerrar);
    closePopup();
  };

  const onSubmit = async (data) => {
    setSubmitState("idle");
    try {
      const payload = {
        name: data.name,
        mail: data.mail,
        phone: data.phone,
        message: null,
        consent: null,
        origin: "popup-inicial",
      };
      const { error } = await supabase
        .from("annasky_living_cx_form")
        .insert(payload);

      if (error) {
        throw error;
      }

      track(TRACK.popupInicial.form.success);

      setSubmitState("success");
      reset();
      closePopup();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);

      track(TRACK.popupInicial.form.error);

      setSubmitState("error");
    }
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-20 bg-black/50 flex items-center justify-center"
    >
      <div className="flex flex-col w-full max-w-[1280px] max-h-svh xl:h-[850px] bg-azul shadow-2xl relative overflow-y-auto">
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          aria-label="Cerrar"
          className="group absolute top-3 right-4 z-10 size-[42px] p-[8px] rounded-[7.5px] bg-naranja flex items-center justify-center transition-colors hover:bg-gris active:bg-blanco"
        >
          <img
            draggable={false}
            src={closeIcon}
            alt="Ícono de cerrar"
            className="block group-active:hidden"
          />
          <img
            draggable={false}
            src={closeIconActive}
            alt="Ícono de cerrar"
            className="hidden group-active:block"
          />
        </button>

        {/* ===== HERO ===== */}
        <div className="relative shrink-0 h-[30svh] md:h-[200px] w-full overflow-hidden">
          <img
            src={heroImage}
            alt="Anna Sky Living Vista Lateral"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <p className="absolute bottom-2 right-1/2 translate-x-[50%] caption text-blanco font-light">
            Imágenes con fines ilustrativos*
          </p>
        </div>

        <div className="flex flex-col xl:flex-row w-full h-full max-xl:justify-center max-xl:items-center max-md:pb-[60px] max-md:px-[44px] max-md:gap-[60px]">
          {/* ===== PANEL IZQUIERDO ===== */}
          <aside className="flex flex-col max-md:items-center md:flex-row md:gap-[30px] xl:flex-col xl:gap-0 w-full max-w-[680px] xl:max-w-[400px]">
            <div className="flex flex-col w-full max-w-[429px]">
              {/* Stat principal */}
              <div className="flex flex-col border-b md:border-r border-naranja flex-1 justify-center items-center pt-[60px] pb-[20px] sm:min-w-0 sm:flex-none gap-[10px]">
                <div className="">
                  <p className="header-1 font-bangla leading-0 text-orange-500">
                    0%
                  </p>
                </div>
                <div className="paragraph-icon font-bold tracking-wide leading-0">
                  de enganche
                </div>
              </div>

              {/* Lista de características */}
              <ul className="border-b md:border-r border-naranja flex flex-col justify-center items-center gap-[15px] py-[14px] flex-1 sm:min-w-0 sm:flex-none">
                {features.map((feature, index) => {
                  return (
                    <li key={index} className="w-full max-w-[240px]">
                      <div className="flex items-center font-bold leading-tight gap-[20px]">
                        <span className="shrink-0 w-[50px] h-[37.5px] rounded-md border border-orange-500 text-orange-500 flex items-center justify-center">
                          <img
                            src={feature.icon}
                            alt="Ícono de cama"
                            className="h-[21px]"
                          />
                        </span>
                        <span className="paragraph-icon uppercase">
                          {feature.label}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Área */}
              <div className="pt-[10px] xl:border-b md:border-r border-naranja text-center flex-1">
                <div className="paragraph-icon font-bold text-blanco">
                  Desde
                </div>
                <div className="font-bangla header-2 text-naranja">
                  70.17 M<sup>2</sup>
                </div>
              </div>
            </div>

            {/* Plano + logo */}
            <div className="flex flex-col justify-center items-center text-center xl:w-full grow xl:border-r border-naranja">
              <div className="relative w-[177px] h-[162px] md:w-full md:max-w-[215px] md:h-[200px]">
                <img
                  src={modeloTrecasa}
                  alt="Imagen de modelo"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <img
                src={grupoTrecasaLogo}
                alt="Logo Grupo Trecasa"
                className="w-[167px] h-fit md:w-[204px]"
              />
            </div>
          </aside>

          {/* ===== PANEL DERECHO: FORMULARIO ===== */}
          <section className="flex flex-col w-full h-full justify-center items-center md:p-9 text-blanco">
            <div className="flex flex-col w-full max-w-[748px] h-[500px] justify-center gap-[40px]">
              <div className="flex flex-col gap-[10px]">
                <h1 className="font-bangla text-center header-2 leading-none">
                  TU PRÓXIMO HOGAR COMIENZA AQUÍ
                </h1>
                <p className="paragraph text-center">
                  Registra tus datos y descubre{" "}
                  <strong className="text-blanco">
                    ANNA SKY LIVING <br className="max-md:hidden" />
                  </strong>{" "}
                  mediante una experiencia interactiva
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <label className="flex items-center h-[70px] gap-2.5 border border-naranja rounded-[5px] focus-within:border-orange-500 px-[20px] py-[10px]">
                  <img
                    src={userIcon}
                    alt="Ícono de usuario"
                    className="size-[25px]"
                  />
                  <input
                    {...register("name", {
                      required: "Tu nombre es requerido",
                      pattern: {
                        value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{2,60}$/,
                        message: "Ingresa un nombre válido",
                      },
                    })}
                    type="text"
                    name="name"
                    placeholder="*Nombre completo"
                    className="flex-1 outline-none paragraph text-blanco placeholder:text-blanco/80 font-extralight placeholder:paragraph"
                  />
                  {errors.name && (
                    <span className="text-red-400 text-xs px-1">
                      {errors.name.message}
                    </span>
                  )}
                </label>

                <label className="flex items-center h-[70px] gap-2.5 border border-naranja rounded-[5px] focus-within:border-orange-500 px-[20px] py-[10px]">
                  <img
                    src={mailIcon}
                    alt="Ícono de usuario"
                    className="size-[25px]"
                  />
                  <input
                    {...register("mail", {
                      required: "Tu correo es requerido",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Ingresa un correo válido",
                      },
                    })}
                    type="email"
                    name="mail"
                    placeholder="*Correo electrónico"
                    className="flex-1 outline-none paragraph text-blanco placeholder:text-blanco/80 font-extralight placeholder:paragraph"
                  />
                  {errors.mail && (
                    <span className="text-red-400 text-xs px-1">
                      {errors.mail.message}
                    </span>
                  )}
                </label>

                <label className="flex items-center h-[70px] gap-2.5 border border-naranja rounded-[5px] focus-within:border-orange-500 px-[20px] py-[10px]">
                  <img
                    src={phoneIcon}
                    alt="Ícono de usuario"
                    className="size-[25px]"
                  />
                  <input
                    {...register("phone", {
                      required: "Tu teléfono es requerido",
                      pattern: {
                        value: /^[0-9]{8,15}$/,
                        message: "Ingresa 10 dígitos sin espacios",
                      },
                    })}
                    type="tel"
                    name="phone"
                    placeholder="*Teléfono"
                    className="flex-1 outline-none paragraph text-blanco placeholder:text-blanco/80 font-extralight placeholder:paragraph"
                  />
                  {errors.phone && (
                    <span className="text-red-400 text-xs px-1">
                      {errors.phone.message}
                    </span>
                  )}
                </label>

                <div className="flex justify-center gap-[10px] mt-[20px]">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex justify-center items-center w-full max-w-[300px] items-center gap-[10px] rounded-[5px] bg-orange-500 p-[16px] hover:bg-gris active:bg-blanco disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <img
                      src={sendIcon}
                      alt="Ícono de enviar"
                      className="size-[16px] group-active:brightness-0"
                    />
                    <span className="button-text text-blanco font-bold tracking-wide group-hover:opacity-80 group-active:text-azul">
                      {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
