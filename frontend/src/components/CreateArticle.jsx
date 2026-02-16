import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { articleAPI } from '../services/api'
import './CreateArticle.css'

function CreateArticle() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim()) {
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      const response = await articleAPI.create(formData)
      if (response.success) {
        navigate(`/article/${response.data.id}`)
      } else {
        setError('Не удалось создать статью')
      }
    } catch (err) {
      setError('Ошибка при создании статьи')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="create-article">
      <Link to="/" className="back-link">← Вернуться к списку</Link>
      
      <div className="create-article-container">
        <h1>Создать новую статью</h1>
        
        {error && <div className="error">{error}</div>}
        
        <form className="article-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Заголовок:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Введите заголовок статьи"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content">Содержание:</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={15}
              placeholder="Введите содержание статьи"
            />
          </div>
          
          <button type="submit" disabled={submitting}>
            {submitting ? 'Создание...' : 'Создать статью'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateArticle
