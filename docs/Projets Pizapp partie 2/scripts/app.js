const orders = [
  {
    id: 101,
    date: '2026-05-24 18:12',
    customer: 'jordan45',
    amount: '45.20 €',
    statusId: 1,
    statusLabel: 'En attente',
    lines: [
      { productId: 23, productName: 'Pizza Margherita', quantity: 2, totalHt: '18.00 €' },
      { productId: 14, productName: 'Coca-Cola 33cl', quantity: 2, totalHt: '4.00 €' }
    ]
  },
  {
    id: 102,
    date: '2026-05-24 17:55',
    customer: 'marine.dup',
    amount: '29.50 €',
    statusId: 4,
    statusLabel: 'En préparation',
    lines: [
      { productId: 3, productName: 'Pizza Reine', quantity: 1, totalHt: '12.00 €' },
      { productId: 8, productName: 'Frites', quantity: 1, totalHt: '4.50 €' },
      { productId: 9, productName: 'Orangina', quantity: 1, totalHt: '3.00 €' }
    ]
  },
  {
    id: 103,
    date: '2026-05-24 17:20',
    customer: 'kylian2002',
    amount: '77.80 €',
    statusId: 2,
    statusLabel: 'Prête',
    lines: [
      { productId: 1, productName: 'Pizza 4 fromages', quantity: 2, totalHt: '24.00 €' },
      { productId: 17, productName: 'Salade verte', quantity: 1, totalHt: '4.50 €' },
      { productId: 5, productName: 'Tiramisu', quantity: 1, totalHt: '4.30 €' }
    ]
  }
];

const statusMap = {
  1: 'En attente',
  4: 'En préparation',
  5: 'Refusée',
  6: 'Acceptée',
  7: 'Prête'
};

const ordersTableBody = document.querySelector('#ordersTable tbody');
const openDetailsButton = document.getElementById('openDetailsButton');
const refreshButton = document.getElementById('refreshButton');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const detailOrderId = document.getElementById('detailOrderId');
const detailDate = document.getElementById('detailDate');
const detailClient = document.getElementById('detailClient');
const detailAmount = document.getElementById('detailAmount');
const detailStatus = document.getElementById('detailStatus');
const linesTableBody = document.querySelector('#linesTable tbody');
const acceptButton = document.getElementById('acceptButton');
const refuseButton = document.getElementById('refuseButton');
const readyButton = document.getElementById('readyButton');
const detailRefreshButton = document.getElementById('detailRefreshButton');
const modalTitle = document.getElementById('modalTitle');

let currentOrderId = null;

function formatStatus(statusId) {
  return statusMap[statusId] || 'Inconnu';
}

function renderOrders() {
  ordersTableBody.innerHTML = '';
  orders.forEach(order => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td><input type="checkbox" data-order-id="${order.id}" /></td>
      <td>${order.id}</td>
      <td>${order.date}</td>
      <td>${order.customer}</td>
      <td>${order.amount}</td>
      <td>${formatStatus(order.statusId)}</td>
    `;

    ordersTableBody.appendChild(row);
  });
}

function getSelectedOrderIds() {
  return Array.from(document.querySelectorAll('#ordersTable tbody input[type=checkbox]'))
    .filter(input => input.checked)
    .map(input => Number(input.dataset.orderId));
}

function findOrder(orderId) {
  return orders.find(order => order.id === orderId) || null;
}

function openOrderDetails(order) {
  currentOrderId = order.id;
  modalTitle.textContent = `Commande #${order.id}`;
  detailOrderId.textContent = order.id;
  detailDate.textContent = order.date;
  detailClient.textContent = order.customer;
  detailAmount.textContent = order.amount;
  detailStatus.textContent = `${formatStatus(order.statusId)} (${order.statusId})`;
  renderLines(order.lines);
  modal.classList.remove('hidden');
}

function renderLines(lines) {
  linesTableBody.innerHTML = '';
  lines.forEach(line => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${line.productId}</td>
      <td>${line.productName}</td>
      <td>${line.quantity}</td>
      <td>${line.totalHt}</td>
    `;
    linesTableBody.appendChild(row);
  });
}

function updateOrderStatus(orderId, statusId, successMessage) {
  const order = findOrder(orderId);
  if (!order) {
    alert('Commande introuvable.');
    return;
  }
  order.statusId = statusId;
  order.statusLabel = formatStatus(statusId);
  renderOrders();
  if (currentOrderId === orderId) {
    openOrderDetails(order);
  }
  alert(successMessage);
}

openDetailsButton.addEventListener('click', () => {
  const selectedIds = getSelectedOrderIds();
  if (selectedIds.length === 0) {
    alert('Cochez au moins une commande pour ouvrir les détails.');
    return;
  }

  selectedIds.forEach(orderId => {
    const order = findOrder(orderId);
    if (order) {
      openOrderDetails(order);
    }
  });
});

refreshButton.addEventListener('click', () => {
  renderOrders();
  alert('Données rechargées (statique).');
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

acceptButton.addEventListener('click', () => {
  if (currentOrderId !== null) {
    updateOrderStatus(currentOrderId, 6, 'Commande acceptée.');
  }
});

refuseButton.addEventListener('click', () => {
  if (currentOrderId !== null) {
    updateOrderStatus(currentOrderId, 5, 'Commande refusée.');
  }
});

readyButton.addEventListener('click', () => {
  if (currentOrderId !== null) {
    updateOrderStatus(currentOrderId, 7, 'Commande marquée prête.');
  }
});

detailRefreshButton.addEventListener('click', () => {
  const order = findOrder(currentOrderId);
  if (order) {
    openOrderDetails(order);
    alert('Détails actualisés.');
  }
});

window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
  }
});

renderOrders();
