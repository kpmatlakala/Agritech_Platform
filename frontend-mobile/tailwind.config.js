/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    // If you have more directories, add them here
  ],
  presets: [require("nativewind/preset")], // Required for NativeWind
  theme: {
    extend: {
      // 🔄 Optionally map your existing theme colors to Tailwind
      colors: {
        primary: '#4fc3f7',
        background: '#1a1a2e',
        surface: '#2a2a4a',
        text: '#ffffff',
        muted: '#a0a0b0',
        border: '#3a3a5a',
        // ... add all your theme.colors here if you want to use them as classes
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '20px',
      },
      screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    },
  },
  plugins: [],
};

