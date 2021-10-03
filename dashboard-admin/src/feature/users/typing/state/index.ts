export interface IUserData {
  username: string
  email: string
  permisionFlags: number
  createdAt: Date
}

export interface IUsers {
  isLoading: boolean
  isLoaded: boolean
  items: IUserData
  error: string | null
}
