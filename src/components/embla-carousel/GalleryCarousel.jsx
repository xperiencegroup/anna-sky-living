import React, { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function GalleryCarrousel({
  images = [],
  navIndicator,
  showArrows = false,
}) {
  const autoplay = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));

  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [selectedSnap, setSelectedSnap] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);

  const scrollPrev = () => emblaApi?.scrollPrev();

  const scrollNext = () => emblaApi?.scrollNext();

  const goTo = (index) => emblaApi?.scrollTo(index);

  const setupSnaps = (api) => setScrollSnaps(api.scrollSnapList());

  const setActiveSnap = (api) => setSelectedSnap(api.selectedScrollSnap());

  useEffect(() => {
    if (!emblaApi) return;

    autoplay.current.play();

    setupSnaps(emblaApi);
    setActiveSnap(emblaApi);

    emblaApi.on("reInit", setupSnaps);
    emblaApi.on("reInit", setActiveSnap);
    emblaApi.on("select", setActiveSnap);
  }, [emblaApi]);

  return (
    <div className="embla relative flex flex-col justify-end w-full h-full text-valo">
      <div className="embla__viewport w-full h-full flex" ref={emblaRef}>
        <div className="embla__container flex w-full h-full">
          {images.map((src, index) => (
            <div key={index} className="flex-[0_0_100%]">
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                fetchPriority={index === 0 ? "high" : "auto"}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-[60px] w-full flex gap-[22px] justify-center">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className="flex hover:cursor-pointer"
          >
            {navIndicator?.(index, index === selectedSnap)}
          </button>
        ))}
      </div>

      {/* Arrows */}
      {showArrows && (
        <>
          {/* Left */}
          <button
            onClick={scrollPrev}
            className="absolute left-[clamp(8px,1vw,20px)] top-1/2 z-20 flex items-center justify-center -translate-y-1/2 size-[clamp(20.67px,3.645833vw,70px)] p-[clamp(4.43px,0.78125vw,15px)] bg-white text-foro4-morado transition-opacity duration-200 hover:cursor-pointer hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 19 34"
              fill="none"
              className="w-[clamp(3.5px,1.099vw,8px)] lg:w-[clamp(8.4px,2.61vw,19px)]"
            >
              <path
                d="M0.446091 15.6639L15.6635 0.446472C15.8049 0.305088 15.9727 0.192936 16.1574 0.116421C16.3422 0.0399017 16.5402 0.000518799 16.7401 0.000518799C16.9401 0.000518799 17.1381 0.0399017 17.3228 0.116421C17.5075 0.192936 17.6754 0.305088 17.8167 0.446472C17.9581 0.58786 18.0703 0.755707 18.1468 0.940437C18.2233 1.12516 18.2627 1.32315 18.2627 1.5231C18.2627 1.72305 18.2233 1.92105 18.1468 2.10577C18.0703 2.2905 17.9581 2.45835 17.8167 2.59974L3.67408 16.7405L17.8167 30.8813C18.1023 31.1668 18.2627 31.5541 18.2627 31.9579C18.2627 32.3617 18.1023 32.749 17.8167 33.0345C17.5312 33.3201 17.1439 33.4805 16.7401 33.4805C16.3363 33.4805 15.949 33.3201 15.6635 33.0345L0.446091 17.8171C0.304605 17.6758 0.192362 17.508 0.115782 17.3232C0.0392017 17.1385 -0.000213623 16.9405 -0.000213623 16.7405C-0.000213623 16.5405 0.0392017 16.3425 0.115782 16.1578C0.192362 15.973 0.304605 15.8052 0.446091 15.6639Z"
                fill="#151515"
              />
            </svg>
          </button>

          {/* Right */}
          <button
            onClick={scrollNext}
            className="absolute right-[clamp(8px,1vw,20px)] top-1/2 z-20 flex items-center justify-center -translate-y-1/2 size-[clamp(20.67px,3.645833vw,70px)] p-[clamp(4.43px,0.78125vw,15px)] bg-white text-foro4-morado transition-opacity duration-200 hover:cursor-pointer hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 19 34"
              fill="none"
              className="w-[clamp(3.5px,1.099vw,8px)] lg:w-[clamp(8.4px,2.61vw,19px)]"
            >
              <path
                d="M17.8166 17.8166L2.59922 33.034C2.45783 33.1754 2.28998 33.2875 2.10525 33.364C1.92052 33.4406 1.72253 33.4799 1.52258 33.4799C1.32264 33.4799 1.12465 33.4406 0.939917 33.364C0.755188 33.2875 0.587339 33.1754 0.445954 33.034C0.304569 32.8926 0.192416 32.7248 0.115899 32.54C0.0393821 32.3553 0 32.1573 0 31.9574C0 31.7574 0.0393821 31.5594 0.115899 31.3747C0.192416 31.19 0.304569 31.0221 0.445954 30.8807L14.5886 16.74L0.445954 2.59922C0.160414 2.31368 -3.00865e-09 1.9264 0 1.52258C3.00866e-09 1.11877 0.160414 0.731495 0.445954 0.445955C0.731494 0.160415 1.11877 3.00865e-09 1.52258 0C1.9264 -3.00865e-09 2.31368 0.160415 2.59922 0.445955L17.8166 15.6633C17.9581 15.8047 18.0703 15.9725 18.1469 16.1572C18.2235 16.342 18.2629 16.54 18.2629 16.74C18.2629 16.94 18.2235 17.138 18.1469 17.3227C18.0703 17.5074 17.9581 17.6753 17.8166 17.8166Z"
                fill="#151515"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
