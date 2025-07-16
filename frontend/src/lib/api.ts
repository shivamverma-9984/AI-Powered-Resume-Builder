const API_BASE_URL = import.meta.env.VITE_API_URL || "https://ai-powered-resume-builder-e7t8.onrender.com/api";

// Auth token management
const getAuthToken = () => localStorage.getItem('authToken');
const setAuthToken = (token: string) => localStorage.setItem('authToken', token);
const removeAuthToken = () => localStorage.removeItem('authToken');

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  register: async (userData: { fullName: string; email: string; password: string }) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  logout: () => {
    removeAuthToken();
  },

  getCurrentUser: () => apiRequest('/auth/me'),

  updateProfile: (profileData: any) => apiRequest('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  }),

  changePassword: (passwordData: { currentPassword: string; newPassword: string }) => 
    apiRequest('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    }),
};

// Resume API
export const resumeAPI = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) => {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return apiRequest(`/resumes${queryString}`);
  },

  getById: (id: string) => apiRequest(`/resumes/${id}`),

  create: (resumeData: any) => apiRequest('/resumes', {
    method: 'POST',
    body: JSON.stringify(resumeData),
  }),

  update: (id: string, resumeData: any) => apiRequest(`/resumes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(resumeData),
  }),

  delete: (id: string) => apiRequest(`/resumes/${id}`, {
    method: 'DELETE',
  }),

  generateShareLink: (id: string) => apiRequest(`/resumes/${id}/share`, {
    method: 'POST',
  }),

  getSharedResume: (token: string) => apiRequest(`/resumes/share/${token}`),

  trackDownload: (id: string) => apiRequest(`/resumes/${id}/download`, {
    method: 'POST',
  }),
};

// AI API
export const aiAPI = {
  enhanceResume: (data: { resumeId: string; jobDescription?: string; targetRole?: string }) =>
    apiRequest('/ai/enhance', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  optimizeForATS: (data: { resumeId: string; jobDescription: string }) =>
    apiRequest('/ai/optimize-ats', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getKeywordSuggestions: (data: { jobDescription: string; resumeId?: string }) =>
    apiRequest('/ai/keywords', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getStats: () => apiRequest('/ai/stats'),
};

// User API
export const userAPI = {
  getDashboardStats: () => apiRequest('/users/dashboard-stats'),

  updateSubscription: (subscription: string) => apiRequest('/users/subscription', {
    method: 'PUT',
    body: JSON.stringify({ subscription }),
  }),

  getActivity: (params?: { page?: number; limit?: number }) => {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return apiRequest(`/users/activity${queryString}`);
  },
};

// Template API (you can add this to your backend later)
export const templateAPI = {
  getAll: () => {
    // For now, return mock data - you can implement this endpoint later
    return Promise.resolve({
      templates: [
        {
          id: 'modern',
          name: 'Modern Professional',
          description: 'Clean and contemporary design perfect for tech roles',
          category: 'professional',
          preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=300',
          isPremium: false,
          features: ['ATS Optimized', 'Clean Layout', 'Professional'],
          rating: 4.8,
          downloads: 15420,
        },
        // Add more templates as needed
      ]
    });
  },
};

export { getAuthToken, setAuthToken, removeAuthToken };
