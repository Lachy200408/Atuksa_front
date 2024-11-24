//* Manipulates the DOM

export const renderList = (destination, list, render) => {
  list.forEach((item) => {
    const listItem = document.createElement('li')
    listItem.innerHTML = render(item)
    destination.appendChild(listItem)
  })
}

//* Create the HTML

export const minGameRender = ({ name, image }) => `
	<figure>
		<img
			src="${image}"
			alt="${name}"
			width="192"
			height="261"
			loading="lazy"
			aria-details="This is the game ${name}"
			aria-label="${name}"
			title="${name}"
		/>
		<figcaption>${name}</figcaption>
	</figure>
`
