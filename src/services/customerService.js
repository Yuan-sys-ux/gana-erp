import api from '../utils/api';
import * as mockDb from '../utils/mockDb';

export const customerService = {
  // Ambil semua pelanggan
  getAll: async () => {
    try {
      const response = await api.get('/api/pelanggan');
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      return mockDb.getCustomers();
    }
  },

  // Tambah pelanggan baru
  create: async (customerData) => {
    try {
      const response = await api.post('/api/pelanggan', customerData);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      const customers = mockDb.getCustomers();
      const newCustomer = {
        id: `PLG-${Date.now()}`,
        name: customerData.name || customerData.nama_bengkel,
        address: customerData.address || customerData.detail_alamat || '',
        phone: customerData.phone || customerData.telp_bengkel || '',
        outstanding: customerData.outstanding || 0,
        lastOrder: '-',
        status: 'Active',
        city: customerData.city || 'Banjarmasin'
      };
      customers.push(newCustomer);
      mockDb.saveCustomers(customers);
      return { success: true, data: newCustomer };
    }
  },

  // Update data pelanggan
  update: async (id, customerData) => {
    try {
      const response = await api.put(`/api/pelanggan/${id}`, customerData);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      const customers = mockDb.getCustomers();
      const idx = customers.findIndex(c => c.id === id);
      if (idx !== -1) {
        customers[idx] = {
          ...customers[idx],
          name: customerData.name || customerData.nama_bengkel || customers[idx].name,
          address: customerData.address || customerData.detail_alamat || customers[idx].address,
          phone: customerData.phone || customerData.telp_bengkel || customers[idx].phone,
          city: customerData.city || customers[idx].city
        };
        mockDb.saveCustomers(customers);
      }
      return { success: true };
    }
  },

  // Hapus pelanggan
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/pelanggan/${id}`);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      const customers = mockDb.getCustomers();
      const filtered = customers.filter(c => c.id !== id);
      mockDb.saveCustomers(filtered);
      return { success: true };
    }
  }
};
