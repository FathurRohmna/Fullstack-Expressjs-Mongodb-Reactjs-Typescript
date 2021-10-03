export interface IArticleData {
  title: string;
  content: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
  paid: boolean;
  categories: string[] | string;
}

export interface IArticles {
  isLoading: boolean
  isLoaded: boolean
  items: any
  error: string | null
}

export interface postIArticles {
  isLoading: boolean
  isLoaded: boolean
  items: IArticleData
  error: string | null
}

export interface deleteIArticle {
  isLoading: boolean
  isLoaded: boolean 
  error: string | null
}
