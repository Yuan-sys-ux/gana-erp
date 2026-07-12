import api from '../utils/api';
import * as mockDb from '../utils/mockDb';

export const orderService = {
  // Ambil semua penjualan
  getAll: async () => {
    try {
      const response = await api.get('/api/penjualan');
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      return mockDb.getOrders();
    }
  },

  // Tambah penjualan baru
  create: async (orderData) => {
    try {
      const response = await api.post('/api/penjualan', orderData);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      mockDb.addOrder({
        customer: orderData.nama_bengkel || orderData.customer,
        sales: sessionStorage.getItem('userFullName') || 'Sales Gana',
        total: orderData.total || 0,
        status: 'Draft',
        qty: orderData.qty || 0,
        address: orderData.address || '',
        paymentMethod: orderData.paymentMethod || 'tempo',
        items: orderData.items || []
      });
      return { success: true };
    }
  },

  // Update data penjualan
  update: async (id, orderData) => {
    try {
      const response = await api.put(`/api/penjualan/${id}`, orderData);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      const orders = mockDb.getOrders();
      const idx = orders.findIndex(o => o.id === id);
      if (idx !== -1) {
        orders[idx] = { ...orders[idx], ...orderData };
        mockDb.saveOrders(orders);
      }
      return { success: true };
    }
  },

  // Hapus penjualan
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/penjualan/${id}`);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      const orders = mockDb.getOrders();
      const filtered = orders.filter(o => o.id !== id);
      mockDb.saveOrders(filtered);
      return { success: true };
    }
  }
};
