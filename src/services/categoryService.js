import api from '../utils/api';

export const categoryService = {
  // Ambil semua kategori
  getAll: async () => {
    try {
      const response = await api.get('/api/kategori');
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan kategori default.");
      return [
        { id: 1, nama: 'Gasoline' },
        { id: 2, nama: 'Diesel' },
        { id: 3, nama: 'Transmission' },
        { id: 4, nama: 'Hybrid' }
      ];
    }
  },

  // Tambah kategori baru
  create: async (categoryData) => {
    try {
      const response = await api.post('/api/kategori', categoryData);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline.");
      return { success: true, data: categoryData };
    }
  },

  // Update data kategori
  update: async (id, categoryData) => {
    try {
      const response = await api.put(`/api/kategori/${id}`, categoryData);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline.");
      return { success: true };
    }
  },

  // Hapus kategori
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/kategori/${id}`);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline.");
      return { success: true };
    }
  }
};
