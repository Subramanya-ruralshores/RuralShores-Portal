// API Configuration
// This file centralizes all API endpoint configurations

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    USER: `${API_BASE_URL}/api/auth/user`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  },

  // Services endpoints
  SERVICES: {
    BASE: `${API_BASE_URL}/api/services`,
    BY_ID: (id) => `${API_BASE_URL}/api/services/${id}`,
  },

  // CMS endpoints
  CMS: {
    CAREERS: `${API_BASE_URL}/api/cms/careers`,
    ABOUT: `${API_BASE_URL}/api/cms/about`,
    CONTACT: `${API_BASE_URL}/api/cms/contact`,
  },

  // GenAI endpoints
  GENAI: {
    PROJECTS: `${API_BASE_URL}/api/genai/projects`,
    BY_ID: (id) => `${API_BASE_URL}/api/genai/projects/${id}`,
  },

  // User endpoints
  USER: {
    PROFILE: `${API_BASE_URL}/api/user/profile`,
    SUBMISSIONS: `${API_BASE_URL}/api/user/submissions`,
  },

  // Support endpoints
  SUPPORT: {
    SUBMIT: `${API_BASE_URL}/api/support-tickets`,
    LIST: `${API_BASE_URL}/api/support-tickets`,
    STATS: `${API_BASE_URL}/api/support-tickets/stats/overview`,
    UPDATE: (id) => `${API_BASE_URL}/api/support-tickets/${id}`,
    STATUS: (id) => `${API_BASE_URL}/api/support-tickets/${id}/status`,
  },

  // Notifications
  NOTIFICATIONS: {
    BASE: `${API_BASE_URL}/api/notifications`,
    UNREAD: `${API_BASE_URL}/api/notifications/unread/count`,
    READ: (id) => `${API_BASE_URL}/api/notifications/${id}/read`,
    READ_ALL: `${API_BASE_URL}/api/notifications/read-all`,
  },

  // Settings
  SETTINGS: {
    BASE: `${API_BASE_URL}/api/settings`,
    RESET: `${API_BASE_URL}/api/settings/reset`,
  },
};

export default API_BASE_URL;
