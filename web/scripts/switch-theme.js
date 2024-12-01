import { $ } from '/scripts/index.js'

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  $('.theme-btn').setAttribute('data-theme', 'dark')
}

$('.theme-btn').addEventListener('click', () => {
  $('.theme-btn').classList.toggle('dark')
  document.documentElement.classList.toggle('dark')
})
