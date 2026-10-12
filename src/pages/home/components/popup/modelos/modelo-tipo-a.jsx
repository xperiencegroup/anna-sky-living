import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { NavIndicator } from "../../../../../components/nav-indicator/nav-indicator";

import closeIcon from "../../../../../assets/icons/close.svg";

import camaIcon from "../../../../../assets/icons/modelos/cama.svg";
import closetIcon from "../../../../../assets/icons/modelos/closet.svg";
import banoIcon from "../../../../../assets/icons/modelos/bano.svg";
import salaIcon from "../../../../../assets/icons/modelos/sala.svg";
import comedorIcon from "../../../../../assets/icons/modelos/comedor.svg";
import cocinaIcon from "../../../../../assets/icons/modelos/cocina.svg";
import terrazaIcon from "../../../../../assets/icons/modelos/terraza.svg";
import lavadoIcon from "../../../../../assets/icons/modelos/lavado.svg";
import estacionamientoIcon from "../../../../../assets/icons/modelos/estacionamiento.svg";

import pisoIcon from "../../../../../assets/icons/modelos/piso.svg";
import accesoriosBanoIcon from "../../../../../assets/icons/modelos/accesorios-bano.svg";
import puertasIcon from "../../../../../assets/icons/modelos/puertas.svg";

// images carousel
import vista1 from "../../../../../assets/images/modelos/interiores/INTERIORES-1.webp";
import vista2 from "../../../../../assets/images/modelos/interiores/INTERIORES-2.webp";

import imageRender from "../../../../../assets/images/modelos/vista-tipo-a/render.png";
import imageFrame from "../../../../../assets/images/modelos/vista-tipo-a/frame.png";
import { GalleryCarrousel } from "../../../../../components/embla-carousel/GalleryCarousel";

const descripcion = [
  {
    id: "recamaras",
    label: "2 recámaras",
    icon: camaIcon,
  },
  {
    id: "walk-in-closet",
    label: "Walk-in closet (recámara principal)",
    icon: closetIcon,
  },
  {
    id: "banos",
    label: "2 baños",
    icon: banoIcon,
  },
  {
    id: "sala",
    label: "Sala",
    icon: salaIcon,
  },
  {
    id: "comedor",
    label: "Comedor",
    icon: comedorIcon,
  },
  {
    id: "cocina",
    label: "Cocina",
    icon: cocinaIcon,
  },
  {
    id: "terraza",
    label: "Terraza",
    icon: terrazaIcon,
  },
  {
    id: "centro-lavado",
    label: "Centro de lavado",
    icon: lavadoIcon,
  },
  {
    id: "cajones-estacionamiento",
    label: "2 cajones de estacionamiento",
    icon: estacionamientoIcon,
  },
];

const comoSeEntrega = [
  {
    id: "piso",
    label: "Piso",
    icon: pisoIcon,
  },
  {
    id: "accesorios-bano",
    label: "Accesorios de baño",
    icon: accesoriosBanoIcon,
  },
  {
    id: "puertas",
    label: "Puertas",
    icon: puertasIcon,
  },
];

export default function ModeloTipoA() {
  const [searchParams, setSearchParams] = useSearchParams();

  const cerrarModal = () => {
    searchParams.delete("modelo");
    setSearchParams(searchParams);
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
    <div className="fixed top-0 z-50 w-full h-full bg-azul overflow-y-auto">
      <div className="relative w-full flex flex-col items-center px-[44px] pt-[100px] pb-[60px] md:p-[60px] gap-[40px] xl:gap-[20px]">
        {/* Botón de cerrar */}
        <button
          onClick={cerrarModal}
          className="absolute flex size-[42px] xl:size-[56px] right-[20px] top-[20px] px-[8px] justify-center items-center rounded-[10px] bg-naranja hover:cursor-pointer"
        >
          <img
            src={closeIcon}
            alt="Ícono de cerrar"
            className="size-[34.5px]"
          />
        </button>

        <h2 className="header-3 font-bangla leading-none uppercase">
          Tipo A / 81.77 M2
        </h2>

        {/* Imagenes */}
        <div className="flex flex-col xl:flex-row shrink-0 justify-between items-center xl:gap-[17px] w-full max-w-[1160px] xl:h-[573px]">
          <img
            src={imageRender}
            alt="Render modelo tipo A"
            className="flex shrink-0"
          />
          <img
            src={imageFrame}
            alt="Frame modelo tipo A"
            className="flex shrink-0 xl:h-[364px]"
          />
        </div>

        {/* Descripción */}
        <div className="flex flex-col xl:flex-row xl:justify-center xl:items-center w-full gap-[30px]">
          {/* Lista 1 */}
          <div className="flex flex-1 flex-col gap-[20px]">
            <h3 className="header-2 font-bangla uppercase">Descripción</h3>

            {/* lista */}
            <div className="flex flex-col gap-[20px]">
              {descripcion.map((item) => (
                <div key={item.id} className="flex items-center gap-[20px]">
                  <div className="flex shrink-0 justify-center items-center w-[66px] h-[50px] border border-naranja rounded-[4px]">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="size-[35px]"
                    />
                  </div>
                  <span className="paragraph font-bold uppercase text-blanco">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Lista 2 "Como se entrega" */}
          <div className="flex flex-1 flex-col gap-[20px]">
            <h3 className="header-2 font-bangla uppercase">Como se entrega</h3>

            {/* lista */}
            {comoSeEntrega.map((item) => (
              <div key={item.id} className="flex items-center gap-[20px]">
                <div className="flex shrink-0 justify-center items-center w-[66px] h-[50px] border border-naranja rounded-[4px]">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="size-[35px]"
                  />
                </div>
                <span className="paragraph font-bold uppercase text-blanco">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* imagen */}
      <div className="relative w-full h-[800px]">
        {/* overlay */}
        <div className="absolute z-10 inset-0 w-full h-full bg-linear-to-b from-azul to-[37%] to-azul/0 pointer-events-none" />
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <GalleryCarrousel
            images={[vista1, vista2]}
            navIndicator={NavIndicator}
          />
        </div>
      </div>
    </div>
  );
}
