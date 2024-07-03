/** @type {(tailwindConfig: object) => object} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
    darkMode:'media',
  content: [
      "./frontend/index.html",
      "./frontend/**/*.{tsx,jsx,js,ts}"
  ],
    theme: {
        extend: {
            colors:{
                'blue-palette':{
                    50: '#e9f8ff',
                    100: '#ceeeff',
                    200: '#a7e2ff',
                    300: '#6bd5ff',
                    400: '#26b9ff',
                    500: '#008fff',
                    600: '#0065ff',
                    700: '#004aff',
                    800: '#003ee6',
                    900: '#003bb3',
                    950: '#002f87',
                }
            },
        },
    },
  plugins: [],
});

