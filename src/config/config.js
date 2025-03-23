const config = {
  development: {
    apiUrl:process.env.VITE_API_URL,
  },
  production: {
    apiUrl: process.env.VITE_API_URL,
  },
}

const environment = process.env.NODE_ENV || 'development'

export default config[environment]