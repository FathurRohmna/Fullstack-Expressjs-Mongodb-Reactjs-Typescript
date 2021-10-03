export const users = (state: any) => {
  const users = state.users.items.users

  if (users) 
    return users.map(user => user)
  else 
    return users
}

export const usersData = (state: any) => {
  const users = state.users.usersData.userData

  if (users) 
    return users.map(user => user)
  else 
    return users
}

export const userLength = (state: any) => state.users.usersData.userLength
export const isUsersLoaded = (state: any) => state.users.isLoaded
export const isUsersError = (state: any) => state.users.error