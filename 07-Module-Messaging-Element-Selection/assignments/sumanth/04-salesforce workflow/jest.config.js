// jest.config.js
const { defaults } = require('jest-config');
module.exports = {
    // ...
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    // ...
    moduleNameMapper: {
        '^.+\\.(css|less|scss)$': 'babel-jest',
    },
};
