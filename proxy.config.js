const proxy = [
    {
      context: '/',
      target: 'http://seuprofissional.local',
      pathRewrite: {'^/' : ''}
    }
  ];
  module.exports = proxy;