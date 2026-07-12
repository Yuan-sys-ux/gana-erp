import api from '../utils/api';
import * as mockDb from '../utils/mockDb';

export const visitService = {
  // Ambil semua kunjungan
  getAll: async () => {
    try {
      const response = await api.get('/api/kunjungan');
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      return mockDb.getVisits();
    }
  },

  // Tambah kunjungan baru
  create: async (visitData) => {
    try {
      const response = await api.post('/api/kunjungan', visitData);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      const newVisit = mockDb.addVisit(visitData);
      return { success: true, data: newVisit };
    }
  },

  // Update data kunjungan
  update: async (id, visitData) => {
    try {
      const response = await api.put(`/api/kunjungan/${id}`, visitData);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      const visits = mockDb.getVisits();
      const idx = visits.findIndex(v => v.id === id);
      if (idx !== -1) {
        visits[idx] = { ...visits[idx], ...visitData };
        mockDb.saveVisits(visits);
      }
      return { success: true };
    }
  },

  // Hapus kunjungan
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/kunjungan/${id}`);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      const visits = mockDb.getVisits();
      const filtered = visits.filter(v => v.id !== id);
      mockDb.saveVisits(filtered);
      return { success: true };
    }
  }
};
