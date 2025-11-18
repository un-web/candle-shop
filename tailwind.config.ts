export default {
    // content: [
    //     './components/**/*.{js,vue,ts}',
    //     './layouts/**/*.vue',
    //     './pages/**/*.vue',
    //     './plugins/**/*.{js,ts}',
    //     './app.vue',
    // ],
    theme: {
        extend: {
            animation: {
                fadeIn: 'fadeIn 0.5s ease-in',
                slideUp: 'slideUp 0.6s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            },
            fontFamily: {
                serif: ['Cormorant Garamond', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            spacing: {
                'safe': 'clamp(1rem, 5vw, 2rem)',
            }

        }
    },
    plugins: []
}