const RESOURCE_URL = 'https://atuksa-catalog.onrender.com'

export const fetchCatalog = (section, callback) => {
  //* Development
  // fetch('/dev-catalog-site/games.json')
  //   .then((res) => res.json())
  //   .then(callback)

  //* Production
  fetch(`${RESOURCE_URL}/${section}`)
    .then((res) => res.json())
    .then(callback)
}
