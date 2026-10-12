const isDev = import.meta.env.DEV; // Vite

export const track = (event, params = {}) => {
  if (typeof window === "undefined") return;

  if (isDev) {
    console.log(`[track] ${event}`);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
};
