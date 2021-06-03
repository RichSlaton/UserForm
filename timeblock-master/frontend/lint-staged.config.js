module.exports = {
  '**/*.{js,ts,tsx,md,css,sass,less,yaml,scss}': ['eslint --fix', 'prettier --write'],
};

// currently not including yml json as it was giving unexpected errors
