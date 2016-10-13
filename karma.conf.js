'use strict';

module.exports = (config) => {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        files: ['tests/**/*.spec.js'],
    });
}