import http from '../../../commons/http-istance.common'

const PREFIX = 'http://localhost:8080/users'

export const getUsersApi = () => http.get(PREFIX)

export const getUsersDataApi = () => http.get(`${PREFIX}/length`)

export const getUserByIdApi = (id: string) => http.get(`${PREFIX}/${id}`)

export const deleteUserApi = (id: string) => http.delete(`${PREFIX}/${id}`)

export const editUserApi = (id: string, data: any) => http.patch(`${PREFIX}/${id}`, data).catch(function (error) {
  if (error) {
    return error
  }
})

