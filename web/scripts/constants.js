export const GAME_EVENTS = {
  ON_HIDE_SIDEBAR: 'onhidesidebar',
  ON_SHOW_SIDEBAR: 'onshowsidebar',
  ON_CHANGE_CART: 'onchangecart',
  ON_RENDER: 'onrender',
  ON_SET_EVENT_LSTER: 'onseteventlstner',
  ON_FILTER: 'onfilter',
  ON_CHANGE_SEARCH: 'onchangesearch',
}

export const GAME_GENRES = {
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

export const GAME_LANGS = {
  spanish: 'Español',
  english: 'Inglés',
  spanishMulti: 'Español (Multilenguaje)',
}

export const GAME_PLATFORMS = {
  arcade: 'Arcade',
  console: 'Consola',
  pc: 'PC',
  mobile: 'Móvil',
}

export const GAME_METADATA = {
  genres: 'Géneros',
  platform: 'Plataforma',
  lang: 'Idioma',
  size: 'Tamaño',
  price: 'Precio',
}

export const GAME_STATES = {
  inCart: 'En el Carrito',
  outCart: 'Fuera del Carrito',
}

export const GAME_SIZES = {
  gb: 'GB',
  mb: 'MB',
  kb: 'KB',
}

export const GAME_DATA_VALUES = {
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
  state: GAME_DATA_VALUES.all,
  platform: GAME_DATA_VALUES.all,
  minPrice: 0,
  maxPrice: 500,
  genres: [],
  minSize: 0,
  maxSize: 200,
}
