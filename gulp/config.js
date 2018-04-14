var util = require('gulp-util');

module.exports = {
    production: !!util.env.production
};