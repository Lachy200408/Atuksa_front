import { $ } from '/scripts/index.js'
import { fetchCatalog } from '/scripts/fetching.js'
import { renderList, minGameRender } from '/scripts/renders.js'

fetchCatalog('games', (data) => {
  renderList($('.games-list'), data, minGameRender)
})
