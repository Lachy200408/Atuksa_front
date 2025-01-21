//* Common constants

export const CATALOG_EVENTS = {
  ON_HIDE_SIDEBAR: 'onhidesidebar',
  ON_SHOW_SIDEBAR: 'onshowsidebar',
  ON_CHANGE_CART: 'onchangecart',
  ON_RENDER: 'onrender',
  ON_SET_EVENT_LSTER: 'onseteventlstner',
  ON_FILTER: 'onfilter',
  ON_CHANGE_SEARCH: 'onchangesearch',
}
export const ITEM_STATES = {
  inCart: 'En el Carrito',
  outCart: 'Fuera del Carrito',
}
export const ITEM_SIZES = {
  gb: 'GB',
  mb: 'MB',
  kb: 'KB',
}

//* Games constants

export const GAME_GENRES_DISPLAYABLE = {
  action: 'Acción',
  adventure: 'Aventura',
  arcade: 'Arcade',
  platform: 'Plataforma',
  puzzle: 'Puzzle',
  racing: 'Carreras',
  rol: 'Rol',
  shooter: 'Tiro',
  sports: 'Deportes',
  strategy: 'Estrategia',
  rpg: 'RPG',
  simulation: 'Simulación',
  openWorld: 'Mundo Abierto',
  indie: 'Indie',
  isometric: 'Isométrico',
  stealth: 'Sigilo',
  survival: 'Supervivencia',
  fantasy: 'Fantasía',
}
export const GAME_LANGS_DISPLAYABLE = {
  spanish: 'Español',
  english: 'Inglés',
  spanishMulti: 'Español (Multilenguaje)',
}
export const GAME_PLATFORMS_DISPLAYABLE = {
  arcade: 'Arcade',
  console: 'Consola',
  pc: 'PC',
  mobile: 'Móvil',
}
export const GAME_METADATA_DISPLAYABLE = {
  genres: 'Géneros',
  platform: 'Plataforma',
  lang: 'Idioma',
  size: 'Tamaño',
  price: 'Precio',
}
export const GAME_FILTER_DATA_VALUES = {
  all: 'all',
  inCart: 'inCart',
  outCart: 'outCart',
  platform: 'platform',
  minPrice: 'minPrice',
  maxPrice: 'maxPrice',
  minSize: 'minSize',
  maxSize: 'maxSize',
  genres: 'genres',
}
export const GAME_FILTER_FORM_DEFAULT_VALUES = {
  state: GAME_FILTER_DATA_VALUES.all,
  platform: GAME_FILTER_DATA_VALUES.all,
  minPrice: 0,
  maxPrice: 500,
  genres: [],
  minSize: 0,
  maxSize: 200,
}

//* Movies constants

export const MOVIE_GENRES_DISPLAYABLE = {
  action: 'Acción',
  adventure: 'Aventura',
  fantasy: 'Fantasía',
  horror: 'Horror',
  mystery: 'Misterio',
  romance: 'Romance',
  scifi: 'Ciencia Ficción',
  thriller: 'Thriller',
  war: 'Guerra',
  western: 'Western',
  comedy: 'Comedia',
  documentary: 'Documental',
  drama: 'Drama',
}
export const MOVIE_LANGS_DISPLAYABLE = {
  spanish: 'Español',
  english: 'Inglés',
  french: 'Francés',
  german: 'Alemán',
  italian: 'Italiano',
  russian: 'Ruso',
}
export const MOVIE_METADATA_DISPLAYABLE = {
  genres: 'Géneros',
  lang: 'Idioma',
  size: 'Tamaño',
  price: 'Precio',
}
export const MOVIE_FILTER_DATA_VALUES = {
  all: 'all',
  inCart: 'inCart',
  outCart: 'outCart',
  platform: 'platform',
  minPrice: 'minPrice',
  maxPrice: 'maxPrice',
  minSize: 'minSize',
  maxSize: 'maxSize',
  genres: 'genres',
}
export const MOVIE_FILTER_FORM_DEFAULT_VALUES = {
  state: MOVIE_FILTER_DATA_VALUES.all,
  platform: MOVIE_FILTER_DATA_VALUES.all,
  minPrice: 0,
  maxPrice: 500,
  genres: [],
  minSize: 0,
  maxSize: 200,
}
