const PROJECT = "anna";

export const TRACK = {
  header: {
    expand: `${PROJECT}:header:expand:click`,
    collapse: `${PROJECT}:header:collapse:click`,
    logo: `${PROJECT}:header:logo:click`,
    nosotros: `${PROJECT}:header:nosotros:click`,
    conoce: `${PROJECT}:header:conoce-proyecto:click`,
    amenidades: `${PROJECT}:header:amenidades:click`,
    modelos: `${PROJECT}:header:modelos:click`,
    avance: `${PROJECT}:header:avance-obra:click`,
    contacto: `${PROJECT}:header:contacto:click`,
    socials: {
      facebook: `${PROJECT}:header:facebook:click`,
      instagram: `${PROJECT}:header:instagram:click`,
      whatsapp: `${PROJECT}:header:whatsapp:click`,
    },
  },
  hero: {
    showroom: `${PROJECT}:hero:cta:showroom:click`,
  },
  nosotros: {
    web: `${PROJECT}:nosotros:cta:visitar-web:click`,
  },
  amenidades: {
    carousel: {
      prev: `${PROJECT}:amenidades:carousel:prev:click`,
      next: `${PROJECT}:amenidades:carousel:next:click`,
      slide: (index) => `${PROJECT}:amenidades:carousel:slide:${index}:click`,
    },
  },
  modelos: {
    ver: (id) => `${PROJECT}:modelos:${id}:ver:click`,
    cerrar: (id) => `${PROJECT}:modelos:${id}:cerrar:click`,
  },
  vista360: {
    nivel: (id) => `${PROJECT}:vista360:nivel:${id}:click`,
    volver: (id) => `${PROJECT}:vista360:nivel:${id}:volver:click`,
    carousel: {
      prev: (id) => `${PROJECT}:vista360:nivel:${id}:carousel:prev:click`,
      next: (id) => `${PROJECT}:vista360:nivel:${id}:carousel:next:click`,
      media: (id, index) =>
        `${PROJECT}:vista360:nivel:${id}:carousel:media:${index}:click`,
    },
  },
};
