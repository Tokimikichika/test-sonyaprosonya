# Блог с комментариями

Простой блог с комментариями, разработанный для тестового задания b2b.polis.online.

## Технологии

### Backend
- **Laravel 10** - PHP фреймворк
- **MySQL 8.0** - СУБД
- **PHP 8.2** - Язык программирования

### Frontend
- **React 18** - JavaScript библиотека для UI
- **React Router 6** - Маршрутизация
- **Axios** - HTTP клиент
- **Vite** - Сборщик

### Инфраструктура
- **Docker** - Контейнеризация
- **Docker Compose** - Оркестрация контейнеров
- **Nginx** - Веб-сервер

## Функционал

### Backend API
- `GET /api/articles` - Получить список всех статей
- `GET /api/articles/{id}` - Получить статью с комментариями
- `POST /api/articles` - Создать новую статью
- `POST /api/articles/{id}/comments` - Добавить комментарий к статье

### Frontend
- Страница со списком статей (заголовок, дата, краткое содержание)
- Страница статьи с комментариями и формой добавления нового комментария
- Форма добавления новой статьи (простая, без WYSIWYG)

## Установка и запуск

### Требования
- Docker
- Docker Compose

### Шаги запуска

1. **Клонирование репозитория**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Запуск контейнеров**
   ```bash
   docker-compose up -d
   ```

3. **Установка зависимостей и настройка Laravel**
   
   Войдите в контейнер приложения:
   ```bash
   docker-compose exec app bash
   ```
   
   Установите зависимости:
   ```bash
   composer install
   ```
   
   Сгенерируйте ключ приложения:
   ```bash
   php artisan key:generate
   ```
   
   Выполните миграции:
   ```bash
   php artisan migrate
   ```
   
   Заполните базу данных тестовыми данными:
   ```bash
   php artisan db:seed
   ```
   
   Выйдите из контейнера:
   ```bash
   exit
   ```

4. **Установка зависимостей Frontend**
   
   Войдите в контейнер frontend:
   ```bash
   docker-compose exec frontend sh
   ```
   
   Установите зависимости:
   ```bash
   npm install
   ```
   
   Выйдите из контейнера:
   ```bash
   exit
   ```

5. **Перезапуск контейнеров**
   ```bash
   docker-compose restart
   ```

## Доступ к приложению

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **API Documentation**: http://localhost:8080

## API Эндпоинты

### Статьи

#### Получить все статьи
```http
GET /api/articles
```

**Ответ:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Заголовок статьи",
      "excerpt": "Краткое содержание...",
      "created_at": "2024-01-01 12:00:00"
    }
  ]
}
```

#### Получить статью с комментариями
```http
GET /api/articles/{id}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Заголовок статьи",
    "content": "Полное содержание статьи...",
    "created_at": "2024-01-01 12:00:00",
    "comments": [
      {
        "id": 1,
        "author_name": "Иван",
        "content": "Текст комментария",
        "created_at": "2024-01-01 13:00:00"
      }
    ]
  }
}
```

#### Создать статью
```http
POST /api/articles
Content-Type: application/json

{
  "title": "Заголовок статьи",
  "content": "Содержание статьи"
}
```

**Ответ:**
```json
{
  "success": true,
  "message": "Article created successfully",
  "data": {
    "id": 1,
    "title": "Заголовок статьи",
    "content": "Содержание статьи",
    "created_at": "2024-01-01 12:00:00"
  }
}
```

### Комментарии

#### Добавить комментарий к статье
```http
POST /api/articles/{id}/comments
Content-Type: application/json

{
  "author_name": "Иван",
  "content": "Текст комментария"
}
```

**Ответ:**
```json
{
  "success": true,
  "message": "Comment added successfully",
  "data": {
    "id": 1,
    "author_name": "Иван",
    "content": "Текст комментария",
    "created_at": "2024-01-01 13:00:00"
  }
}
```

## Полезные команды

### Docker
```bash
docker-compose up -d

docker-compose down

docker-compose logs -f

docker-compose restart
```

### Backend (Laravel)
```bash
docker-compose exec app bash

php artisan migrate

php artisan migrate:rollback

php artisan db:seed

php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

### Frontend (React)
```bash
docker-compose exec frontend sh

npm install

npm run dev

npm run build
```

## Тестовые данные

После запуска сидера в базе данных будут созданы:
- 5 статей на различные темы (Laravel, React, Docker, REST API, современные подходы к разработке)
- 2 комментария к каждой статье

## Лицензия

MIT
