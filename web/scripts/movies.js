import { $, $$ } from '/scripts/index.js'
import { fetchCatalog } from '/scripts/fetching.js'
import {
  renderList,
  mediumMovieRender,
  completeMovieRender,
} from '/scripts/renders.js'
import {
  CATALOG_EVENTS,
  MOVIE_FILTER_DATA_VALUES,
  MOVIE_FILTER_FORM_DEFAULT_VALUES,
} from '/scripts/constants.js'

const RENDER_CART_EVENT = new Event(CATALOG_EVENTS.ON_CHANGE_CART)
const RENDER_EVENT = new Event(CATALOG_EVENTS.ON_RENDER)
const LSTNER_EVENT = new Event(CATALOG_EVENTS.ON_SET_EVENT_LSTNER)
const FILTER_EVENT = new Event(CATALOG_EVENTS.ON_FILTER)
const SHOW_SIDEBAR_EVENT = new Event(CATALOG_EVENTS.ON_SHOW_SIDEBAR)
const HIDE_SIDEBAR_EVENT = new Event(CATALOG_EVENTS.ON_HIDE_SIDEBAR)
const CHANGE_SEARCH_EVENT = new Event(CATALOG_EVENTS.ON_CHANGE_SEARCH)

let moviesData = []
let cart = []
let filteredData = []
let filters = null
let searchFilter = null
let isApplyingFilters = false

//* Utility functions

const resetCartUI = () => {
  $$('*[data-movie-id]').forEach((game) => {
    game.classList.remove('in-cart')
    game.querySelector('.add-to-cart-btn').classList.remove('hidden')
    game.querySelector('.remove-from-cart-btn').classList.add('hidden')
  })
}

const getFormValues = () => {
  const $form = $('.filter-form')
  const state = $form.stateSelect.value
  const language = $form.languageSelect.value
  const minPrice = +$form.minPrice.value
  const maxPrice = +$form.maxPrice.value
  const genres = []
  $$('#filter-genres input[type="checkbox"]').forEach((input) =>
    genres.push([input.name, input.checked])
  )
  const minSize = +$form.minSize.value
  const maxSize = +$form.maxSize.value

  return {
    state,
    language,
    minPrice,
    maxPrice,
    genres,
    minSize,
    maxSize,
  }
}

const resetFormValues = () => {
  const $form = $('.filter-form')
  $form.stateSelect.value = MOVIE_FILTER_FORM_DEFAULT_VALUES.state
  $form.languageSelect.value = MOVIE_FILTER_FORM_DEFAULT_VALUES.language
  $form.minPrice.value = MOVIE_FILTER_FORM_DEFAULT_VALUES.minPrice
  $form.maxPrice.value = MOVIE_FILTER_FORM_DEFAULT_VALUES.maxPrice
  $$('#filter-genres input[type="checkbox"]').forEach(
    (input) => (input.checked = false)
  )
  $form.minSize.value = MOVIE_FILTER_FORM_DEFAULT_VALUES.minSize
  $form.maxSize.value = MOVIE_FILTER_FORM_DEFAULT_VALUES.maxSize
}

const assign = (destObj, obj) => {
  Object.assign(destObj, obj)
  return destObj
}

const dpEvnt = (event) => {
  dispatchEvent(event)
}

const sign = (event, fn) => {
  window.addEventListener(event, fn)
}

//* Manipulating the states

const setMoviesData = (data) => {
  moviesData = data
  setFilters(null)
}

const setFilters = (_filters) => {
  filters = _filters
  dpEvnt(FILTER_EVENT)
}

const setSearchFilter = (_searchFilter) => {
  searchFilter = _searchFilter
  dpEvnt(CHANGE_SEARCH_EVENT)
  dpEvnt(FILTER_EVENT)
}

const setFilteredData = () => {
  if (filters) {
    const { state, genres, language, minPrice, maxPrice, minSize, maxSize } =
      filters
    filteredData = moviesData.filter((movie) => {
      return (
        (genres.every(([name, value]) => value === false) ||
          movie.metadata.genres.some((genre) =>
            genres.some(([name, value]) => value && name === genre)
          )) &&
        (language === MOVIE_FILTER_DATA_VALUES.all ||
          movie.metadata.language === language) &&
        movie.price >= minPrice &&
        movie.price <= maxPrice &&
        movie.metadata.size >= minSize &&
        movie.metadata.size <= maxSize &&
        (state === MOVIE_FILTER_DATA_VALUES.all ||
          (state === MOVIE_FILTER_DATA_VALUES.inCart &&
            cart.includes(movie.id)) ||
          (state === MOVIE_FILTER_DATA_VALUES.outCart &&
            !cart.includes(movie.id)))
      )
    })
  } else {
    filteredData = [...moviesData]
  }

  if (searchFilter) {
    filteredData = filteredData.filter((movie) => {
      return movie.name.toLowerCase().includes(searchFilter.toLowerCase())
    })
  }
  dpEvnt(RENDER_EVENT)
}

const addToCart = (id) => {
  cart.push(id)
  dpEvnt(RENDER_CART_EVENT)
  if (isApplyingFilters && filters.state !== MOVIE_FILTER_DATA_VALUES.all)
    dpEvnt(FILTER_EVENT)
}

const removeFromCart = (id) => {
  cart = cart.filter((_id) => _id !== id)
  dpEvnt(RENDER_CART_EVENT)
  if (isApplyingFilters && filters.state !== MOVIE_FILTER_DATA_VALUES.all)
    dpEvnt(FILTER_EVENT)
}

//* Handle clicks

