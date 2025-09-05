import api from './api';

export const userAPI = {
  getUserById: (userId) => api.get(`/users/${userId}`),
  getUsersByIds: (userIds) => api.post('/users/batch', { userIds }),
};
