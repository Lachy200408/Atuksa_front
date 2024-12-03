import { $ } from '/scripts/index.js'

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  $('.theme-btn').setAttribute('data-theme', 'dark')
}

if (sessionStorage.getItem('theme') === 'dark') {
  $('.theme-btn').classList.add('dark')
  document.documentElement.classList.add('dark')
} else if (sessionStorage.getItem('theme') === 'light') {
  $('.theme-btn').classList.remove('dark')
  document.documentElement.classList.remove('dark')
}

$('.theme-btn').addEventListener('click', () => {
  const root = document.documentElement
  $('.theme-btn').classList.toggle('dark')
  root.classList.toggle('dark')
  sessionStorage.setItem(
    'theme',
    root.classList.contains('dark') ? 'dark' : 'light'
  )
})
