export const getFormattedDate = () => {
  const d = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
  return `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export const getFormattedDateMinusDays = (days) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
  return `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export const getIsoDateMinusDays = (days) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

const INITIAL_CUSTOMERS = [
  { id: 'PLG-001', name: 'Bengkel Berkah Sekawan Motor', address: 'Jl. A. Yani Km 5, Banjarmasin', phone: '081234567890', outstanding: 15400000, lastOrder: getFormattedDateMinusDays(2), status: 'Active', city: 'Banjarmasin' },
  { id: 'PLG-002', name: 'Bengkel Maju Motor', address: 'Jl. Hasan Basri No. 12, Banjarmasin', phone: '081298765432', outstanding: 8500000, lastOrder: getFormattedDateMinusDays(1), status: 'Active', city: 'Banjarmasin' },
  { id: 'PLG-003', name: 'Bengkel Sentosa Abadi', address: 'Jl. Gatot Subroto No. 45, Banjarbaru', phone: '081345678901', outstanding: 12000000, lastOrder: getFormattedDateMinusDays(0), status: 'Active', city: 'Banjarbaru' },
  { id: 'PLG-004', name: 'Bengkel Perkasa Jaya', address: 'Jl. Pramuka No. 8, Martapura', phone: '081123456789', outstanding: 9200000, lastOrder: getFormattedDateMinusDays(0), status: 'Active', city: 'Martapura' },
  { id: 'PLG-005', name: 'Bengkel Bintang Mulia', address: 'Jl. Pelaihari Raya No. 34, Pelaihari', phone: '081987654321', outstanding: 0, lastOrder: getFormattedDateMinusDays(3), status: 'Active', city: 'Pelaihari' },
  { id: 'PLG-006', name: 'Bengkel Harapan Baru', address: 'Jl. A. Yani Km 10, Kertak Hanyar', phone: '081223344556', outstanding: 14800000, lastOrder: getFormattedDateMinusDays(4), status: 'Active', city: 'Kertak Hanyar' },
  { id: 'PLG-007', name: 'Bengkel Sumber Makmur', address: 'Jl. Golf No. 15, Landasan Ulin', phone: '081334455667', outstanding: 0, lastOrder: getFormattedDateMinusDays(4), status: 'Active', city: 'Landasan Ulin' },
  { id: 'PLG-008', name: 'Bengkel Nusantara Auto', address: 'Jl. S. Parman No. 88, Banjarmasin', phone: '081556677889', outstanding: 11200000, lastOrder: getFormattedDateMinusDays(5), status: 'Active', city: 'Banjarmasin' }
];

const INITIAL_PRODUCTS = [
  { id: 'PRD-001', brand: 'Kixx', name: 'Kixx G1 0W-20 SN Fully Synthetic', sae: '0W-20', kemasan: '12x1L', kategori: 'Gasoline', harga: 137860, stokKarton: 89, stokLiter: 1068, grade: 'SN', tipe_kendaraan: 'Mobil Bensin' },
  { id: 'PRD-002', brand: 'Kixx', name: 'Kixx G1 5W-30 API SN+ / ILSAC GF-5 Fully Synthetic', sae: '5W-30', kemasan: '4x4L', kategori: 'Gasoline', harga: 503700, stokKarton: 102, stokLiter: 408, grade: 'API SN+', tipe_kendaraan: 'Mobil Bensin' },
  { id: 'PRD-003', brand: 'Kixx', name: 'Kixx G1 10W-40 SN Semi Synthetic', sae: '10W-40', kemasan: '12x1L', kategori: 'Gasoline', harga: 125920, stokKarton: 93, stokLiter: 1116, grade: 'SN', tipe_kendaraan: 'Mobil Bensin' },
  { id: 'PRD-004', brand: 'Kixx', name: 'Kixx D1 15W-40 CI-4 / SL Semi Synthetic', sae: '15W-40', kemasan: '4x4L', kategori: 'Diesel', harga: 489000, stokKarton: 75, stokLiter: 300, grade: 'CI-4 / SL', tipe_kendaraan: 'Mobil Diesel' },
  { id: 'PRD-005', brand: 'Kixx', name: 'Kixx Geartec 80W-90 GL-5 Semi Synthetic', sae: '80W-90', kemasan: '12x1L', kategori: 'Transmission', harga: 82000, stokKarton: 60, stokLiter: 720, grade: 'GL-5', tipe_kendaraan: 'Mobil' },
  { id: 'PRD-006', brand: 'Kixx', name: 'Kixx ATF DX-III Dextron 3 Fully Synthetic', sae: 'ATF', kemasan: '12x1L', kategori: 'Transmission', harga: 95000, stokKarton: 45, stokLiter: 540, grade: 'Dexron III', tipe_kendaraan: 'Mobil' },
  { id: 'PRD-007', brand: 'Kixx', name: 'Kixx G1 Hybrid 0W-20 Fully Synthetic', sae: '0W-20', kemasan: '12x1L', kategori: 'Hybrid', harga: 278000, stokKarton: 88, stokLiter: 1056, grade: 'Hybrid', tipe_kendaraan: 'Mobil Bensin' },
  { id: 'PRD-008', brand: 'Petronas', name: 'Petronas Syntium 500 10W-30 API SN', sae: '10W-30', kemasan: '16x1L', kategori: 'Gasoline', harga: 87351, stokKarton: 65, stokLiter: 1040, grade: 'API SN', tipe_kendaraan: 'Mobil Bensin' },
  { id: 'PRD-009', brand: 'Petronas', name: 'Petronas Syntium 800 5W-30 API SP, ILSAC GF-6A', sae: '5W-30', kemasan: '4x4L', kategori: 'Gasoline', harga: 110657, stokKarton: 62, stokLiter: 248, grade: 'API SP', tipe_kendaraan: 'Mobil Bensin' },
  { id: 'PRD-010', brand: 'Petronas', name: 'Petronas Syntium 3000 E 0W-20 API SN Plus', sae: '0W-20', kemasan: '16x1L', kategori: 'Gasoline', harga: 115491, stokKarton: 95, stokLiter: 1520, grade: 'API SN Plus', tipe_kendaraan: 'Mobil Bensin' },
  { id: 'PRD-011', brand: 'Petronas', name: 'Petronas Urania 3000 15W-40 API CI-4, ACEA E7', sae: '15W-40', kemasan: '4x5L', kategori: 'Diesel', harga: 73780, stokKarton: 44, stokLiter: 220, grade: 'API CI-4', tipe_kendaraan: 'Mobil Diesel' },
  { id: 'PRD-012', brand: 'Petronas', name: 'Petronas Tutela ATF D3 Dexron III', sae: 'ATF', kemasan: '16x1L', kategori: 'Transmission', harga: 78848, stokKarton: 59, stokLiter: 944, grade: 'Dexron III', tipe_kendaraan: 'Mobil' },
  { id: 'PRD-013', brand: 'Petronas', name: 'Petronas Tutela Axle 300 80W-90 API GL-5', sae: '80W-90', kemasan: '16x1L', kategori: 'Transmission', harga: 73083, stokKarton: 72, stokLiter: 1152, grade: 'API GL-5', tipe_kendaraan: 'Mobil' }
];

// Initialize mock DB
export const initDb = () => {
  // Force migration version 2 to apply balanced dataset cleanly
  const currentMigration = localStorage.getItem('gana_migration_v2');
  if (currentMigration !== 'true') {
    localStorage.removeItem('gana_customers');
    localStorage.removeItem('gana_orders');
    localStorage.removeItem('gana_incoming_stock');
    localStorage.removeItem('gana_products');
    localStorage.removeItem('gana_stock_history');
    localStorage.removeItem('gana_visits');
    localStorage.setItem('gana_migration_v2', 'true');
  }

  const existingProducts = localStorage.getItem('gana_products');
  if (!existingProducts || JSON.parse(existingProducts).length !== INITIAL_PRODUCTS.length || existingProducts.includes('[DUMMY]')) {
    localStorage.setItem('gana_products', JSON.stringify(INITIAL_PRODUCTS));
  }
  
  const existingCustomers = localStorage.getItem('gana_customers');
  if (!existingCustomers || JSON.parse(existingCustomers).length !== INITIAL_CUSTOMERS.length || existingCustomers.includes('[DUMMY]')) {
    localStorage.setItem('gana_customers', JSON.stringify(INITIAL_CUSTOMERS));
  }

  const existingOrders = localStorage.getItem('gana_orders');
  if (!existingOrders || JSON.parse(existingOrders).length !== 10 || existingOrders.includes('[DUMMY]')) {
    const ordersWithDates = [
      { id: 'SO-20260712-002', date: getFormattedDateMinusDays(0), customer: 'Bengkel Perkasa Jaya', sales: 'Fernando', total: 9200000, status: 'Draft', qty: 20, address: 'Jl. Pramuka No. 8, Martapura' },
      { id: 'SO-20260712-001', date: getFormattedDateMinusDays(0), customer: 'Bengkel Sentosa Abadi', sales: 'Fernando', total: 12000000, status: 'Approved', qty: 25, address: 'Jl. Gatot Subroto No. 45, Banjarbaru' },
      { id: 'SO-20260711-002', date: getFormattedDateMinusDays(1), customer: 'Bengkel Maju Motor', sales: 'Fernando', total: 8500000, status: 'Shipped', qty: 18, address: 'Jl. Hasan Basri No. 12, Banjarmasin', driver: 'Pak Supri (DA 8765 AB)' },
      { id: 'SO-20260710-001', date: getFormattedDateMinusDays(2), customer: 'Bengkel Berkah Sekawan Motor', sales: 'Fernando', total: 15400000, status: 'Delivered', qty: 32, address: 'Jl. A. Yani Km 5, Banjarmasin', driver: 'Pak Supri (DA 8765 AB)', time: '14:30 WITA' },
      { id: 'SO-20260709-001', date: getFormattedDateMinusDays(3), customer: 'Bengkel Bintang Mulia', sales: 'Fernando', total: 6400000, status: 'Delivered', qty: 15, address: 'Jl. Pelaihari Raya No. 34, Pelaihari', driver: 'Pak Dino (DA 9988 CC)', time: '11:15 WITA' },
      { id: 'SO-20260708-002', date: getFormattedDateMinusDays(4), customer: 'Bengkel Harapan Baru', sales: 'Fernando', total: 14800000, status: 'Delivered', qty: 30, address: 'Jl. A. Yani Km 10, Kertak Hanyar', driver: 'Pak Supri (DA 8765 AB)', time: '16:00 WITA' },
      { id: 'SO-20260708-001', date: getFormattedDateMinusDays(4), customer: 'Bengkel Sumber Makmur', sales: 'Fernando', total: 7500000, status: 'Delivered', qty: 16, address: 'Jl. Golf No. 15, Landasan Ulin', driver: 'Pak Dino (DA 9988 CC)', time: '09:45 WITA' },
      { id: 'SO-20260707-003', date: getFormattedDateMinusDays(5), customer: 'Bengkel Nusantara Auto', sales: 'Fernando', total: 11200000, status: 'Delivered', qty: 24, address: 'Jl. S. Parman No. 88, Banjarmasin', driver: 'Pak Supri (DA 8765 AB)', time: '15:20 WITA' },
      { id: 'SO-20260706-002', date: getFormattedDateMinusDays(6), customer: 'Bengkel Berkah Sekawan Motor', sales: 'Fernando', total: 18300000, status: 'Delivered', qty: 38, address: 'Jl. A. Yani Km 5, Banjarmasin', driver: 'Pak Dino (DA 9988 CC)', time: '13:10 WITA' },
      { id: 'SO-20260705-001', date: getFormattedDateMinusDays(7), customer: 'Bengkel Maju Motor', sales: 'Fernando', total: 5900000, status: 'Delivered', qty: 12, address: 'Jl. Hasan Basri No. 12, Banjarmasin', driver: 'Pak Supri (DA 8765 AB)', time: '10:30 WITA' }
    ];
    localStorage.setItem('gana_orders', JSON.stringify(ordersWithDates));
  }

  const existingIncoming = localStorage.getItem('gana_incoming_stock');
  if (!existingIncoming || JSON.parse(existingIncoming).length !== 8 || existingIncoming.includes('[DUMMY]')) {
    const incomingWithDates = [
      { id: 'RCV-20260712-01', sj: 'SJ-KP-1029', supplier: 'PT. Kixx Pratama', date: getFormattedDateMinusDays(0), createdAt: getIsoDateMinusDays(0), updatedAt: getIsoDateMinusDays(0), items: 2, totalQty: 100, status: 'pending', draftList: [
        { brand: 'Kixx', name: 'Kixx G1 10W-40 SN Semi Synthetic', qty: 50, uom: 'Karton' },
        { brand: 'Kixx', name: 'Kixx D1 15W-40 CI-4 / SL Semi Synthetic', qty: 50, uom: 'Karton' }
      ]},
      { id: 'RCV-20260712-02', sj: 'SJ-PLI-1020', supplier: 'PT. PLI (Petronas)', date: getFormattedDateMinusDays(0), createdAt: getIsoDateMinusDays(0), updatedAt: getIsoDateMinusDays(0), items: 1, totalQty: 50, status: 'pending', draftList: [
        { brand: 'Petronas', name: 'Petronas Syntium 500 10W-30 API SN', qty: 50, uom: 'Karton' }
      ]},
      { id: 'RCV-20260711-01', sj: 'SJ-KP-9910', supplier: 'PT. Kixx Pratama', date: getFormattedDateMinusDays(1), createdAt: getIsoDateMinusDays(1), updatedAt: getIsoDateMinusDays(1), items: 2, totalQty: 150, status: 'approved', draftList: [
        { brand: 'Kixx', name: 'Kixx G1 0W-20 SN Fully Synthetic', qty: 80, uom: 'Karton' },
        { brand: 'Kixx', name: 'Kixx G1 5W-30 API SN+ / ILSAC GF-5 Fully Synthetic', qty: 70, uom: 'Karton' }
      ]},
      { id: 'RCV-20260710-01', sj: 'SJ-PLI-8829', supplier: 'PT. PLI (Petronas)', date: getFormattedDateMinusDays(2), createdAt: getIsoDateMinusDays(2), updatedAt: getIsoDateMinusDays(2), items: 2, totalQty: 120, status: 'approved', draftList: [
        { brand: 'Petronas', name: 'Petronas Syntium 500 10W-30 API SN', qty: 60, uom: 'Karton' },
        { brand: 'Petronas', name: 'Petronas Syntium 800 5W-30 API SP, ILSAC GF-6A', qty: 60, uom: 'Karton' }
      ]},
      { id: 'RCV-20260708-01', sj: 'SJ-PLI-7711', supplier: 'PT. PLI (Petronas)', date: getFormattedDateMinusDays(4), createdAt: getIsoDateMinusDays(4), updatedAt: getIsoDateMinusDays(4), items: 2, totalQty: 180, status: 'approved', draftList: [
        { brand: 'Petronas', name: 'Petronas Syntium 3000 E 0W-20 API SN Plus', qty: 100, uom: 'Karton' },
        { brand: 'Petronas', name: 'Petronas Tutela ATF D3 Dexron III', qty: 80, uom: 'Karton' }
      ]},
      { id: 'RCV-20260705-01', sj: 'SJ-KP-6540', supplier: 'PT. Kixx Pratama', date: getFormattedDateMinusDays(6), createdAt: getIsoDateMinusDays(6), updatedAt: getIsoDateMinusDays(6), items: 2, totalQty: 120, status: 'approved', draftList: [
        { brand: 'Kixx', name: 'Kixx Geartec 80W-90 GL-5 Semi Synthetic', qty: 70, uom: 'Karton' },
        { brand: 'Kixx', name: 'Kixx ATF DX-III Dextron 3 Fully Synthetic', qty: 50, uom: 'Karton' }
      ]},
      { id: 'RCV-20260702-01', sj: 'SJ-PLI-5520', supplier: 'PT. PLI (Petronas)', date: getFormattedDateMinusDays(9), createdAt: getIsoDateMinusDays(9), updatedAt: getIsoDateMinusDays(9), items: 1, totalQty: 90, status: 'approved', draftList: [
        { brand: 'Petronas', name: 'Petronas Tutela Axle 300 80W-90 API GL-5', qty: 90, uom: 'Karton' }
      ]},
      { id: 'RCV-20260630-01', sj: 'SJ-KP-4410', supplier: 'PT. Kixx Pratama', date: getFormattedDateMinusDays(11), createdAt: getIsoDateMinusDays(11), updatedAt: getIsoDateMinusDays(11), items: 1, totalQty: 110, status: 'approved', draftList: [
        { brand: 'Kixx', name: 'Kixx D1 15W-40 CI-4 / SL Semi Synthetic', qty: 110, uom: 'Karton' }
      ]}
    ];
    localStorage.setItem('gana_incoming_stock', JSON.stringify(incomingWithDates));
  }

  const existingHistory = localStorage.getItem('gana_stock_history');
  if (!existingHistory || JSON.parse(existingHistory).length !== 8 || existingHistory.includes('[DUMMY]')) {
    const historyWithDates = [
      { id: 'TRX-260712-03', date: `${getFormattedDateMinusDays(0)} 16:45`, type: 'out', product: 'Kixx G1 Hybrid 0W-20 Fully Synthetic', qty: 25, ref: 'DO-SO-20260712-001 (Bengkel Sentosa Abadi)', balance: 88 },
      { id: 'TRX-260712-02', date: `${getFormattedDateMinusDays(0)} 11:20`, type: 'out', product: 'Kixx Geartec 80W-90 GL-5 Semi Synthetic', qty: 20, ref: 'DO-SO-20260712-002 (Bengkel Perkasa Jaya)', balance: 60 },
      { id: 'TRX-260711-02', date: `${getFormattedDateMinusDays(1)} 16:30`, type: 'out', product: 'Petronas Syntium 800 5W-30 API SP, ILSAC GF-6A', qty: 18, ref: 'DO-SO-20260711-002 (Bengkel Maju Motor)', balance: 62 },
      { id: 'TRX-260711-01', date: `${getFormattedDateMinusDays(1)} 10:15`, type: 'in', product: 'Kixx G1 0W-20 SN Fully Synthetic', qty: 80, ref: 'RCV-20260711-01 (PT. Kixx Pratama)', balance: 89 },
      { id: 'TRX-260711-00', date: `${getFormattedDateMinusDays(1)} 09:30`, type: 'in', product: 'Kixx G1 5W-30 API SN+ / ILSAC GF-5 Fully Synthetic', qty: 70, ref: 'RCV-20260711-01 (PT. Kixx Pratama)', balance: 102 },
      { id: 'TRX-260710-02', date: `${getFormattedDateMinusDays(2)} 15:45`, type: 'in', product: 'Petronas Syntium 500 10W-30 API SN', qty: 60, ref: 'RCV-20260710-01 (PT. PLI)', balance: 65 },
      { id: 'TRX-260710-01', date: `${getFormattedDateMinusDays(2)} 14:30`, type: 'out', product: 'Kixx G1 5W-30 API SN+ / ILSAC GF-5 Fully Synthetic', qty: 15, ref: 'DO-SO-20260710-001 (Bengkel Berkah Sekawan Motor)', balance: 32 },
      { id: 'TRX-260708-01', date: `${getFormattedDateMinusDays(4)} 11:00`, type: 'in', product: 'Petronas Syntium 3000 E 0W-20 API SN Plus', qty: 100, ref: 'RCV-20260708-01 (PT. PLI)', balance: 95 }
    ];
    localStorage.setItem('gana_stock_history', JSON.stringify(historyWithDates));
  }

  const existingVisits = localStorage.getItem('gana_visits');
  if (!existingVisits || JSON.parse(existingVisits).length !== 8) {
    const visitsWithDates = [
      { id: 'VST-001', customer: 'Bengkel Berkah Sekawan Motor', sales: 'Fernando', date: getFormattedDateMinusDays(0), agenda: 'Rutin Mingguan', status: 'Selesai', notes: 'Bengkel melakukan order ulang oli Kixx G1.' },
      { id: 'VST-002', customer: 'Bengkel Maju Motor', sales: 'Fernando', date: getFormattedDateMinusDays(1), agenda: 'Penagihan Piutang', status: 'Selesai', notes: 'Pembayaran tempo sebagian via transfer.' },
      { id: 'VST-003', customer: 'Bengkel Sentosa Abadi', sales: 'Fernando', date: getFormattedDateMinusDays(2), agenda: 'Penawaran Kategori Hybrid', status: 'Selesai', notes: 'Tertarik dengan Kixx G1 Hybrid.' },
      { id: 'VST-004', customer: 'Bengkel Perkasa Jaya', sales: 'Fernando', date: getFormattedDateMinusDays(3), agenda: 'Rutin Mingguan', status: 'Selesai', notes: 'Stok oli diesel menipis.' },
      { id: 'VST-005', customer: 'Bengkel Bintang Mulia', sales: 'Fernando', date: getFormattedDateMinusDays(4), agenda: 'Rutin Mingguan', status: 'Selesai', notes: 'Penyerahan brosur promo Kixx.' },
      { id: 'VST-006', customer: 'Bengkel Harapan Baru', sales: 'Fernando', date: getFormattedDateMinusDays(5), agenda: 'Penagihan Piutang', status: 'Selesai', notes: 'Owner sedang tidak di tempat.' },
      { id: 'VST-007', customer: 'Bengkel Sumber Makmur', sales: 'Fernando', date: getFormattedDateMinusDays(6), agenda: 'Rutin Mingguan', status: 'Selesai', notes: 'Pembelian cash oli Petronas.' },
      { id: 'VST-008', customer: 'Bengkel Nusantara Auto', sales: 'Fernando', date: getFormattedDateMinusDays(7), agenda: 'Rutin Mingguan', status: 'Selesai', notes: 'Pemilik bengkel ramah.' }
    ];
    localStorage.setItem('gana_visits', JSON.stringify(visitsWithDates));
  }
};

export const resetDb = () => {
  localStorage.removeItem('gana_customers');
  localStorage.removeItem('gana_orders');
  localStorage.removeItem('gana_incoming_stock');
  localStorage.removeItem('gana_products');
  localStorage.removeItem('gana_stock_history');
  localStorage.removeItem('gana_visits');
  localStorage.removeItem('gana_migration_v2');
  initDb();
};

// Customers Methods
export const getCustomers = () => {
  const data = localStorage.getItem('gana_customers');
  return data ? JSON.parse(data) : [];
};

export const saveCustomers = (customers) => {
  localStorage.setItem('gana_customers', JSON.stringify(customers));
};

export const addCustomer = (customer) => {
  const customers = getCustomers();
  customers.push(customer);
  saveCustomers(customers);
};

// Orders Methods
export const getOrders = () => {
  const data = localStorage.getItem('gana_orders');
  return data ? JSON.parse(data) : [];
};

export const saveOrders = (orders) => {
  localStorage.setItem('gana_orders', JSON.stringify(orders));
};

export const addOrder = (order) => {
  const orders = getOrders();
  const dateFormatted = getFormattedDate();
  const newOrder = {
    id: `SO-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${String(orders.length + 1).padStart(3, '0')}`,
    date: dateFormatted,
    ...order
  };
  orders.unshift(newOrder); // Add to top
  saveOrders(orders);

  // Update Customer Outstanding & Last Order
  const customers = getCustomers();
  const customerIndex = customers.findIndex(c => c.name === order.customer);
  if (customerIndex !== -1) {
    if (order.paymentMethod === 'tempo') {
      customers[customerIndex].outstanding += order.total;
    }
    customers[customerIndex].lastOrder = dateFormatted;
    saveCustomers(customers);
  }
};

export const updateOrderStatus = (orderId, newStatus, additionalData = {}) => {
  const orders = getOrders();
  const updatedOrders = orders.map(o => {
    if (o.id === orderId) {
      // If status changes to Shipped and was not Shipped before, deduct stock
      if (newStatus === 'Shipped' && o.status !== 'Shipped') {
        const products = getProducts();
        const history = getStockHistory();
        const now = new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
        const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WITA';
        const dateStr = `${now.getDate().toString().padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()} ${timeStr}`;

        if (o.items && Array.isArray(o.items)) {
          o.items.forEach(item => {
            const prodIdx = products.findIndex(p => p.name === item.name || p.id === item.id);
            if (prodIdx !== -1) {
              const qtyToDeduct = Number(item.qty);
              products[prodIdx].stokKarton = Math.max(0, Number(products[prodIdx].stokKarton) - qtyToDeduct);
              
              // Recalculate stokLiter based on packaging (kemasan)
              const volumeMatch = products[prodIdx].kemasan.match(/(\d+)/);
              const volumePerKarton = volumeMatch ? parseInt(volumeMatch[1]) : 4;
              products[prodIdx].stokLiter = products[prodIdx].stokKarton * volumePerKarton;

              // Generate transaction ID
              const trxId = `TRX-${now.toISOString().slice(2,10).replace(/-/g,'')}-${String(Math.floor(Math.random() * 90) + 10)}`;

              history.unshift({
                id: trxId,
                date: dateStr,
                type: 'out',
                product: products[prodIdx].name,
                qty: qtyToDeduct,
                ref: `DO-${o.id} (${o.customer})`,
                balance: products[prodIdx].stokKarton
              });
            }
          });
        }
        saveProducts(products);
        saveStockHistory(history);
      }
      return { ...o, status: newStatus, ...additionalData };
    }
    return o;
  });
  saveOrders(updatedOrders);
};

// Products Methods
export const getProducts = () => {
  const data = localStorage.getItem('gana_products');
  return data ? JSON.parse(data) : [];
};

export const saveProducts = (products) => {
  localStorage.setItem('gana_products', JSON.stringify(products));
};

// Stock History Methods
export const getStockHistory = () => {
  const data = localStorage.getItem('gana_stock_history');
  return data ? JSON.parse(data) : [];
};

export const saveStockHistory = (history) => {
  localStorage.setItem('gana_stock_history', JSON.stringify(history));
};

// Incoming Stock Methods
export const getIncomingStock = () => {
  const data = localStorage.getItem('gana_incoming_stock');
  return data ? JSON.parse(data) : [];
};

export const saveIncomingStock = (stock) => {
  localStorage.setItem('gana_incoming_stock', JSON.stringify(stock));
};

export const addIncomingStock = (receipt) => {
  const stock = getIncomingStock();
  const dateFormatted = getFormattedDate();
  const newReceipt = {
    id: `RCV-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${String(stock.length + 1).padStart(2, '0')}`,
    date: dateFormatted,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...receipt
  };
  stock.unshift(newReceipt);
  saveIncomingStock(stock);
  return newReceipt;
};

export const updateIncomingStockStatus = (id, newStatus) => {
  const stock = getIncomingStock();
  const updated = stock.map(s => {
    if (s.id === id) {
      // If approved, update products' stock and log stock transaction history
      if (newStatus === 'approved' && s.status !== 'approved') {
        const products = getProducts();
        const history = getStockHistory();
        const now = new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
        const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WITA';
        const dateStr = `${now.getDate().toString().padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()} ${timeStr}`;

        if (s.draftList && Array.isArray(s.draftList)) {
          s.draftList.forEach(item => {
            const prodIdx = products.findIndex(p => p.name === item.name);
            if (prodIdx !== -1) {
              const qtyToAdd = Number(item.qty);
              products[prodIdx].stokKarton = Number(products[prodIdx].stokKarton) + qtyToAdd;
              
              // Recalculate stokLiter based on packaging (kemasan)
              const volumeMatch = products[prodIdx].kemasan.match(/(\d+)/);
              const volumePerKarton = volumeMatch ? parseInt(volumeMatch[1]) : 4;
              products[prodIdx].stokLiter = products[prodIdx].stokKarton * volumePerKarton;

              // Generate transaction ID
              const trxId = `TRX-${now.toISOString().slice(2,10).replace(/-/g,'')}-${String(Math.floor(Math.random() * 90) + 10)}`;

              history.unshift({
                id: trxId,
                date: dateStr,
                type: 'in',
                product: item.name,
                qty: qtyToAdd,
                ref: `${s.id} (${s.supplier})`,
                balance: products[prodIdx].stokKarton
              });
            }
          });
        }
        saveProducts(products);
        saveStockHistory(history);
      }
      return { ...s, status: newStatus, updatedAt: new Date().toISOString() };
    }
    return s;
  });
  saveIncomingStock(updated);
};

// Visits Methods
export const getVisits = () => {
  const data = localStorage.getItem('gana_visits');
  return data ? JSON.parse(data) : [];
};

export const saveVisits = (visits) => {
  localStorage.setItem('gana_visits', JSON.stringify(visits));
};

export const addVisit = (visit) => {
  const visits = getVisits();
  const newVisit = {
    id: `VST-${String(visits.length + 1).padStart(3, '0')}`,
    sales: localStorage.getItem('userFullName') || 'Sales Gana',
    date: getFormattedDate(),
    ...visit
  };
  visits.unshift(newVisit);
  saveVisits(visits);
  return newVisit;
};

// Initialize DB on script load
initDb();

export const confirmOrderPaymentLocal = (orderId) => {
  const orders = getOrders();
  const updatedOrders = orders.map(o => {
    if (o.id === orderId || o.invoiceId === orderId || o.id_transaksi === orderId) {
      return { ...o, statusBayar: 'Lunas' };
    }
    return o;
  });
  saveOrders(updatedOrders);

  // We should also deduct outstanding amount for the customer
  const order = orders.find(o => o.id === orderId || o.invoiceId === orderId || o.id_transaksi === orderId);
  if (order) {
    const customers = getCustomers();
    const customerIndex = customers.findIndex(c => c.name === order.customer);
    if (customerIndex !== -1) {
      customers[customerIndex].outstanding = Math.max(0, customers[customerIndex].outstanding - order.total);
      saveCustomers(customers);
    }
  }
};

export const getPiutangDataLocal = () => {
  const customers = getCustomers();
  const list = [];
  let totalPiutang = 0;
  let overduePiutang = 0;
  let countOverdue = 0;
  let warningPiutang = 0;

  customers.forEach(c => {
    if (c.outstanding > 0) {
      totalPiutang += c.outstanding;

      let status = 'safe';
      let days = 14;
      if (c.name.includes('Harapan')) {
        status = 'overdue';
        days = 5;
        overduePiutang += c.outstanding;
        countOverdue += 1;
      } else if (c.name.includes('Nusantara')) {
        status = 'overdue';
        days = 8;
        overduePiutang += c.outstanding;
        countOverdue += 1;
      } else if (c.name.includes('Berkah')) {
        status = 'warning';
        days = 4;
        warningPiutang += c.outstanding;
      } else if (c.name.includes('Maju')) {
        status = 'safe';
        days = 11;
      } else if (c.name.includes('Sentosa')) {
        status = 'safe';
        days = 14;
      } else if (c.name.includes('Perkasa')) {
        status = 'safe';
        days = 14;
      }

      list.push({
        id: `INV-${c.id}-${c.lastOrder.replace(/ /g, '')}`,
        dbId: c.id,
        customer: c.name,
        city: c.city,
        amount: c.outstanding,
        dueDate: c.lastOrder,
        status: status,
        days: days
      });
    }
  });

  return {
    success: true,
    stats: {
      totalPiutang,
      overduePiutang,
      countOverdue,
      warningPiutang
    },
    list
  };
};
