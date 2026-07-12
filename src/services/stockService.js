import api from '../utils/api';
import * as mockDb from '../utils/mockDb';

export const stockService = {
  // Ambil semua stok
  getAll: async () => {
    try {
      const response = await api.get('/api/stok');
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      return mockDb.getStockHistory();
    }
  },

  // Tambah stok baru
  create: async (stockData) => {
    try {
      const response = await api.post('/api/stok', stockData);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      const history = mockDb.getStockHistory();
      const newHistory = {
        id: `TRX-${Date.now()}`,
        date: mockDb.getFormattedDate(),
        product: stockData.product,
        type: stockData.type || 'in',
        qty: stockData.qty || 0,
        ref: stockData.ref || 'Manual Adjustment',
        balance: stockData.balance || 0
      };
      history.unshift(newHistory);
      mockDb.saveStockHistory(history);
      return { success: true, data: newHistory };
    }
  },

  // Update data stok
  update: async (id, stockData) => {
    try {
      const response = await api.put(`/api/stok/${id}`, stockData);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      const history = mockDb.getStockHistory();
      const idx = history.findIndex(h => h.id === id);
      if (idx !== -1) {
        history[idx] = { ...history[idx], ...stockData };
        mockDb.saveStockHistory(history);
      }
      return { success: true };
    }
  },

  // Hapus stok
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/stok/${id}`);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      const history = mockDb.getStockHistory();
      const filtered = history.filter(h => h.id !== id);
      mockDb.saveStockHistory(filtered);
      return { success: true };
    }
  }
};
