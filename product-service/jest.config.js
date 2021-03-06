const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } =  require('./tsconfig.paths.json');

module.exports = {
    preset: 'ts-jest',
    verbose: true,
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths , { prefix: '<rootDir>/' }),
}
