var gulp      = require('gulp'), // Подключаем Gulp
    sass        = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'); // Подключаем Browser Sync

//---------------------------------
gulp.task('mytask', function () {
    return gulp.src('source-files') // Выборка исходных файлов для обработки плагином
        .pipe(plugin()) // Вызов Gulp плагина для обработки файла
        .pipe(gulp.dest('folder')) // Вывод результирующего файла в папку назначения (dest - пункт назначения)
})
//----------------------------------


gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/sass/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});


gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});


gulp.task('scripts', function() {
    return gulp.src(['app/js/common.js', 'app/libs/**/*.js'])
        .pipe(browserSync.reload({ stream: true }))
});


gulp.task('code', function() {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});


gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.scss', gulp.parallel('sass')); // Наблюдение за sass файлами
    gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
    gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
});
gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));