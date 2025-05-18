// API configuration
export const API_CONFIG = {
  // Base URL for all API requests
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://13.200.161.40:5000',
  
  // API endpoints (optional, but good for autocompletion and refactoring)
  ENDPOINTS: {
    ARTICLES: '/api/articles',
    AUTH: '/api/auth',
    CONTACT: '/api/contact',
    ADS: '/api/ads',
    SOCIAL_MEDIA: '/api/social-media',
    STORIES: '/api/stories'
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  return `${API_CONFIG.BASE_URL}/${normalizedEndpoint}`;
};
