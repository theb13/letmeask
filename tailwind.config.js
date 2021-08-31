module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                'pop': ["Poppins", "sans-serif"]
            },
            minHeight: {
                '1': '130px'
            }
        },
    },
    variants: {
        extend: {
            brightness: ['hover', 'focus'],
            cursor: ['disabled'],
            opacity: ['disabled']
        },
    },
    plugins: [],
}
