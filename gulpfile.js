const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const http = require('http');
const connect = require('connect');
const serveStatic = require('serve-static');
const path = require('path');
const wdioCli = require('@wdio/cli');
let wdio = new wdioCli.default(path.join(__dirname, 'wdio.conf.js'), {});

// gulp.task('http:start', fnStartHttp);
// gulp.task('http:stop', fnStopHttp);

gulp.task('e2e:start', e2eStart);
gulp.task('e2e:end', e2eEnd);
gulp.task('e2e:test', gulp.series(['e2e:start', 'e2e:end']));

// gulp.task('minimize:js', js);
// gulp.task('minimize:all', gulp.parallel('minimize:js'));

// Full task
// gulp.task('default', gulp.series(['http:start', 'e2e:start', 'minimize:all', 'http:stop', 'e2e:end']));
gulp.task('default', gulp.series(['e2e:start', 'e2e:end']));

//
// Test
//

function e2eStart(done) {
    let run = wdio.run();
    run.then((code) => done(), (error) => {
        console.error('Launcher failed to start the test', error.stacktrace);
        done();
        process.exit(1);
    });
}

function e2eEnd(done) {
    done();
    process.exit(0);
}

/*
//
// minimize functions
//

function js() {
    return gulp
        .src('src/*.js', {
            sourcemaps: true
        })
        .pipe(uglify())
        .pipe(concat('fs-hard-drive.min.js'))
        .pipe(gulp.dest('dist/js', {
            sourcemaps: true
        }));
}

//
// Fake http
//

var httpServer;

function fnStartHttp(done) {
    const app = connect().use(serveStatic('test/fixtures'));
    httpServer = http.createServer(app).listen(9000, done);
    done();
}

function fnStopHttp(done) {
    setTimeout(() => httpServer.close(), 500);
    done();
}
*/