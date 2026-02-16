import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { articleAPI } from '../services/api'
import './ArticleDetail.css'

function ArticleDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [commentForm, setCommentForm] = useState({
    author_name: '',
    content: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchArticle()
  }, [id])

  const fetchArticle = async () => {
    try {
      setLoading(true)
      const response = await articleAPI.getById(id)
      if (response.success) {
        setArticle(response.data)
      } else {
        setError('Статья не найдена')
      }
    } catch (err) {
      setError('Ошибка при загрузке статьи')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!commentForm.author_name.trim() || !commentForm.content.trim()) {
      return
    }

    try {
      setSubmitting(true)
      const response = await articleAPI.addComment(id, commentForm)
      if (response.success) {
        setCommentForm({ author_name: '', content: '' })
        fetchArticle()
      }
    } catch (err) {
      setError('Ошибка при добавлении комментария')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCommentForm((prev) => ({ ...prev, [name]: value }))
  }

  if (loading) {
    return <div className="loading">Загрузка...</div>
  }

  if (error) {
    return (
      <div className="error">
        {error}
        <Link to="/" className="back-link">← Вернуться к списку</Link>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="error">
        Статья не найдена
        <Link to="/" className="back-link">← Вернуться к списку</Link>
      </div>
    )
  }

  return (
    <div className="article-detail">
      <Link to="/" className="back-link">← Вернуться к списку</Link>
      
      <article className="article-content">
        <h1>{article.title}</h1>
        <p className="article-date">
          {new Date(article.created_at).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className="article-body">{article.content}</div>
      </article>

      <section className="comments-section">
        <h2>Комментарии ({article.comments.length})</h2>
        
        {article.comments.length === 0 ? (
          <p className="no-comments">Комментариев пока нет</p>
        ) : (
          <div className="comments-list">
            {article.comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <div className="comment-header">
                  <span className="comment-author">{comment.author_name}</span>
                  <span className="comment-date">
                    {new Date(comment.created_at).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))}
          </div>
        )}

        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <h3>Добавить комментарий</h3>
          <div className="form-group">
            <label htmlFor="author_name">Ваше имя:</label>
            <input
              type="text"
              id="author_name"
              name="author_name"
              value={commentForm.author_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Комментарий:</label>
            <textarea
              id="content"
              name="content"
              value={commentForm.content}
              onChange={handleInputChange}
              required
              rows={4}
            />
          </div>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Отправка...' : 'Отправить'}
          </button>
        </form>
      </section>
    </div>
  )
}

export default ArticleDetail
