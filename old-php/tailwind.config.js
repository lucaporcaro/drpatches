import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                montserrat: ['Montserrat', 'sans-serif']
            },
            colors: {
                primary: {
                    '1': '#F3CC10'
                }
            },
            keyframes: {
              navbar: {
                  from: {
                      left: '-160px'
                  },
                  to: {
                      left: '0px'
                  }
              }
            },
            animation: {
                'show-navbar': 'navbar .3s ease forwards'
            }
        },
    },

    plugins: [forms],
};