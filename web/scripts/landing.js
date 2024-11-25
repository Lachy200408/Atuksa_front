import { $, $$ } from '/scripts/index.js'
import { fetchCatalog } from '/scripts/fetching.js'
import { renderList, minGameRender } from '/scripts/renders.js'
import { link } from '/scripts/wrappers.js'

fetchCatalog('games', (data) => {
  renderList($('.games-section .catalog-list'), data, (item) =>
    link(minGameRender(item), {
      href: `/es/games/`, //* TODO: Add the id
      class: 'no-under',
    }).toStr()
  )
})

const handleClickOnList = (callback) => {
  return (e) => {
    const $button = e.target
    const $sectionList = $button.parentElement.querySelector('.catalog-list')

    callback($sectionList)
  }
}
const rotateArrayPrev = handleClickOnList(($sectionList) => {
  $sectionList.prepend($sectionList.lastElementChild)
})
const rotateArrayNext = handleClickOnList(($sectionList) => {
  $sectionList.append($sectionList.firstElementChild)
})
$$('.catalog-section__prev-button').forEach(
  (button) => (button.onclick = rotateArrayPrev)
)
$$('.catalog-section__next-button').forEach(
  (button) => (button.onclick = rotateArrayNext)
)
