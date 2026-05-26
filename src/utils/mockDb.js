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
];

const INITIAL_INCOMING_STOCK = [
  { id: 'RCV-20260511-01', sj: 'SJ-PLI-8829', supplier: 'PT. PLI (Petronas)', date: '11 Mei 2026', items: 2, totalQty: 150, status: 'pending', draftList: [
    { id: 101, brand: 'Petronas', name: 'Syntium 5000 10W-40', qty: 100, uom: 'Karton' },
    { id: 102, brand: 'Petronas', name: 'Syntium 7000 0W-20', qty: 50, uom: 'Karton' }
  ]},
  { id: 'RCV-20260511-02', sj: 'SJ-ABM-7712', supplier: 'PT. ABM (Kixx)', date: '11 Mei 2026', items: 1, totalQty: 50, status: 'pending', draftList: [
    { id: 103, brand: 'Kixx', name: 'Kixx G1 5W-30', qty: 50, uom: 'Karton' }
  ]},
  { id: 'RCV-20260510-05', sj: 'SJ-PLI-8711', supplier: 'PT. PLI (Petronas)', date: '10 Mei 2026', items: 4, totalQty: 320, status: 'approved', draftList: [
    { id: 104, brand: 'Petronas', name: 'Syntium 5000 10W-40', qty: 100, uom: 'Karton' },
    { id: 105, brand: 'Petronas', name: 'Syntium 7000 0W-20', qty: 80, uom: 'Karton' },
    { id: 106, brand: 'Petronas', name: 'Urania 3000 15W-40', qty: 110, uom: 'Karton' },
    { id: 107, brand: 'Petronas', name: 'Syntium 3000 5W-40', qty: 30, uom: 'Karton' }
  ]},
];

const INITIAL_PRODUCTS = [
  { id: 'PRD-001', brand: 'Kixx', name: 'Kixx G1 5W-30', sae: '5W-30', kemasan: '4L', kategori: 'Gasoline', harga: 400000, stokKarton: 120, stokLiter: 480 },
  { id: 'PRD-002', brand: 'Kixx', name: 'Kixx G1 10W-40', sae: '10W-40', kemasan: '4L', kategori: 'Gasoline', harga: 380000, stokKarton: 95, stokLiter: 380 },
  { id: 'PRD-003', brand: 'Petronas', name: 'Syntium 5000 10W-40', sae: '10W-40', kemasan: '4L', kategori: 'Synthetic', harga: 420000, stokKarton: 150, stokLiter: 600 },
  { id: 'PRD-004', brand: 'Petronas', name: 'Syntium 7000 0W-20', sae: '0W-20', kemasan: '4L', kategori: 'Fully Synthetic', harga: 520000, stokKarton: 80, stokLiter: 320 },
  { id: 'PRD-005', brand: 'Kixx', name: 'Kixx HD1 15W-40', sae: '15W-40', kemasan: '5L', kategori: 'Diesel', harga: 270000, stokKarton: 200, stokLiter: 1000 },
  { id: 'PRD-006', brand: 'Petronas', name: 'Urania 3000 15W-40', sae: '15W-40', kemasan: '5L', kategori: 'Diesel', harga: 290000, stokKarton: 110, stokLiter: 550 },
  { id: 'PRD-007', brand: 'Kixx', name: 'Kixx PAO 5W-40', sae: '5W-40', kemasan: '4L', kategori: 'Fully Synthetic', harga: 480000, stokKarton: 65, stokLiter: 260 },
  { id: 'PRD-008', brand: 'Petronas', name: 'Syntium 3000 5W-40', sae: '5W-40', kemasan: '4L', kategori: 'Semi Synthetic', harga: 450000, stokKarton: 90, stokLiter: 360 },
];

const INITIAL_STOCK_HISTORY = [
  { id: 'TRX-260511-01', date: '11 Mei 2026 14:30', type: 'out', product: 'Kixx G1 5W-30', qty: 15, ref: 'DO-20260511-001 (Berkah Sekawan Motor)', balance: 105 },
  { id: 'TRX-260511-02', date: '11 Mei 2026 10:15', type: 'in', product: 'Kixx G1 5W-30', qty: 50, ref: 'RCV-20260511-02 (PT. ABM)', balance: 120 },
  { id: 'TRX-260510-15', date: '10 Mei 2026 16:00', type: 'out', product: 'Syntium 7000 0W-20', qty: 25, ref: 'DO-20260510-015 (Mandiri Service)', balance: 80 },
  { id: 'TRX-260510-10', date: '10 Mei 2026 13:20', type: 'out', product: 'Urania 3000 15W-40', qty: 12, ref: 'DO-20260510-010 (Abadi Motor)', balance: 110 },
  { id: 'TRX-260509-05', date: '09 Mei 2026 09:45', type: 'in', product: 'Syntium 7000 0W-20', qty: 100, ref: 'RCV-20260509-05 (PT. PLI)', balance: 105 },
];

// Initialize mock DB
export const initDb = () => {
  if (!localStorage.getItem('gana_customers')) {
    localStorage.setItem('gana_customers', JSON.stringify(INITIAL_CUSTOMERS));
  }
  if (!localStorage.getItem('gana_orders')) {
    localStorage.setItem('gana_orders', JSON.stringify(INITIAL_ORDERS));
  }
  if (!localStorage.getItem('gana_incoming_stock')) {
    localStorage.setItem('gana_incoming_stock', JSON.stringify(INITIAL_INCOMING_STOCK));
  }
  if (!localStorage.getItem('gana_products')) {
    localStorage.setItem('gana_products', JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem('gana_stock_history')) {
    localStorage.setItem('gana_stock_history', JSON.stringify(INITIAL_STOCK_HISTORY));
  }
};

export const resetDb = () => {
  localStorage.removeItem('gana_customers');
  localStorage.removeItem('gana_orders');
  localStorage.removeItem('gana_incoming_stock');
  localStorage.removeItem('gana_products');
  localStorage.removeItem('gana_stock_history');
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
      return { ...s, status: newStatus };
    }
    return s;
  });
  saveIncomingStock(updated);
};

// Initialize DB on script load
initDb();
