// API Configuration
// This file centralizes all API endpoint configurations
import.meta.env.VITE_API_URL

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
};

export default API_BASE_URL;
