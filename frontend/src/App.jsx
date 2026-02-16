import { Routes, Route, Link } from 'react-router-dom'
import ArticleList from './components/ArticleList'
import ArticleDetail from './components/ArticleDetail'
import CreateArticle from './components/CreateArticle'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Блог</h1>
        <nav>
          <Link to="/">Статьи</Link>
          <Link to="/create">Добавить статью</Link>
        </nav>
      </header>
      <main className="App-main">
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/create" element={<CreateArticle />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
