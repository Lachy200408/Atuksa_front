import {
  GAME_METADATA_DISPLAYABLE,
  GAME_GENRES_DISPLAYABLE,
  GAME_LANGS_DISPLAYABLE,
  GAME_PLATFORMS_DISPLAYABLE,
  ITEM_SIZES,
  MOVIE_METADATA_DISPLAYABLE,
  MOVIE_GENRES_DISPLAYABLE,
  MOVIE_LANGS_DISPLAYABLE,
} from '/scripts/constants.js'

//* Manipulates the DOM

export const renderList = (destination, list, render) => {
  destination.innerHTML = null
  list.forEach((item) => {
    const listItem = document.createElement('li')
    listItem.innerHTML = render(item)
    destination.appendChild(listItem)
  })
}

//* Create the HTML

export const minGameRender = ({ name, image }) => `
	<figure class="min-card-landing" aria-details="This is the game ${name}" aria-label="${name}">
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
		<figcaption>
			<p class="text-center">${name}</p>
		</figcaption>
	</figure>
`

export const mediumGameRender = ({ id, name, image, price }) => `
	<figure class="min-card" data-game-id="${id}" aria-details="This is the game ${name}" aria-label="${name}">
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
		<figcaption class="w-full">
			<p class="text-center">${name}</p>
			<p class="text-md padding-sm margin-sm rounded-sm bg-blue w-max">
				<strong>${price} - CUP</strong>
			</p>
			<div class="flex flex-wrap gap-sm justify-between w-full padding-sm">
				<button class="blue-button see-more-btn">
					Ver más
				</button>
				<button class="red-button remove-from-cart-btn hidden">
					<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
						height="24" fill="none" viewBox="0 0 24 24">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
					</svg>
				</button>
				<button class="blue-button add-to-cart-btn">
					<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
						height="24" fill="none" viewBox="0 0 24 24">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
					</svg>
				</button>
			</div>
		</figcaption>
	</figure>
`

export const completeGameRender = ({
  id,
  name,
  image,
  description,
  metadata,
  price,
}) => `
	<section class="game-info" data-game-id="${id}" aria-details="This is the game ${name}" aria-label="${name}">
		<button
			class="close-info-btn"
			aria-label="Close"
			aria-labelledby="Button"
			title="Close info view"
		>
			<svg
				class="w-6 h-6 text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
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
		<h2 class="text-center">${name}</h2>
		<p class="text-center text-balance">${description}</p>
		<ul class="no-list grid j-items-center">
			<li class="text-center">${GAME_METADATA_DISPLAYABLE.platform}: ${
  GAME_PLATFORMS_DISPLAYABLE[metadata.platform]
}</li>
			<li class="text-center">${GAME_METADATA_DISPLAYABLE.genres}: ${metadata.genres
  .map((genre) => GAME_GENRES_DISPLAYABLE[genre])
  .join(', ')}</li>
			<li class="text-center">${GAME_METADATA_DISPLAYABLE.lang}: ${
  GAME_LANGS_DISPLAYABLE[metadata.lang]
}</li>
			<li class="text-center">${GAME_METADATA_DISPLAYABLE.size}: ${
  metadata.size >= 1
    ? `${metadata.size}${ITEM_SIZES.gb}`
    : `${metadata.size * 1000}${ITEM_SIZES.mb}`
}</li>
		</ul>
		<p class="text-md padding-sm margin-sm rounded-sm bg-blue w-max">
			<strong>${price} - CUP</strong>
		</p>
		<button class="red-button remove-from-cart-btn hidden">
			<svg
				class="w-6 h-6 text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
				/>
			</svg>
		</button>
		<button class="blue-button add-to-cart-btn">
			<svg
				class="w-6 h-6 text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
				/>
			</svg>
		</button>
	</section>
`

export const minMovieRender = ({ name, image }) => `
	<figure class="min-card-landing" aria-details="This is the movie ${name}" aria-label="${name}">
		<img
			src="${image}"
			alt="${name}"
			width="192"
			height="261"
			loading="lazy"
			aria-details="This is the movie ${name}"
			aria-label="${name}"
			title="${name}"
		/>
		<figcaption>
			<p class="text-center">${name}</p>
		</figcaption>
	</figure>
`

export const mediumMovieRender = ({ id, name, image, price }) => `
	<figure class="min-card" data-movie-id="${id}" aria-details="This is the movie ${name}" aria-label="${name}">
		<img
			src="${image}"
			alt="${name}"
			width="192"
			height="261"
			loading="lazy"
			aria-details="This is the movie ${name}"
			aria-label="${name}"
			title="${name}"
		/>
		<figcaption class="w-full">
			<p class="text-center">${name}</p>
			<p class="text-md padding-sm margin-sm rounded-sm bg-blue w-max">
				<strong>${price} - CUP</strong>
			</p>
			<div class="flex flex-wrap gap-sm justify-between w-full padding-sm">
				<button class="blue-button see-more-btn">
					Ver más
				</button>
				<button class="red-button remove-from-cart-btn hidden">
					<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
						height="24" fill="none" viewBox="0 0 24 24">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
					</svg>
				</button>
				<button class="blue-button add-to-cart-btn">
					<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
						height="24" fill="none" viewBox="0 0 24 24">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
					</svg>
				</button>
			</div>
		</figcaption>
	</figure>
`

export const completeMovieRender = ({
  id,
  name,
  image,
  description,
  metadata,
  price,
}) => `
	<section class="movie-info" data-movie-id="${id}" aria-details="This is the movie ${name}" aria-label="${name}">
		<button
			class="close-info-btn"
			aria-label="Close"
			aria-labelledby="Button"
			title="Close info view"
		>
			<svg
				class="w-6 h-6 text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
		<img
			src="${image}"
			alt="${name}"
			width="192"
			height="261"
			loading="lazy"
			aria-details="This is the movie ${name}"
			aria-label="${name}"
			title="${name}"
		/>
		<h2 class="text-center">${name}</h2>
		<p class="text-center text-balance">${description}</p>
		<ul class="no-list grid j-items-center">
			<li class="text-center">${MOVIE_METADATA_DISPLAYABLE.lang}: ${
  MOVIE_LANGS_DISPLAYABLE[metadata.lang]
}</li>
			<li class="text-center">${MOVIE_METADATA_DISPLAYABLE.genres}: ${metadata.genres
  .map((genre) => MOVIE_GENRES_DISPLAYABLE[genre])
  .join(', ')}</li>
			<li class="text-center">${MOVIE_METADATA_DISPLAYABLE.size}: ${
  metadata.size >= 1
    ? `${metadata.size}${ITEM_SIZES.gb}`
    : `${metadata.size * 1000}${ITEM_SIZES.mb}`
}</li>
		</ul>
		<p class="text-md padding-sm margin-sm rounded-sm bg-blue w-max">
			<strong>${price} - CUP</strong>
		</p>
		<button class="red-button remove-from-cart-btn hidden">
			<svg
				class="w-6 h-6 text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
				/>
			</svg>
		</button>
		<button class="blue-button add-to-cart-btn">
			<svg
				class="w-6 h-6 text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
				/>
			</svg>
		</button>
	</section>
`
