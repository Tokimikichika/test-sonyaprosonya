import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { articleAPI } from '../services/api'
import './ArticleList.css'

function ArticleList() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const response = await articleAPI.getAll()
      if (response.success) {
        setArticles(response.data)
      } else {
        setError('Не удалось загрузить статьи')
      }
    } catch (err) {
      setError('Ошибка при загрузке статей')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Загрузка...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="article-list">
      <h2>Статьи</h2>
      {articles.length === 0 ? (
        <p className="no-articles">Статей пока нет</p>
      ) : (
        <div className="articles-grid">
          {articles.map((article) => (
            <article key={article.id} className="article-card">
              <Link to={`/article/${article.id}`}>
                <h3>{article.title}</h3>
                <p className="article-date">
                  {new Date(article.created_at).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="article-excerpt">{article.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default ArticleList
