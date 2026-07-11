const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('clinic_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  } catch (error) {
    console.error(`[API Request Error] ${endpoint}:`, error);
    throw error;
  }
};

type ApiPayload = Record<string, unknown>;

export const api = {
  // Authentication
  register: (payload: ApiPayload) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload: ApiPayload) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  loginAdmin: (payload: ApiPayload) => apiRequest('/auth/admin/login', { method: 'POST', body: JSON.stringify(payload) }),
  getProfile: () => apiRequest('/auth/profile'),

  // Appointments
  createAppointment: (payload: ApiPayload) => apiRequest('/appointments', { method: 'POST', body: JSON.stringify(payload) }),
  getAppointments: () => apiRequest('/appointments'),
  updateAppointment: (id: string, payload: ApiPayload) => apiRequest(`/appointments/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),

  // Doctors & Services
  getDoctors: () => apiRequest('/doctors'),
  createDoctor: (payload: ApiPayload) => apiRequest('/doctors', { method: 'POST', body: JSON.stringify(payload) }),
  deleteDoctor: (id: string) => apiRequest(`/doctors/${id}`, { method: 'DELETE' }),

  getServices: () => apiRequest('/services'),
  createService: (payload: ApiPayload) => apiRequest('/services', { method: 'POST', body: JSON.stringify(payload) }),
  deleteService: (id: string) => apiRequest(`/services/${id}`, { method: 'DELETE' }),

  // Testimonials
  getTestimonials: () => apiRequest('/testimonials'),
  getAdminTestimonials: () => apiRequest('/admin/testimonials'),
  createTestimonial: (payload: ApiPayload) => apiRequest('/testimonials', { method: 'POST', body: JSON.stringify(payload) }),
  approveTestimonial: (id: string) => apiRequest(`/testimonials/${id}/approve`, { method: 'PATCH' }),
  deleteTestimonial: (id: string) => apiRequest(`/testimonials/${id}`, { method: 'DELETE' }),

  // Smile Gallery
  getGallery: () => apiRequest('/gallery'),
  createGalleryItem: (payload: ApiPayload) => apiRequest('/gallery', { method: 'POST', body: JSON.stringify(payload) }),
  deleteGalleryItem: (id: string) => apiRequest(`/gallery/${id}`, { method: 'DELETE' }),

  // Blogs
  getBlogs: () => apiRequest('/blogs'),
  getBlogBySlug: (slug: string) => apiRequest(`/blogs/${slug}`),
  createBlog: (payload: ApiPayload) => apiRequest('/blogs', { method: 'POST', body: JSON.stringify(payload) }),
  deleteBlog: (id: string) => apiRequest(`/blogs/${id}`, { method: 'DELETE' }),

  // Contact Messages
  submitContact: (payload: ApiPayload) => apiRequest('/contact', { method: 'POST', body: JSON.stringify(payload) }),
  getContactMessages: () => apiRequest('/contact'),
  updateContactStatus: (id: string, payload: ApiPayload) => apiRequest(`/contact/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),

  // AI Diagnostic
  checkSymptoms: (symptoms: string) => apiRequest('/ai/check-symptoms', { method: 'POST', body: JSON.stringify({ symptoms }) }),

  // Admin Analytics
  getAnalytics: () => apiRequest('/admin/analytics'),
};
export default api;
