var gulp = require('gulp'),
    connect = require('gulp-connect'),
    historyApiFallback = require('connect-history-api-fallback'),
    wiredep = require('wiredep').stream;




//Servidor web de desarrollo
gulp.task('server', function() {
    connect.server({
        root: './',
        hostname: '0.0.0.0',
        port: 8000,
        livereload: true,
        middelware: function(connect, opt) {
            return [historyApiFallback];
        }
    });
});

//Inyecta las librerías que instalamos vía bower
gulp.task('wiredep', function() {
    gulp.src('./index.html')
        .pipe(wiredep({
            directory: './bower_components'
        }))
        .pipe(gulp.dest('./'));
});

//Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
    gulp.src(['./**/*.html'])
        .pipe(connect.reload());
});

gulp.task('watch',function(){
	gulp.watch(['./**/*.html'],['html']);
});

gulp.task('default', ['server', 'wiredep','watch']);
