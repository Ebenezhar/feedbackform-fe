// API Configuration
export const API_CONFIG = {
  // Base URL for all API requests
  BASE_URL:  'http://127.0.0.1:8000',
  
  
  // Default request configuration
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  METHODS: {
    POST: 'POST',
    GET:'GET'
  },
  // Request timeout in milliseconds
  TIMEOUT: 10000,
} as const;