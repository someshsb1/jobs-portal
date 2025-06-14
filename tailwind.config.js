/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif']
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('daisyui')
    ],
};
// daisyUI config (optional)
module.exports.daisyui = {
    themes: [
        {
            mytheme: {
                primary: '#4f46e5',
                secondary: '#fbbf24',
                accent: '#10b981',
                neutral: '#1f2937',
                'base-100': '#ffffff',
                info: '#3b82f6',
                success: '#10b981',
                warning: '#f59e0b',
                error: '#ef4444'
            }
        },
        'dark'
    ]
};
