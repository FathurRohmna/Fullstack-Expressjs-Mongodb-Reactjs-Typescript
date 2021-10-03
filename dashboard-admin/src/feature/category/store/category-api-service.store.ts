import http from '../../../commons/http-istance.common'

const PREFIX = 'http://localhost:8080/category'

export interface ICategory {
  name: string
}

export const getCategoriesApi = () => http.get(PREFIX)

export const postCategoriesApi = async (data: ICategory) => await http.post(PREFIX, data).catch(function (error) {
  if (error) {
    return error
  }
})

export const deleteCategoryApi = async (id: string) => await http.delete(`${PREFIX}/${id}`)
