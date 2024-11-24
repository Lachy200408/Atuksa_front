const RESOURCE_URL = 'https://atuksa-catalog.onrender.com'

export const fetchCatalog = (section, callback) => {
  fetch(`${RESOURCE_URL}/${section}`)
    .then((res) => res.json())
    .then(callback)
}
