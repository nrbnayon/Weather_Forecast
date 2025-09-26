# 🌤️ Weather Forecast App

A modern, responsive weather application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Get real-time weather information with automatic location detection and beautiful, intuitive UI.

![Weather App](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.9.0-764ABC?style=for-the-badge&logo=redux)

## ✨ Features

### 🌍 **Smart Location Detection**
- **Automatic Location Detection**: Detects your location on first visit using geolocation API
- **Timezone Fallback**: Falls back to timezone-based city detection for 30+ major cities worldwide
- **Manual Search**: Search for any city worldwide with autocomplete suggestions

### 🌡️ **Comprehensive Weather Data**
- **Current Weather**: Real-time temperature, humidity, wind speed, and conditions
- **Hourly Forecast**: 24-hour detailed weather predictions
- **Daily Forecast**: 7-day weather outlook
- **Weather Details**: UV index, visibility, pressure, and more
- **Weather Alerts**: Severe weather warnings and notifications

### 🎨 **Modern UI/UX**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Beautiful Animations**: Smooth transitions and loading states
- **Weather Icons**: Custom weather condition icons
- **Error Handling**: Graceful error states with retry options

### ⚙️ **Customizable Settings**
- **Temperature Units**: Celsius, Fahrenheit, and Kelvin
- **Wind Speed Units**: m/s, km/h, and mph
- **Precipitation Units**: mm and inches
- **Search History**: Quick access to previously searched locations

## 🚀 Quick Start

### 🔧 Pre-Setup Requirements

Before you begin, ensure your system meets these requirements:

