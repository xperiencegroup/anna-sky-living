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
  avanceObra: {
    carousel: {
      prev: `${PROJECT}:avance-obra:carousel:prev:click`,
      next: `${PROJECT}:avance-obra:carousel:next:click`,
      slide: (index) => `${PROJECT}:avance-obra:carousel:slide:${index}:click`,
    },
  },
  conoceProyecto: {
    brochure: `${PROJECT}:conoce-proyecto:cta:brochure:click`,

    popup: {
      cerrar: `${PROJECT}:brochure:popup:cerrar:click`,
      success: `${PROJECT}:brochure:form:success`,
      error: `${PROJECT}:brochure:form:error`,
    },
  },
  visitanos: {
    whatsapp: `${PROJECT}:visitanos:cta:whatsapp:click`,
    telefono: `${PROJECT}:visitanos:telefono:click`,
    correo: `${PROJECT}:visitanos:correo:click`,
    ubicacion: `${PROJECT}:visitanos:ubicacion:click`,
    mapa: `${PROJECT}:visitanos:mapa:click`,
  },
  contacto: {
    form: {
      success: `${PROJECT}:contacto:form:success`,
      error: `${PROJECT}:contacto:form:error`,
    },
  },
};
