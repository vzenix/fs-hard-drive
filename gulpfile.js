const gulp = require('gulp');
const path = require('path');
const wdioCli = require('@wdio/cli');
let wdio = new wdioCli.default(path.join(__dirname, 'wdio.conf.js'), {});

gulp.task('e2e:start', e2eStart);
gulp.task('e2e:end', e2eEnd);
gulp.task('e2e:test', gulp.series(['e2e:start', 'e2e:end']));

// Full task
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