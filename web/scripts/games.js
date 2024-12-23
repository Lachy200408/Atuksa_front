import { $, $$ } from '/scripts/index.js'
import { fetchCatalog } from '/scripts/fetching.js'
import {
  renderList,
  mediumGameRender,
  completeGameRender,
} from '/scripts/renders.js'
import {
  GAME_EVENTS,
  GAME_DATA_VALUES,
  GAME_FILTER_FORM_DEFAULT_VALUES,
} from '/scripts/constants.js'

const RENDER_CART_EVENT = new Event(GAME_EVENTS.ON_CHANGE_CART)
const RENDER_EVENT = new Event(GAME_EVENTS.ON_RENDER)
const LSTNER_EVENT = new Event(GAME_EVENTS.ON_SET_EVENT_LSTNER)
const FILTER_EVENT = new Event(GAME_EVENTS.ON_FILTER)
const SHOW_SIDEBAR_EVENT = new Event(GAME_EVENTS.ON_SHOW_SIDEBAR)
const HIDE_SIDEBAR_EVENT = new Event(GAME_EVENTS.ON_HIDE_SIDEBAR)
const CHANGE_SEARCH_EVENT = new Event(GAME_EVENTS.ON_CHANGE_SEARCH)

let gamesData = []
let cart = []
let filteredData = []
let filters = null
let searchFilter = null
let isApplyingFilters = false

//* Utility functions

const resetCartUI = () => {
  $$('*[data-game-id]').forEach((game) => {
    game.classList.remove('in-cart')
    game.querySelector('.add-to-cart-btn').classList.remove('hidden')
    game.querySelector('.remove-from-cart-btn').classList.add('hidden')
  })
}

const getFormValues = () => {
  const $form = $('.filter-form')
  const state = $form.stateSelect.value
  const platform = $form.platformSelect.value
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
    platform,
    minPrice,
    maxPrice,
    genres,
    minSize,
    maxSize,
  }
}

const resetFormValues = () => {
  const $form = $('.filter-form')
  $form.stateSelect.value = GAME_FILTER_FORM_DEFAULT_VALUES.state
  $form.platformSelect.value = GAME_FILTER_FORM_DEFAULT_VALUES.platform
  $form.minPrice.value = GAME_FILTER_FORM_DEFAULT_VALUES.minPrice
  $form.maxPrice.value = GAME_FILTER_FORM_DEFAULT_VALUES.maxPrice
  $$('#filter-genres input[type="checkbox"]').forEach(
    (input) => (input.checked = false)
  )
  $form.minSize.value = GAME_FILTER_FORM_DEFAULT_VALUES.minSize
  $form.maxSize.value = GAME_FILTER_FORM_DEFAULT_VALUES.maxSize
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

const setGamesData = (data) => {
  gamesData = data
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
    const { state, genres, platform, minPrice, maxPrice, minSize, maxSize } =
      filters
    filteredData = gamesData.filter((game) => {
      return (
        (genres.every(([name, value]) => value === false) ||
          game.metadata.genres.some((genre) =>
            genres.some(([name, value]) => value && name === genre)
          )) &&
        (platform === GAME_DATA_VALUES.all ||
          game.metadata.platform === platform) &&
        game.price >= minPrice &&
        game.price <= maxPrice &&
        game.metadata.size >= minSize &&
        game.metadata.size <= maxSize &&
        (state === GAME_DATA_VALUES.all ||
          (state === GAME_DATA_VALUES.inCart && cart.includes(game.id)) ||
          (state === GAME_DATA_VALUES.outCart && !cart.includes(game.id)))
      )
    })
  } else {
    filteredData = [...gamesData]
  }

  if (searchFilter) {
    filteredData = filteredData.filter((game) => {
      return game.name.toLowerCase().includes(searchFilter.toLowerCase())
    })
  }
  dpEvnt(RENDER_EVENT)
}

const addToCart = (id) => {
  cart.push(id)
  dpEvnt(RENDER_CART_EVENT)
  if (isApplyingFilters && filters.state !== GAME_DATA_VALUES.all)
    dpEvnt(FILTER_EVENT)
}

