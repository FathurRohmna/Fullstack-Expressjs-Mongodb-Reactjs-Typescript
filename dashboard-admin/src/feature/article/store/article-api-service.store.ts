import http from '../../../commons/http-istance.common'

const PREFIX = 'http://localhost:8080/article'

export interface IArticles {
  title: string
  content: string
  description: string
  image: string
  paid: boolean
  categories: string[]
}

export interface IDeleteArticle {
  id: number
}

export const getArticlesApi = () => http.get(PREFIX)

export const postArticlesApi = (data: IArticles) => http.post(PREFIX, data).catch(function (error) {
  if (error) {
    return error
  }
})

export const deleteArticleApi = (id: string) => http.delete(`${PREFIX}/${id}`)

export const editArticleApi = (id: string, data: any) => http.patch(`${PREFIX}/${id}`, data).catch(function (error) {
  if (error) {
    return error
  }
})
