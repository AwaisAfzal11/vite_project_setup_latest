# 1. Install Runtime Dependencies
npm install react-router-dom react-helmet-async aos

# 2. Initialize Tailwind
npx tailwindcss init -p

# 3. Remove Tailwind v4 and install v3
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss@^3.4.0 postcss autoprefixer

# 4. Now initialize
npx tailwindcss init -p