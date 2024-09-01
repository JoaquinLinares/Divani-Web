// next.config.js

module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://script.google.com/macros/s/AKfycby7h3bMHHN9pc8dYSGJUwHdw7K3Kw3BJ3A182XMCw_sZXejTprrG7q-0zNMA5H5LCT3/exec/:path*', // URL de destino (Google Apps Script)
        },
      ];
    },
    
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.alias['@'] = require('path').resolve(__dirname);
      }
      return config;
    },
  };
  