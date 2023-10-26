module.exports = {
  'src/**/*.{jsx,tsx,ts,js}': allFiles => {
    const eslint =
      allFiles.length > 10 ? 'yarn lint' : `./node_modules/.bin/eslint ${allFiles.join(' ')}`
    const tsc = 'yarn tsc'
    return [eslint, tsc]
  }
}
