import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { NavIndicator } from "../../../../../components/nav-indicator/nav-indicator";
import { GalleryCarrousel } from "../../../../../components/embla-carousel/GalleyCarousel";

import closeIcon from "../../../../../assets/icons/close.svg";
import closeIconActive from "../../../../../assets/icons/close-blue.svg";
import { track } from "../../../../../analytics/track";
import { TRACK } from "../../../../../analytics/track.constants";

/**
 * Modal universal para todas las fichas de modelo (tipo-a, tipo-b, ..., lock-off).
 * Recibe toda la data como props; no importa nada específico de un modelo.
 *
 * @param {Object} props
 * @param {string} props.id - Ej. "tipo-a"
 * @param {string} props.titulo - Ej. "Tipo A / 81.77 M2"
 * @param {string} [props.subtitulo] - opcional, ej. lock-off tiene un párrafo descriptivo debajo del título
 * @param {string} props.imageRender - src de la imagen "render"
 *  * @param {string} [props.imageRenderVertical] - opcional, versión vertical del render para pantallas < xl (ej. tipo-f, lock-off)
 * @param {string} props.imageFrame - src de la imagen "frame"
 * @param {{ id: string, label: string, icon: string }[]} props.descripcion
 * @param {{ id: string, label: string, icon: string }[]} [props.comoSeEntrega] - opcional (ej. lock-off puede no tenerlo)
 * @param {{ id: string, label: string, icon: string }[]} [props.departamento2] - opcional (ej. lock-off puede no tenerlo)
 * @param {string[]} props.carouselImages - imágenes del carrusel inferior
 */
export function ModeloModal({
  id,
  titulo,
  subtitulo,
  imageRender,
  imageRenderVertical,
  imageFrame,
  descripcion,
  comoSeEntrega,
  departamento2,
  carouselImages,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const cerrarModal = () => {
    track(TRACK.modelos.cerrar(id));

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("modelo");
      return params;
    });
  };

  useEffect(() => {
    // Bloquea el scroll del body mientras el modal está abierto
    document.body.style.overflow = "hidden";

    // Restaura el scroll al cerrar el modal / desmontar el componente
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      data-lenis-prevent
      className="fixed top-0 z-50 w-full h-full bg-azul overflow-y-auto"
    >
      <div className="relative w-full flex flex-col items-center px-[44px] pt-[100px] pb-[60px] md:p-[60px] gap-[40px] xl:gap-[20px]">
        {/* Botón de cerrar */}
        <button
          onClick={cerrarModal}
          className="group absolute flex size-[42px] xl:size-[56px] right-[20px] top-[20px] px-[8px] justify-center items-center rounded-[10px] bg-naranja hover:bg-gris active:bg-blanco hover:cursor-pointer"
        >
          <img
            src={closeIcon}
            alt="Ícono de cerrar"
            className="size-[34.5px] block group-active:hidden"
          />
          <img
            src={closeIconActive}
            alt="Ícono de cerrar"
            className="size-[34.5px] hidden group-active:block"
          />
        </button>

        <div className="text-center">
          <h2 className="header-3 font-bangla leading-none uppercase">
            {titulo}
          </h2>
          {subtitulo && (
            <p className="paragraph w-full max-w-[954px] text-blanco">
              {subtitulo}
            </p>
          )}
        </div>

        {/* Imagenes */}
        <div
          className={`flex flex-col xl:flex-row shrink-0 justify-between items-center xl:gap-[17px] w-full max-w-[1160px] xl:h-[573px] ${id === "tipo-f" || id === "lock-off" ? "gap-[40px]" : "gap-[20px]"}`}
        >
          {/* imagen de render */}
          <picture className="flex shrink-0">
            {imageRenderVertical && (
              <source media="(min-width: 1280px)" srcSet={imageRender} />
            )}
            <img
              src={imageRenderVertical ?? imageRender}
              alt={`Render modelo ${titulo}`}
              className={`flex shrink-0`}
            />
          </picture>

          {/* imagen de frame */}
          <img
            src={imageFrame}
            alt={`Frame modelo ${titulo}`}
            className={`flex shrink-0 ${id === "tipo-f" || id === "lock-off" ? "max-[440px]:w-[60%] min-[440px]:h-[215px] md:h-[253px] xl:h-[235px]" : "max-[440px]:w-[60%] min-[440px]:h-[215px] md:h-[304px] xl:h-[364px] "}`}
          />
        </div>

        {/* Descripción */}
        <div
          className={`flex flex-col xl:flex-row xl:justify-center w-full gap-[30px] ${id === "lock-off" ? "xl:items-start" : "xl:items-center"}`}
        >
          {/* Lista 1 */}
          <ModeloListaItems titulo="Descripción" items={descripcion} />

          {/* Lista 2 "Como se entrega" (opcional) */}
          {comoSeEntrega?.length > 0 && (
            <ModeloListaItems titulo="Como se entrega" items={comoSeEntrega} />
          )}

          {/* Lista Lock Off */}
          {departamento2?.length > 0 && (
            <ModeloListaItems titulo="Departamento 2" items={departamento2} />
          )}
        </div>
      </div>
    </div>
  );
}

/** Bloque reutilizable de lista con ícono + label (Descripción / Como se entrega) */
function ModeloListaItems({ titulo, items }) {
  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <h3 className="header-2 font-bangla uppercase">{titulo}</h3>

      <div className="flex flex-col gap-[20px]">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-[20px]">
            <div className="flex shrink-0 justify-center items-center w-[66px] h-[50px] border border-naranja rounded-[4px]">
              <img src={item.icon} alt={item.label} className="size-[35px]" />
            </div>
            <span className="paragraph font-bold uppercase text-blanco whitespace-pre-line">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
