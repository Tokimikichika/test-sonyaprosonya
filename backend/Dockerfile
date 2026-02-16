FROM php:8.2-fpm

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Установка расширений PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Установка Node.js и NPM
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Настройка рабочей директории
WORKDIR /var/www

# Копирование composer файлов
COPY composer.json composer.lock ./

RUN composer install --no-scripts --no-autoloader --no-dev

# Копирование остального кода
COPY . .

# Генерация автозагрузчика
RUN composer dump-autoload --optimize

# Установка прав на директорию storage и cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Настройка PHP
RUN echo "memory_limit=256M" > /usr/local/etc/php/conf.d/memory.ini

CMD ["php-fpm"]
