export const selectorToken = (state) => state.auth.token
export const selectorLoading = (state) => state.auth.loading
export const selectorError = (state) => state.auth.error

export const selectorItems = (state) => state.videos.items
export const selectorItemsLoading = (state) => state.videos.loading
export const selectorItemsError = (state) => state.videos.error

export const selectorFavorites = (state) => state.favorites.favorite
