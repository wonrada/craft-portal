#!/bin/bash
set -e

echo "==> Waiting for MySQL to be ready..."
until mysqladmin ping -h "${DB_HOST:-db}" -u "${DB_USERNAME:-root}" -p"${DB_PASSWORD:-secret}" --silent 2>/dev/null; do
    echo "    MySQL not ready yet, retrying in 2s..."
    sleep 2
done
echo "==> MySQL is ready."

echo "==> Running migrations..."
php artisan migrate --force

echo "==> Clearing config cache..."
php artisan config:clear

echo "==> Setting storage permissions..."
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

echo "==> Starting PHP-FPM..."
exec "$@"
