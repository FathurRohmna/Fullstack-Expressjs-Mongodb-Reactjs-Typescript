import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

export function checkAdminAuth() {
  const token = Cookies.get('Authorization')

  if (!token) return false

  try {
    let { permissionFlags, userId }: any = jwt_decode(token)

    if (permissionFlags !== 5) {
      return false
    }

    return userId

  } catch (error) {
    return false
  }
}

export function getUserData() {
  const token = Cookies.get('Authorization')

  let { userId } = jwt_decode(token)

  return userId
}
