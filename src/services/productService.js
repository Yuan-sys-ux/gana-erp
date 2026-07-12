import api from '../utils/api';
import * as mockDb from '../utils/mockDb';

export const productService = {
  // Ambil semua produk
  getAll: async () => {
    try {
      const response = await api.get('/api/produk');
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      return mockDb.getProducts();
    }
  },

  // Tambah produk baru
  create: async (productData) => {
    try {
      const response = await api.post('/api/produk', productData);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      const products = mockDb.getProducts();
      const newProduct = {
        id: `PRD-${Date.now()}`,
        brand: productData.brand,
        name: productData.nama || productData.name,
        sae: productData.sae,
        kemasan: productData.kemasan,
        kategori: productData.kategori,
        harga: productData.harga,
        stokKarton: productData.stokKarton || 0,
        stokLiter: productData.stokLiter || 0,
        grade: productData.grade || '',
        tipe_kendaraan: productData.tipe_kendaraan || ''
      };
      products.push(newProduct);
      mockDb.saveProducts(products);
      return { success: true, data: newProduct };
    }
  },

  // Update data produk
  update: async (id, productData) => {
    try {
      const response = await api.put(`/api/produk/${id}`, productData);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      const products = mockDb.getProducts();
      const idx = products.findIndex(p => p.id === id);
      if (idx !== -1) {
        products[idx] = {
          ...products[idx],
          brand: productData.brand,
          name: productData.nama || productData.name,
          sae: productData.sae,
          kemasan: productData.kemasan,
          kategori: productData.kategori,
          harga: productData.harga,
          stokKarton: productData.stokKarton,
          stokLiter: productData.stokLiter,
          grade: productData.grade || '',
          tipe_kendaraan: productData.tipe_kendaraan || ''
        };
        mockDb.saveProducts(products);
      }
      return { success: true };
    }
  },

  // Hapus produk
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/produk/${id}`);
      return response.data;
    } catch (err) {
      console.warn("Backend API offline. Menggunakan data lokal dari mockDb.");
      const products = mockDb.getProducts();
      const filtered = products.filter(p => p.id !== id);
      mockDb.saveProducts(filtered);
      return { success: true };
    }
  }
};
