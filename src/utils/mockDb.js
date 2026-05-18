const INITIAL_CUSTOMERS = [
  { id: 'PLG-001', name: 'Berkah Sekawan Motor', address: 'Jl. A. Yani Km 5, Banjarmasin', phone: '05113256789', outstanding: 15400000, lastOrder: '28 Apr 2026', status: 'Active', city: 'Banjarmasin' },
  { id: 'PLG-002', name: 'Jaya Motor Banjarmasin', address: 'Jl. Lambung Mangkurat No. 45', phone: '05114567890', outstanding: 12800000, lastOrder: '27 Apr 2026', status: 'Active', city: 'Banjarmasin' },
  { id: 'PLG-003', name: 'Mandiri Service', address: 'Jl. Gatot Subroto Km 3, Banjarbaru', phone: '05116789012', outstanding: 8600000, lastOrder: '27 Apr 2026', status: 'Active', city: 'Banjarbaru' },
  { id: 'PLG-004', name: 'Abadi Motor', address: 'Jl. Hasan Basri, Banjarmasin', phone: '05111234567', outstanding: 5200000, lastOrder: '26 Apr 2026', status: 'Active', city: 'Banjarmasin' },
  { id: 'PLG-005', name: 'Mitra Jaya Motor', address: 'Jl. Veteran, Martapura', phone: '05119876543', outstanding: 0, lastOrder: '20 Apr 2026', status: 'Active', city: 'Martapura' },
  { id: 'PLG-006', name: 'Sejahtera Service', address: 'Jl. Sutoyo S, Banjarmasin', phone: '05113456789', outstanding: 2100000, lastOrder: '15 Apr 2026', status: 'Active', city: 'Banjarmasin' },
];

const INITIAL_ORDERS = [
  { id: 'SO-20260511-001', date: '11 Mei 2026', customer: 'Berkah Sekawan Motor', sales: 'Fernando', total: 4200000, status: 'Draft', qty: 15, address: 'Jl. A. Yani Km 5, Banjarmasin' },
  { id: 'SO-20260511-002', date: '11 Mei 2026', customer: 'Jaya Motor Banjarmasin', sales: 'Budi Sales', total: 8500000, status: 'Approved', qty: 8, address: 'Jl. Lambung Mangkurat No. 45' },
  { id: 'SO-20260510-015', date: '10 Mei 2026', customer: 'Mandiri Service', sales: 'Fernando', total: 12400000, status: 'Shipped', driver: 'Pak Udin (DA 8812 TX)', qty: 25, address: 'Jl. Gatot Subroto Km 3, Banjarbaru' },
  { id: 'SO-20260510-016', date: '10 Mei 2026', customer: 'Abadi Motor', sales: 'Budi Sales', total: 3200000, status: 'Invoiced', time: '14:30 WITA', qty: 12, address: 'Jl. Hasan Basri, Banjarmasin' },
  { id: 'SO-20260509-022', date: '09 Mei 2026', customer: 'Mitra Jaya Motor', sales: 'Fernando', total: 5600000, status: 'Cancelled', qty: 10, address: 'Jl. Veteran, Martapura' },
];

const INITIAL_PURCHASE_ORDERS = [
  {
    id: 'PO-2026-001',
    date: '10 Mei 2026',
    supplier: 'PT. PLI (Petronas)',
    status: 'Diterima',
    items: [
      { name: 'Syntium 5000 10W-40', qty: 100, uom: 'Karton' },
      { name: 'Urania 3000 15W-40', qty: 50, uom: 'Karton' },
    ],
    totalQty: 150,
    notes: 'Pemesanan rutin bulanan'
  },
  {
    id: 'PO-2026-002',
    date: '11 Mei 2026',
    supplier: 'PT. ABM (Kixx)',
    status: 'Menunggu',
    items: [
      { name: 'Kixx G1 5W-30', qty: 80, uom: 'Karton' },
    ],
    totalQty: 80,
    notes: ''
  },
];

// Initialize mock DB
export const initDb = () => {
  if (!localStorage.getItem('gana_customers')) {
    localStorage.setItem('gana_customers', JSON.stringify(INITIAL_CUSTOMERS));
  }
  if (!localStorage.getItem('gana_orders')) {
    localStorage.setItem('gana_orders', JSON.stringify(INITIAL_ORDERS));
  }
  if (!localStorage.getItem('gana_purchase_orders')) {
    localStorage.setItem('gana_purchase_orders', JSON.stringify(INITIAL_PURCHASE_ORDERS));
  }
};

export const resetDb = () => {
  localStorage.removeItem('gana_customers');
  localStorage.removeItem('gana_orders');
  localStorage.removeItem('gana_purchase_orders');
  initDb();
};

export const getFormattedDate = () => {
  const d = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
  return `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
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
    // Jika pembayaran tempo, tambahkan ke outstanding
    if (order.paymentMethod === 'tempo') {
      customers[customerIndex].outstanding += order.total;
    } else {
      // Jika pembayaran tunai/cash, tidak perlu menambah outstanding tapi asumsinya tetap ada aktivitas order
      // Anda juga bisa mengupdate total pembelian, dsb, tapi untuk saat ini yang diminta adalah outstanding
    }
    customers[customerIndex].lastOrder = dateFormatted;
    saveCustomers(customers);
  }
};

export const updateOrderStatus = (orderId, newStatus, additionalData = {}) => {
  const orders = getOrders();
  const updatedOrders = orders.map(o => {
    if (o.id === orderId) {
      return { ...o, status: newStatus, ...additionalData };
    }
    return o;
  });
  saveOrders(updatedOrders);
};

// Purchase Orders Methods
export const getPurchaseOrders = () => {
  const data = localStorage.getItem('gana_purchase_orders');
  return data ? JSON.parse(data) : [];
};

export const savePurchaseOrders = (pos) => {
  localStorage.setItem('gana_purchase_orders', JSON.stringify(pos));
};

export const addPurchaseOrder = (po) => {
  const pos = getPurchaseOrders();
  const newPo = {
    id: `PO-${new Date().getFullYear()}-${String(pos.length + 1).padStart(3, '0')}`,
    date: getFormattedDate(),
    status: 'Menunggu',
    ...po
  };
  pos.unshift(newPo);
  savePurchaseOrders(pos);
  return newPo;
};

export const updatePurchaseOrderStatus = (poId, newStatus) => {
  const pos = getPurchaseOrders();
  const updated = pos.map(p => p.id === poId ? { ...p, status: newStatus } : p);
  savePurchaseOrders(updated);
};
