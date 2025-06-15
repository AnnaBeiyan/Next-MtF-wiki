const config = {
  plugins: [
    '@tailwindcss/postcss',
    '@csstools/postcss-cascade-layers',
    '@csstools/postcss-oklab-function',
    [
      'postcss-preset-env',
      {
        // Optionally add plugin options
      },
    ],
  ],
};

export default config;
