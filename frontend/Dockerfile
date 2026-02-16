FROM node:18-alpine

WORKDIR /app

# Копирование package файлов
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование остального кода
COPY . .

# Сборка приложения
RUN npm run build

# Запуск приложения
CMD ["npm", "start"]
