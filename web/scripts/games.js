import { $ } from '/scripts/index.js'
import { fetchCatalog } from '/scripts/fetching.js'
import { renderList, mediumGameRender } from '/scripts/renders.js'

fetchCatalog('games', (data) => {
  renderList($('.games-list'), data, mediumGameRender)
})