const onSeeMoreClick = (event) => {
  const { movieId } = event.target.closest('figure').dataset
  const movie = filteredData.find((movie) => movie.id === movieId)
  const $sideBar = $('.movies-sidebar')

  $sideBar.innerHTML = completeMovieRender(movie)

  $sideBar.querySelector('.add-to-cart-btn').onclick = () => addToCart(movieId)

  $sideBar.querySelector('.remove-from-cart-btn').onclick = () =>
    removeFromCart(movieId)

  $('.close-info-btn').onclick = () => dpEvnt(HIDE_SIDEBAR_EVENT)

  dpEvnt(SHOW_SIDEBAR_EVENT)
  dpEvnt(RENDER_CART_EVENT)
}

const onAddToCartClick = (event) => {
  const { movieId } = event.target.closest('figure').dataset
  addToCart(movieId)
}

const onRemoveFromCartClick = (event) => {
  const { movieId } = event.target.closest('figure').dataset
  removeFromCart(movieId)
}

const onSearchMovieClick = () => {
  const $input = $('.search-form input')
  if (!$input.value) return
  setSearchFilter($input.value)
}

const onResetSearchMovieClick = () => {
  const $input = $('.search-form input')
  $input.value = null
  setSearchFilter(null)
}

const onGetMoviesClick = (event) => {
  event.preventDefault()
  const movieNames = cart.map(
    (id) => moviesData.find((movie) => movie.id === id).name
  )
  const text = `
		Hola, quisiera pedir las siguientes películas:\n${movieNames
      .map((name) => `- ${name}`)
      .join('\n')}\nMis datos:\n
	`
  const url = 'https://wa.me/+5353299466?text=' + encodeURIComponent(text)
  window.open(url, '_blank').focus()
}

//* Event handlers

const onHideSidebar = () => {
  const $sideBar = $('.movies-sidebar')
  $sideBar.classList.add('hidden')
  $sideBar.innerHTML = ''
}

const onShowSidebar = () => {
  const $sideBar = $('.movies-sidebar')
  if (!$sideBar.classList.contains('hidden')) return
  $sideBar.classList.remove('hidden')
}

const onChangeSearch = () => {
  if (searchFilter) {
    $('.search-form input').oninput = () =>
      setSearchFilter($('.search-form input').value)
    $('.search-form .search-btn').classList.add('hidden')
    $('.search-form .reset-search-btn').classList.remove('hidden')
  } else {
    $('.search-form input').oninput = null
    $('.search-form .search-btn').classList.remove('hidden')
    $('.search-form .reset-search-btn').classList.add('hidden')
  }
}

const onRenderCart = () => {
  resetCartUI()

  cart.forEach((id) => {
    const $selectedMovies = $$(`*[data-movie-id="${id}"]`)

    $selectedMovies.forEach((movie) => {
      if (movie.tagName === 'FIGURE') movie.classList.add('in-cart')
      movie.querySelector('.remove-from-cart-btn').classList.remove('hidden')
      movie.querySelector('.add-to-cart-btn').classList.add('hidden')
    })
  })
}

const onRender = () => {
  renderList($('.movies-list'), filteredData, mediumMovieRender)
  dpEvnt(HIDE_SIDEBAR_EVENT)
  dpEvnt(RENDER_CART_EVENT)
  dpEvnt(LSTNER_EVENT)
}

const onSetEventLstner = () => {
  $$('.see-more-btn').forEach((btn) => (btn.onclick = onSeeMoreClick))
  $$('.add-to-cart-btn').forEach((btn) => (btn.onclick = onAddToCartClick))
  $$('.remove-from-cart-btn').forEach(
    (btn) => (btn.onclick = onRemoveFromCartClick)
  )
  $('.request-form .get-buy-btn').onclick = onGetMoviesClick
}

//* Filter event handlers

const onApplyFilters = (event) => {
  isApplyingFilters = event.target.checked
  const dispatch = () => {
    setFilters(getFormValues())
  }

  if (isApplyingFilters) {
    $$('.filter-form input:not([name="applyCheck"])').forEach((item) => {
      item.onchange = dispatch
    })
    $$('.filter-form select').forEach((item) => {
      item.onchange = dispatch
    })
    dispatch()
  } else {
    $$('.filter-form input:not([name="applyCheck"])').forEach((item) => {
      item.onchange = null
    })
    $$('.filter-form select').forEach((item) => {
      item.onchange = null
    })
    setFilters(null)
    resetFormValues()
  }
}

const onSetFilterFormEventLstner = () => {
  $('.filter-form').onsubmit = (event) => event.preventDefault()
  $('.filter-form #filter-apply').onchange = onApplyFilters
}

//* Search event handlers

const onSetSearchFormEventLstner = () => {
  $('.search-form .search-btn').onclick = onSearchMovieClick
  $('.search-form .reset-search-btn').onclick = onResetSearchMovieClick
}

//* Entry point

sign(CATALOG_EVENTS.ON_CHANGE_CART, onRenderCart)
sign(CATALOG_EVENTS.ON_RENDER, onRender)
sign(CATALOG_EVENTS.ON_SET_EVENT_LSTNER, onSetEventLstner)
sign(CATALOG_EVENTS.ON_SET_EVENT_LSTNER, onSetFilterFormEventLstner)
sign(CATALOG_EVENTS.ON_SET_EVENT_LSTNER, onSetSearchFormEventLstner)
sign(CATALOG_EVENTS.ON_CHANGE_SEARCH, onChangeSearch)
sign(CATALOG_EVENTS.ON_FILTER, setFilteredData)
sign(CATALOG_EVENTS.ON_SHOW_SIDEBAR, onShowSidebar)
sign(CATALOG_EVENTS.ON_HIDE_SIDEBAR, onHideSidebar)

fetchCatalog('movies', setMoviesData)
