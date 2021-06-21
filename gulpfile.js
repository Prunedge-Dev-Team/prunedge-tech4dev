const {src, dest, series, watch} = require('gulp');
const fileinclude = require('gulp-file-include');

//Don't copy with images in normal mode because that's time wasting
const copyWithoutImages = () => src(['assets/**','!assets/images/**']).pipe(dest('build/assets'));

const copy = () => src(['assets/**']).pipe(dest('build/assets'));

const include = () => {
    return src(['**.html','**/*.html',"!build/**","!includes/**"])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@root',
            indent: true
        }))
        .pipe(dest('build'))
};

const watchFiles = () => watch(['**.html','**/*.html'],series(copyWithoutImages,include));

if(/production/i.test(process.env.NODE_ENV)){
    exports.default = series(copy,include);
}else{
    exports.default = series(
        copyWithoutImages,
        include
    );
}
