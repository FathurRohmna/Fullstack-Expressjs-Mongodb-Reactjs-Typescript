interface ICategoryData {
  name: string
}

export interface ICategories {
  isLoading: boolean
  isLoaded: boolean
  items: ICategoryData[]
  error: string | null
}