const removeFromCart = (id) => {
  cart = cart.filter((_id) => _id !== id)
  dpEvnt(RENDER_CART_EVENT)
  if (isApplyingFilters && filters.state !== GAME_DATA_VALUES.all)
    dpEvnt(FILTER_EVENT)
}

//* Handle clicks

const onSeeMoreClick = (event) => {
  const { gameId } = event.target.closest('figure').dataset
  const game = filteredData.find((game) => game.id === gameId)
  const $sideBar = $('.games-sidebar')

  $sideBar.innerHTML = completeGameRender(game)

  $sideBar.querySelector('.add-to-cart-btn').onclick = () => addToCart(gameId)

  $sideBar.querySelector('.remove-from-cart-btn').onclick = () =>
    removeFromCart(gameId)

  $('.close-info-btn').onclick = () => dpEvnt(HIDE_SIDEBAR_EVENT)

  dpEvnt(SHOW_SIDEBAR_EVENT)
  dpEvnt(RENDER_CART_EVENT)
}

const onAddToCartClick = (event) => {
  const { gameId } = event.target.closest('figure').dataset
  addToCart(gameId)
}

const onRemoveFromCartClick = (event) => {
  const { gameId } = event.target.closest('figure').dataset
  removeFromCart(gameId)
}

const onSearchGameClick = () => {
  const $input = $('.search-form input')
  if (!$input.value) return
  setSearchFilter($input.value)
}

const onResetSearchGameClick = () => {
  const $input = $('.search-form input')
  $input.value = null
  setSearchFilter(null)
}

const onGetGamesClick = (event) => {
  event.preventDefault()
  const gameNames = cart.map(
    (id) => gamesData.find((game) => game.id === id).name
  )
  const text = `
		Hola, quisiera pedir los siguientes juegos:\n${gameNames
      .map((name) => `- ${name}`)
      .join('\n')}\nMis datos:\n
	`
  const url = 'https://wa.me/+5353299466?text=' + encodeURIComponent(text)
  window.open(url, '_blank').focus()
}

//* Event handlers

const onHideSidebar = () => {
  const $sideBar = $('.games-sidebar')
  $sideBar.classList.add('hidden')
  $sideBar.innerHTML = ''
}

const onShowSidebar = () => {
  const $sideBar = $('.games-sidebar')
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
    const $selectedGames = $$(`*[data-game-id="${id}"]`)

    $selectedGames.forEach((game) => {
      if (game.tagName === 'FIGURE') game.classList.add('in-cart')
      game.querySelector('.remove-from-cart-btn').classList.remove('hidden')
      game.querySelector('.add-to-cart-btn').classList.add('hidden')
    })
  })
}

const onRender = () => {
  renderList($('.games-list'), filteredData, mediumGameRender)
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
  $('.request-form .get-games-btn').onclick = onGetGamesClick
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
  $('.search-form .search-btn').onclick = onSearchGameClick
  $('.search-form .reset-search-btn').onclick = onResetSearchGameClick
}

//* Entry point

sign(GAME_EVENTS.ON_CHANGE_CART, onRenderCart)
sign(GAME_EVENTS.ON_RENDER, onRender)
sign(GAME_EVENTS.ON_SET_EVENT_LSTNER, onSetEventLstner)
sign(GAME_EVENTS.ON_SET_EVENT_LSTNER, onSetFilterFormEventLstner)
sign(GAME_EVENTS.ON_SET_EVENT_LSTNER, onSetSearchFormEventLstner)
sign(GAME_EVENTS.ON_CHANGE_SEARCH, onChangeSearch)
sign(GAME_EVENTS.ON_FILTER, setFilteredData)
sign(GAME_EVENTS.ON_SHOW_SIDEBAR, onShowSidebar)
sign(GAME_EVENTS.ON_HIDE_SIDEBAR, onHideSidebar)

fetchCatalog('games', setGamesData)
