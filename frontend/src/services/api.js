import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const articleAPI = {
  getAll: async () => {
    const response = await api.get('/articles')
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/articles/${id}`)
    return response.data
  },

  create: async (articleData) => {
    const response = await api.post('/articles', articleData)
    return response.data
  },

  addComment: async (articleId, commentData) => {
    const response = await api.post(`/articles/${articleId}/comments`, commentData)
    return response.data
  },
}

export default api
