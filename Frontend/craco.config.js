// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
   webpack: {
      alias: {
         '@components': path.resolve(__dirname, 'src', 'components'),
         '@pages': path.resolve(__dirname, 'src', 'pages'),
         '@assert': path.resolve(__dirname, 'src', 'assert'),
         '@constants': path.resolve(__dirname, 'src', 'constants'),
         '@services': path.resolve(__dirname, 'src', 'services'),
         '@store': path.resolve(__dirname, 'src', 'store'),
         '@utils': path.resolve(__dirname, 'src', 'utils'),
      },
   },
};
