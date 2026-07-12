import api from '../utils/api';
import * as mockDb from '../utils/mockDb';

export const purchaseService = {
  // Ambil semua pembelian
  getAll: async () => {
    try {
      const response = await api.get('/api/pembelian');
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      return mockDb.getIncomingStock();
    }
  },

  // Tambah pembelian baru
  create: async (purchaseData) => {
    try {
      const response = await api.post('/api/pembelian', purchaseData);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      return mockDb.addIncomingStock({
        sj: purchaseData.sj,
        supplier: purchaseData.supplier,
        items: purchaseData.items ? purchaseData.items.length : 0,
        totalQty: purchaseData.items ? purchaseData.items.reduce((acc, curr) => acc + Number(curr.qty), 0) : 0,
        draftList: purchaseData.items || []
      });
    }
  },

  // Update data pembelian
  update: async (id, purchaseData) => {
    try {
      const response = await api.put(`/api/pembelian/${id}`, purchaseData);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      if (purchaseData.status) {
        mockDb.updateIncomingStockStatus(id, purchaseData.status);
      }
      return { success: true };
    }
  },

  // Hapus pembelian
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/pembelian/${id}`);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      const stock = mockDb.getIncomingStock();
      const filtered = stock.filter(s => s.id !== id);
      mockDb.saveIncomingStock(filtered);
      return { success: true };
    }
  }
};