#### **System Requirements**
- **Operating System**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **Node.js**: Version 18.0 or higher ([Download here](https://nodejs.org/))
- **Package Manager**: npm (comes with Node.js) or yarn
- **Git**: For cloning the repository ([Download here](https://git-scm.com/))
- **Code Editor**: VS Code, WebStorm, or any preferred editor
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

#### **Check Your System**
Run these commands to verify your setup:

```bash
# Check Node.js version (should be 18.0+)
node --version

# Check npm version
npm --version

# Check Git installation
git --version
```

#### **Required Accounts & API Keys**
1. **OpenWeatherMap Account** (Free)
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key (takes 10-15 minutes to activate)
   - Free tier includes: 1,000 API calls/day, current weather, 5-day forecast

2. **GitHub Account** (Optional but recommended)
   - For version control and deployment
   - Sign up at [GitHub](https://github.com)

#### **Development Environment Setup**
1. **Install Node.js**
   - Download from [nodejs.org](https://nodejs.org/)
   - Choose LTS version (recommended)
   - Verify installation: `node --version`

2. **Install Git**
   - Download from [git-scm.com](https://git-scm.com/)
   - Configure Git (first time only):
     ```bash
     git config --global user.name "Your Name"
     git config --global user.email "your.email@example.com"
     ```

3. **Choose Package Manager**
   ```bash
   # Option 1: Use npm (comes with Node.js)
   npm --version
   
   # Option 2: Install yarn (optional)
   npm install -g yarn
   yarn --version
   ```

### Prerequisites

- **Node.js** 18.0 or higher ✅
- **npm** or **yarn** package manager ✅
- **OpenWeatherMap API Key** (free tier available) ✅
- **Git** for version control ✅

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nrbnayon/weather-forecast.git
   cd weather-forecast
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Or using yarn
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```bash
   # Copy the example file
   cp .env.example .env.local
   
   # Or create manually
   touch .env.local
   ```
   
   Add your OpenWeatherMap API configuration:
   ```env
   # OpenWeatherMap API Configuration
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   NEXT_PUBLIC_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
   NEXT_PUBLIC_OPENWEATHER_GEO_URL=https://api.openweathermap.org/geo/1.0
   ```

   **⚠️ Important Notes:**
   - Replace `your_api_key_here` with your actual OpenWeatherMap API key
   - Never commit your `.env.local` file to version control
   - API key activation takes 10-15 minutes after registration

4. **Get your OpenWeatherMap API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key
   - Replace `your_api_key_here` with your actual API key

5. **Verify Setup**
   ```bash
   # Check if all dependencies are installed
   npm list --depth=0
   
   # Verify environment variables (Windows)
   echo %NEXT_PUBLIC_OPENWEATHER_API_KEY%
   
   # Verify environment variables (macOS/Linux)
   echo $NEXT_PUBLIC_OPENWEATHER_API_KEY
   ```

6. **Start the development server**
   ```bash
   # Using npm
   npm run dev
   
   # Or using yarn
   yarn dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### 🎉 First Time Setup Complete!

If everything is working correctly, you should see:
- ✅ The weather app loads without errors
- ✅ Automatic location detection prompts for permission
- ✅ Weather data displays after location is detected or city is searched
- ✅ No console errors in browser developer tools

### 🔧 Troubleshooting Setup Issues

<details>
<summary>Common Setup Problems & Solutions</summary>

#### **Node.js Version Issues**
```bash
# Check current version
node --version

# If version is below 18.0, update Node.js
# Download latest LTS from https://nodejs.org/
```

#### **API Key Not Working**
- Verify API key is correct (no extra spaces)
- Wait 10-15 minutes after generating new key
- Check OpenWeatherMap account status
- Ensure `.env.local` file is in project root

#### **Port Already in Use**
```bash
# Kill process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Kill process using port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

#### **Dependencies Installation Failed**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall (Windows)
rmdir /s node_modules
del package-lock.json
npm install

# Delete node_modules and reinstall (macOS/Linux)
rm -rf node_modules package-lock.json
npm install
```

#### **Environment Variables Not Loading**
- Ensure file is named `.env.local` (not `.env.local.txt`)
- Restart development server after changes
- Check file is in project root directory
- Verify no syntax errors in .env file

#### **Geolocation Not Working**
- Ensure you're using HTTPS or localhost
- Check browser permissions for location access
- Try manual city search if auto-detection fails

</details>

## 📁 Project Structure

```
weather_forecast/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── error/            # Error handling components
│   ├── landing/          # Main app component
│   ├── layout/           # Layout components
│   ├── loading/          # Loading states
│   ├── search/           # Search functionality
│   ├── settings/         # Settings components
│   ├── ui/               # Reusable UI components
│   └── weather/          # Weather display components
├── hooks/                # Custom React hooks
│   ├── useAutoLocation.ts    # Automatic location detection
│   ├── useGeolocation.ts     # Geolocation API wrapper
│   ├── useWeatherData.ts     # Weather data management
│   └── ...
├── redux/                # State management
│   ├── api/              # RTK Query API
│   ├── features/         # Redux slices
│   └── store.ts          # Redux store configuration
├── services/             # API services
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── public/               # Static assets
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint

# Alternative with Yarn
yarn dev
yarn build
yarn start
yarn lint
```

## 🌐 API Integration

This app uses the **OpenWeatherMap API** for weather data:

- **Current Weather API**: Real-time weather conditions
- **5-Day Forecast API**: Hourly and daily forecasts
- **Geocoding API**: Location search and reverse geocoding

### API Endpoints Used:
- `https://api.openweathermap.org/data/2.5/weather` - Current weather
- `https://api.openweathermap.org/data/2.5/forecast` - 5-day forecast
- `https://api.openweathermap.org/geo/1.0/direct` - Forward geocoding
- `https://api.openweathermap.org/geo/1.0/reverse` - Reverse geocoding

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_OPENWEATHER_API_KEY` | OpenWeatherMap API key | ✅ Yes | - |
| `NEXT_PUBLIC_OPENWEATHER_BASE_URL` | Weather API base URL | ❌ No | `https://api.openweathermap.org/data/2.5` |
| `NEXT_PUBLIC_OPENWEATHER_GEO_URL` | Geocoding API base URL | ❌ No | `https://api.openweathermap.org/geo/1.0` |

### Supported Cities for Auto-Detection

The app automatically detects your location based on timezone for these major cities:

**Asia**: Dhaka, Kolkata, Karachi, Dubai, Tokyo, Shanghai, Singapore, Bangkok, Jakarta, Manila
**Europe**: London, Paris, Berlin, Rome, Madrid, Amsterdam, Stockholm, Moscow
**Americas**: New York, Los Angeles, Chicago, Toronto, Vancouver, Mexico City, São Paulo, Buenos Aires
**Oceania**: Sydney, Melbourne, Perth
**Africa**: Cairo, Lagos, Johannesburg

## 🎨 Customization

### Themes
The app supports both light and dark themes with automatic system preference detection.

### Units
- **Temperature**: Celsius (°C), Fahrenheit (°F), Kelvin (K)
- **Wind Speed**: m/s, km/h, mph
- **Precipitation**: mm, inches

### Styling
Built with **Tailwind CSS 4.1.9** and custom design tokens for consistent theming.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- **Netlify**
- **Railway**
- **Heroku**
- **AWS Amplify**
- **DigitalOcean App Platform**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** for providing the weather API
- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for beautiful icons
- **Radix UI** for accessible component primitives

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/yourusername/weather-forecast/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your setup and the issue

---

**Made with ❤️ and ☕ by Nayon**

*Stay informed about the weather, stay prepared for the day!* 🌤️