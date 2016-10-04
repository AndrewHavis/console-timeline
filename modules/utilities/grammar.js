'use strict';

// A simple script to ensure the grammar is correct in our console.log messages. :-)

module.exports.getThirdPerson = (n) => {
    if (n === 1) {
        return 'is';
    }
    else {
        return 'are';
    }
};

module.exports.getPlural = (n) => {
    if (n === 1) {
        return '';
    }
    else {
        return 's';
    }
};