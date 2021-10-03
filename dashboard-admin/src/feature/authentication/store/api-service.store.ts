import http from '../../../commons/http-istance.common'

const PREFIX = 'http://localhost:8080/authentication'

export interface ILogin { 
  email: string
  password: string
}

export interface IRegister {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const registerUser = (data: IRegister) => http.post(`${PREFIX}/register`, data).catch(function (error) {
  if (error) {
    return error
  }
})

export const loginUser = (data: ILogin) => http.post(`${PREFIX}/login`, data).catch(function (error) {
  if (error) {
    return error
  }
})
