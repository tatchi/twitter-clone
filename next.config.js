module.exports = {
  reactStrictMode: true,
  reactMode: 'concurrent',
  target: 'serverless',
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },
};
