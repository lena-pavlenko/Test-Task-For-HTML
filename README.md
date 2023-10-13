# Test Task For HTML

## Описание
Верстка страницы по макету AdobeXD

### Структура проекта
В папке src/scss содержатся файлы стилей:
- animation - css-анимации
- layout - общая компоновка элементов
- forms - элементы формы
- blocks - блоки, которые могут быть переиспользованы
- fonts - шрифты
- vars - переменные и миксины
- style - основной файл для подключения модулей
- modal - модальное окно
- остальные файлы для отдельных частей документа: секции, header и footer

В папке src/img/icons содержатся файлы svg для преобразования в спрайт

### Стек
- html
- js
- SCSS
- gulp

Все анимации и взаимодействия с DOM-элементами написаны на javascript (+css) без дополнительных библиотек и плагинов

## Функционал сборки
- компиляция препроцессора SCSS
- минификация CSS
- автоматическое добавление префиксов CSS
- преобразования кода ECMAScript 2015 + в обратно совместимую версию JavaScript с помощью Babel
- объединение нескольких файлов JavaScript в один
- сжатие изображений
- создание svg-sprite
- отслеживание изменений в файлах и автоматический запуск повторной обработки
- генерация sourcemaps
- локальный сервер с автоматическим обновлением страницы при изменении файлов

## Запуск:  
Установите глобально пакет gulp-cli

``
npm i gulp-cli
``
1. Скачать все файлы проекта  
2. В терминале перейти в каталог проекта  
3. Выполнить команду: npm i  
4. Выполнить команду: gulp (запуск таска default)

## Используемые NPM пакеты
[gulp](https://www.npmjs.com/package/gulp) Сборщик Gulp   
[sass](https://www.npmjs.com/package/sass) Компилятор Sass  
[gulp-sass](https://www.npmjs.com/package/gulp-sass) Компиляция Sass и Scss файлов   
[gulp-babel](https://www.npmjs.com/package/gulp-babel) Преобразует Java Script в старый стандарт  
[@babel/core](https://www.npmjs.com/package/@babel/core) Ядро Babel  
[@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) Пресет для компиляции Babel  
[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) Минификация и оптимизация CSS файлов   
[del](https://www.npmjs.com/package/del) Удаление каталогов и файлов  
[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) Карта строк кода для инструментов  разработчика   
[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) Автоматическое добавление префиксов в CSS   
[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) Сжатие изображений    
[browser-sync](https://browsersync.io/docs/gulp) Автоматическое обновление сайта при изменении файлов  
[gulp-svg-sprite](https://www.npmjs.com/package/gulp-svg-sprite) Создание спрайта с svg
