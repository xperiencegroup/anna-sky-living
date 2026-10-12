import { track } from "../analytics/track";
import { TRACK } from "../analytics/track.constants";
import { whatsappInfo } from "../data/social";

export default function WhatsappButton() {
  return (
    <a
      href={whatsappInfo.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(TRACK.whatsappFloat.click)}
      className="fixed z-10 bottom-3 right-3 md:bottom-8 md:right-12 flex size-[42px] justify-center items-cente p-[8px] rounded-[7.5px] bg-naranja"
    >
      <img src={whatsappInfo.icon} alt="Ícono de whatsapp" />
    </a>
  );
}
