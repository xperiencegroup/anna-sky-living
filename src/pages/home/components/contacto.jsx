import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../../lib/supabase";
import { track } from "../../../analytics/track";
import { TRACK } from "../../../analytics/track.constants";

import sendIcon from "../../../assets/icons/send.svg";
import Reveal from "../../../components/animations/reveal";

// Clases base del input; el borde cambia a rojo cuando hay error
const fieldClass = (error) =>
  `outline-none paragraph text-blanco leading-[120%] placeholder:paragraph placeholder:text-blanco placeholder:font-light placeholder:leading-[120%] px-[30px] py-[20px] border-b ${
    error ? "border-red-400" : "border-amarillo"
  }`;

export default function Contacto() {
  const [status, setStatus] = useState("idle"); // idle | success | error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  // Oculta la alerta (éxito o error) después de unos segundos
  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 4000);
    return () => clearTimeout(timer);
  }, [status]);

  const onSubmit = async (data) => {
    setStatus("idle");
    try {
      const payload = {
        name: data.name,
        mail: data.mail,
        phone: data.phone,
        message: data.message || null,
        consent: null,
        origin: "contacto",
      };

      const { error } = await supabase
        .from("annasky_living_cx_form")
        .insert(payload);
      if (error) {
        throw error;
      }

      //* Tracking exitoso
      track(TRACK.contacto.form.success);

      reset();
      setStatus("success");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);

      //* Tracking error
      track(TRACK.contacto.form.error);

      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="flex justify-center items-center w-full">
      <div className="flex flex-col w-full max-w-[1280px] justify-center items-center p-[44px] md:p-[60px] gap-[30px]">
        <div className="flex flex-col gap-[15px]">
          <Reveal>
            <h2 className="header-2 text-center font-bangla uppercase leading-[120%]">
              Contáctanos
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="paragraph text-center leading-[120%]">
              Tu próximo espacio comienza con una conversación.
              <br />
              Cuéntanos qué estás buscando y encontraremos la opción ideal para
              ti.
            </p>
          </Reveal>
        </div>

        {/* Alerta de éxito */}
        {status === "success" && (
          <div
            role="status"
            className="w-full max-w-[600px] px-[24px] py-[16px] rounded-[5px] bg-[#1f7a3d]/10 border border-[#1f7a3d] text-[16px] text-[#1f7a3d] text-center"
          >
            ¡Tu mensaje fue enviado con éxito! Nos pondremos en contacto contigo
            pronto.
          </div>
        )}

        {/* Alerta de error */}
        {status === "error" && (
          <div
            role="alert"
            className="w-full max-w-[600px] px-[24px] py-[16px] rounded-[5px] bg-red-500/10 border border-red-400 text-[16px] text-red-400 text-center"
          >
            No pudimos enviar tu mensaje. Inténtalo de nuevo en unos minutos.
          </div>
        )}

        {/* formulario */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col w-full gap-[30px]"
        >
          {/* Nombre */}
          <Reveal amount={0.6}>
            <div className="flex flex-col gap-1">
              <input
                type="text"
                autoComplete="name"
                placeholder="*Nombre completo"
                aria-invalid={errors.name ? "true" : "false"}
                className={fieldClass(errors.name)}
                {...register("name", {
                  required: "Tu nombre es requerido",
                  pattern: {
                    value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{2,60}$/,
                    message: "Ingresa un nombre válido",
                  },
                })}
              />
              {errors.name && (
                <span className="text-red-400 text-xs px-[30px]">
                  {errors.name.message}
                </span>
              )}
            </div>
          </Reveal>

          {/* Correo electrónico */}
          <Reveal amount={0.6}>
            <div className="flex flex-col gap-1">
              <input
                type="email"
                autoComplete="email"
                placeholder="*Correo electrónico"
                aria-invalid={errors.mail ? "true" : "false"}
                className={fieldClass(errors.mail)}
                {...register("mail", {
                  required: "Tu correo es requerido",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingresa un correo válido",
                  },
                })}
              />
              {errors.mail && (
                <span className="text-red-400 text-xs px-[30px]">
                  {errors.mail.message}
                </span>
              )}
            </div>
          </Reveal>

          {/* Teléfono */}
          <Reveal amount={0.6}>
            <div className="flex flex-col gap-1">
              <input
                type="tel"
                autoComplete="tel"
                placeholder="*Teléfono"
                aria-invalid={errors.phone ? "true" : "false"}
                className={fieldClass(errors.phone)}
                {...register("phone", {
                  required: "Tu teléfono es requerido",
                  pattern: {
                    value: /^[0-9]{8,15}$/,
                    message: "Ingresa 10 dígitos sin espacios",
                  },
                })}
              />
              {errors.phone && (
                <span className="text-red-400 text-xs px-[30px]">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </Reveal>

          {/* Mensaje (opcional) */}
          <Reveal amount={0.6}>
            <div className="flex flex-col gap-1">
              <textarea
                placeholder="Mensaje"
                aria-invalid={errors.message ? "true" : "false"}
                className={`resize-none h-[229px] ${fieldClass(errors.message)} placeholder:text-[21px]`}
                {...register("message", {
                  maxLength: {
                    value: 200,
                    message: "El mensaje no puede pasar de 200 caracteres",
                  },
                })}
              />
              {errors.message && (
                <span className="text-red-400 text-xs px-[30px]">
                  {errors.message.message}
                </span>
              )}
            </div>
          </Reveal>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex items-center justify-center w-full md:w-fit md:px-[106px] py-[16px] gap-[10px] rounded-[5px] button-text font-bold uppercase tracking-wider bg-naranja hover:bg-gris active:bg-blanco active:text-azul hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <img
              src={sendIcon}
              alt="Ícono de enviar"
              className="size-[16px] group-active:invert-100"
            />
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </section>
  );
}
