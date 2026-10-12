import React, { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { track } from "../../analytics/track";
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay,
} from "./EmblaCarouselSelectedSnapDisplay";
import arrowIcon from "../../assets/icons/arrow.svg";

export function Carousel({
  slides = [],
  variant,
  isAnySelected,
  autoScrollOptions = {},
  emblaOptions = {},
  onSlideChange,
  tracking,
}) {
  const autoScroll = useRef(
    AutoScroll({
      speed: 1,
      startDelay: 1000,
      stopOnInteraction: true,
      stopOnMouseEnter: false,
      ...autoScrollOptions,
    }),
  );

  const isPausedRef = useRef(false);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      startIndex: 0,
      duration: 30,
      ...emblaOptions,
    },
    [autoScroll.current],
  );

  // Re-medir cuando un slide cambia de tamaño
  useEffect(() => {
    if (!emblaApi) return;

    const container = emblaApi.containerNode();
    const observer = new ResizeObserver(() => {
      emblaApi.reInit();
      if (isPausedRef.current) {
        autoScroll.current.stop();
      }
    });

    observer.observe(container);
    Array.from(container.children).forEach((slide) => observer.observe(slide));

    return () => observer.disconnect();
  }, [emblaApi]);

  // Reanudar cuando se deselecciona
  useEffect(() => {
    if (!emblaApi) return;
    if (!isAnySelected) {
      isPausedRef.current = false;
      autoScroll.current.play();
    }
  }, [isAnySelected, emblaApi]);

  const handleSlideClick = (index) => {
    if (tracking?.slide) {
      track(tracking.slide(index + 1));
    }

    isPausedRef.current = true;
    autoScroll.current.stop();
    emblaApi?.scrollTo(index);
  };

  const scrollNext = () => {
    if (tracking?.next) track(tracking.next);

    isPausedRef.current = true;
    autoScroll.current.stop();
    emblaApi?.scrollNext();
  };

  const scrollPrev = () => {
    if (tracking?.prev) track(tracking.prev);

    isPausedRef.current = true;
    autoScroll.current.stop();
    emblaApi?.scrollPrev();
  };

  const handleMouseLeave = () => {
    if (isAnySelected) return; // si hay algo seleccionado, no reanudar solo
    isPausedRef.current = false;
    autoScroll.current.play();
  };

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  // NUEVO: avisa al padre cada vez que cambia el slide activo
  useEffect(() => {
    onSlideChange?.(selectedSnap);
  }, [selectedSnap, onSlideChange]);

  return (
    <div
      className="relative embla flex flex-col justify-center w-full h-full"
      onMouseLeave={handleMouseLeave}
    >
      <div className="embla__viewport h-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex h-full items-center">
          {variant === "card" &&
            slides.map((slide, index) => (
              <div
                key={index}
                className="embla__slide"
                onClick={() => handleSlideClick(index)}
              >
                {slide}
              </div>
            ))}
        </div>
      </div>

      {/* Wrapper: fila centrada en <375px, "contents" en >=375px */}
      <div className="flex justify-center gap-4 mt-4 min-[375px]:contents">
        {/* Left arrow */}
        <button
          onClick={scrollPrev}
          aria-label="Anterior"
          className="group flex justify-center items-center z-20 p-[10px] rounded-[10px] bg-naranja hover:bg-gris hover:cursor-pointer active:bg-blanco hover:drop-shadow-lg drop-shadow-black/20
        relative
        min-[375px]:absolute min-[375px]:bottom-1/2 min-[375px]:translate-y-1/2 min-[375px]:-translate-x-[48px] md:-translate-x-[62px]"
        >
          <img
            src={arrowIcon}
            draggable={false}
            alt=""
            className="w-[20.4px] h-[32px] group-active:brightness-0 rotate-180"
          />
        </button>

        {/* Right arrow */}
        <button
          onClick={scrollNext}
          aria-label="Siguiente"
          className="group flex justify-center items-center z-20 p-[10px] rounded-[10px] bg-naranja hover:bg-gris hover:cursor-pointer active:bg-blanco hover:drop-shadow-lg drop-shadow-black/20
        relative
        min-[375px]:absolute min-[375px]:bottom-1/2 min-[375px]:right-0 min-[375px]:translate-y-1/2 min-[375px]:translate-x-[48px] md:translate-x-[62px]"
        >
          <img
            src={arrowIcon}
            draggable={false}
            alt=""
            className="w-[20.4px] h-[32px] group-active:brightness-0"
          />
        </button>
      </div>
    </div>
  );
}
