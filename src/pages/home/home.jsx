import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { usePopupStore } from "../../store/usePopupStore";

import IngresaPopup from "./components/popup/formulario/ingresa-popup";
import BrochureComercialPopup from "./components/popup/formulario/brochure-comercial";
import WhatsappButton from "../../components/whatsapp-button";

import Amenidades from "./components/amenidades";
import AvanceObra from "./components/avance-obra";
import ConoceElProyecto from "./components/conoce-el-proyecto";
import Contacto from "./components/contacto";
import Footer from "./components/footer";
import GrupoTrecasa from "./components/grupo-trecasa";
import Hero from "./components/hero";
import PermisosDeObra from "./components/permisos-de-obra";
import Tipologias from "./components/tipologias";
import VideoBanner from "./components/video-banner";
import Visitanos from "./components/visitanos";

import { ModeloModal } from "./components/popup/modelos/modelo-modal";
import { MODELOS } from "../../data/modelos";
import Vista360 from "./components/vista-360";

const POPUP_DELAY = 12000;

export default function Home() {
  const [searchParams] = useSearchParams();
  const activePopup = usePopupStore((state) => state.activePopup);

  const modeloId = searchParams.get("modelo");
  const modeloData = MODELOS[modeloId];

  const openPopup = usePopupStore((state) => state.openPopup);

  // aparecer popup de registro después de x tiempo
  useEffect(() => {
    let timer;

    const handleFirstScroll = () => {
      window.removeEventListener("scroll", handleFirstScroll);

      timer = setTimeout(() => {
        if (!usePopupStore.getState().activePopup) {
          openPopup("register");
        }
      }, POPUP_DELAY);
    };

    window.addEventListener("scroll", handleFirstScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleFirstScroll);
      clearTimeout(timer);
    };
  }, [openPopup]);

  return (
    <main className="flex flex-col">
      <WhatsappButton />
      <Hero />
      <GrupoTrecasa />
      <PermisosDeObra />
      <Amenidades />
      <Tipologias />
      <Vista360 />
      <VideoBanner />
      <AvanceObra />
      <ConoceElProyecto />
      <Visitanos />
      <Contacto />
      <Footer />

      {modeloData && <ModeloModal id={modeloId} {...modeloData} />}
      {activePopup === "register" && (
        <IngresaPopup isOpen={activePopup === "register"} />
      )}
      {activePopup === "brochure-comercial" && (
        <BrochureComercialPopup isOpen={activePopup === "brochure-comercial"} />
      )}
    </main>
  );
}
