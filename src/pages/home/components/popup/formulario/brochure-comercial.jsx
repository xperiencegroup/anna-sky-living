import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../../../../lib/supabase";
import { usePopupStore } from "../../../../../store/usePopupStore";
import { track } from "../../../../../analytics/track";
import { TRACK } from "../../../../../analytics/track.constants";
import { BROCHURE_URL } from "../../../../../const/brochure";

const brochureImage = "/foto/popup-bg-brochure.jpg";
import annaLogo from "../../../../../assets/logos/anna-sky-living-white.svg";

import closeIcon from "../../../../../assets/icons/close.svg";
import closeIconActive from "../../../../../assets/icons/close-blue.svg";
import userIcon from "../../../../../assets/icons/popup/user.svg";
import mailIcon from "../../../../../assets/icons/popup/mail.svg";
import phoneIcon from "../../../../../assets/icons/popup/phone.svg";

export default function BrochureComercialPopup({ isOpen }) {
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
    track(TRACK.conoceProyecto.popup.cerrar);
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
        consent: data.consent ?? null,
        origin: "brochure",
      };

      const { error } = await supabase
        .from("annasky_living_cx_form")
        .insert(payload);

      if (error) {
        throw error;
      }

      track(TRACK.conoceProyecto.popup.success);

      //* Abrir brochure en una nueva pestaña
      window.open(BROCHURE_URL, "_blank", "noopener,noreferrer");

      setSubmitState("success");
      closePopup();
      reset();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      track(TRACK.conoceProyecto.popup.error);
      setSubmitState("error");
    }
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-20 overflow-y-auto bg-black/20 flex items-center justify-center"
    >
      <div className="flex flex-col xl:flex-row w-full max-w-[1280px] max-h-svh xl:h-[850px] bg-azul shadow-2xl relative overflow-y-auto">
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

        {/* ===== IMAGEN ===== */}
        <div className="relative shrink-0 h-[260px] xl:h-full w-full xl:w-[600px] overflow-hidden">
          <img
            src={brochureImage}
            alt="Anna Sky Living Amenidades"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <p className="absolute bottom-2 right-1/2 translate-x-[50%] caption text-blanco font-light">
            Imágenes con fines ilustrativos*
          </p>
        </div>

        {/* ===== PANEL DERECHO: LOGO + FORMULARIO ===== */}
        <section className="flex flex-col w-full justify-center px-8 py-10 md:px-14 md:py-12 text-blanco">
          <div className="flex flex-col w-full xl:max-w-[560px] mx-auto gap-8">
            <img
              src={annaLogo}
              alt="Logo Anna Sky Living"
              className="self-center w-[200px] md:w-[240px] xl:w-[260px] h-fit"
            />

            <div className="flex flex-col gap-3">
              <h1 className="font-bangla header-2 leading-tight uppercase">
                Descarga nuestro brochure
              </h1>
              <p className="paragraph font-extralight">
                Registra tus datos y recibe el brochure completo de{" "}
                <strong className="text-blanco font-bold">
                  ANNA SKY LIVING
                </strong>
                , con planos, amenidades y más información.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col gap-4"
            >
              {/* Nombre */}
              <div className="flex flex-col gap-1">
                <label className="flex items-center h-[70px] gap-2.5 border rounded-[5px] px-[20px] py-[10px] border-naranja">
                  <img
                    src={userIcon}
                    alt="Ícono de usuario"
                    className="size-[25px]"
                  />
                  <input
                    type="text"
                    placeholder="*Nombre completo"
                    aria-invalid={errors.name ? "true" : "false"}
                    className="flex-1 outline-none paragraph text-blanco placeholder:text-blanco/80 font-extralight placeholder:paragraph"
                    {...register("name", {
                      required: "Tu nombre es requerido",
                      pattern: {
                        value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{2,60}$/,
                        message: "Ingresa un nombre válido",
                      },
                    })}
                  />
                </label>
                {errors.name && (
                  <span className="text-red-400 text-xs px-1">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Correo */}
              <div className="flex flex-col gap-1">
                <label className="flex items-center h-[70px] gap-2.5 border rounded-[5px] px-[20px] py-[10px] border-naranja">
                  <img
                    src={mailIcon}
                    alt="Ícono de usuario"
                    className="size-[25px]"
                  />
                  <input
                    type="email"
                    placeholder="*Correo electrónico"
                    aria-invalid={errors.mail ? "true" : "false"}
                    className="flex-1 outline-none paragraph text-blanco placeholder:text-blanco/80 font-extralight placeholder:paragraph"
                    {...register("mail", {
                      required: "Tu correo es requerido",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Ingresa un correo válido",
                      },
                    })}
                  />
                </label>
                {errors.mail && (
                  <span className="text-red-400 text-xs px-1">
                    {errors.mail.message}
                  </span>
                )}
              </div>

              {/* Teléfono */}
              <div className="flex flex-col gap-1">
                <label className="flex items-center h-[70px] gap-2.5 border rounded-[5px] px-[20px] py-[10px] border-naranja">
                  <img
                    src={phoneIcon}
                    alt="Ícono de usuario"
                    className="size-[25px]"
                  />
                  <input
                    type="tel"
                    placeholder="*Teléfono"
                    aria-invalid={errors.phone ? "true" : "false"}
                    className="flex-1 outline-none paragraph text-blanco placeholder:text-blanco/80 font-extralight placeholder:paragraph"
                    {...register("phone", {
                      required: "Tu teléfono es requerido",
                      pattern: {
                        value: /^[0-9]{8,15}$/,
                        message: "Ingresa 10 dígitos sin espacios",
                      },
                    })}
                  />
                </label>
                {errors.phone && (
                  <span className="text-red-400 text-xs px-1">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* Checkbox de consentimiento */}
              <div className="flex flex-col gap-1 justify-center">
                <label className="flex items-center gap-[15px] cursor-pointer ">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    {...register("consent", {
                      required: "Debes aceptar para continuar",
                    })}
                  />
                  <span className="size-[25px] shrink-0 rounded-[2px] border border-naranja flex items-center justify-center peer-checked:bg-naranja peer-focus-visible:ring-2 peer-focus-visible:ring-naranja/50 transition-colors"></span>
                  <span className="paragraph-icon text-blanco/90 leading-none">
                    Acepto recibir información comercial de Anna sky living*
                  </span>
                </label>
                {errors.consent && (
                  <span className="text-red-400 text-xs px-1">
                    {errors.consent.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex justify-center items-center w-full gap-[10px] rounded-[5px] bg-naranja p-[14px] mt-2 hover:bg-gris active:bg-blanco disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="button-text text-blanco font-bold tracking-wide group-hover:opacity-80 group-active:text-azul">
                  {isSubmitting ? "ENVIANDO..." : "DESCARGAR BROCHURE"}
                </span>
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
