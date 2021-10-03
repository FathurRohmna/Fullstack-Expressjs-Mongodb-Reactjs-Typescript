
export const isCategoryLoading = (state: any) => state.categories.isLoading
export const isCategoryLoaded = (state: any) => state.categories.isLoaded
export const categories = (state: any) => {
  const categories = state.categories.items.categories

  if (categories)
    return categories.map(category => category)
  else 
    return categories
}

export const categoryError = (state: any) => state.categories.error