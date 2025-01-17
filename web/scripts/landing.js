import { $, $$ } from '/scripts/index.js'
import { fetchCatalog } from '/scripts/fetching.js'
import { renderList, minGameRender } from '/scripts/renders.js'
import { link } from '/scripts/wrappers.js'

const drawDots = () => {
  const landingCanvas = $('.landing-section canvas')
  landingCanvas.width = window.innerWidth
  landingCanvas.height = $('.landing-section').offsetHeight
  const context = landingCanvas.getContext('2d')
  const colors = ['#cfc1b0', '#dcd2b0', '#e6d6b8', '#e6cbb8']
  const dots = new Array(24).fill(null).map(() => ({
    x: Math.floor(Math.random() * landingCanvas.width),
    y: Math.floor(Math.random() * landingCanvas.height),
    size: Math.random() * 3 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
  }))
  dots.forEach((dot) => {
    context.beginPath()
    context.fillStyle = dot.color
    context.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI)
    context.fill()
  })
}
drawDots()
window.addEventListener('resize', drawDots)

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
    const $sectionList =
      $button.parentElement.parentElement.querySelector('.catalog-list')

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
