import api from './api'; //the axios instance set up

export const expertAPI = {
  // Get all experts
  getAllExperts: () => api.get('/support'),

  // Get single expert by ID
  getExpertById: (id) => api.get(`/experts/${id}`),

  // Create new expert (if needed)
  createExpert: (expertData) => api.post('/experts', expertData),

  // Update expert (if needed)
  updateExpert: (id, expertData) => api.put(`/experts/${id}`, expertData),

  // Delete expert (if needed)
  deleteExpert: (id) => api.delete(`/experts/${id}`),
};
