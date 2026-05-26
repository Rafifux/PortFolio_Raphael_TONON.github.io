const data = [
  { date: '2026-05-01', day: 'Samedi', hc: 4.2, hp: 6.1, temp: 15.4, tempApp: 13.7, rain: '1.2 mm' },
  { date: '2026-05-02', day: 'Dimanche', hc: 4.0, hp: 6.0, temp: 14.8, tempApp: 12.8, rain: '0.8 mm' },
  { date: '2026-05-03', day: 'Lundi', hc: 4.8, hp: 6.4, temp: 16.2, tempApp: 14.6, rain: '0.0 mm' },
  { date: '2026-05-04', day: 'Mardi', hc: 5.1, hp: 6.9, temp: 17.3, tempApp: 15.2, rain: '0.0 mm' },
  { date: '2026-05-05', day: 'Mercredi', hc: 4.6, hp: 6.8, temp: 18.0, tempApp: 15.9, rain: '0.0 mm' },
  { date: '2026-05-06', day: 'Jeudi', hc: 4.4, hp: 6.2, temp: 17.1, tempApp: 14.8, rain: '0.3 mm' },
  { date: '2026-05-07', day: 'Vendredi', hc: 5.3, hp: 7.1, temp: 19.2, tempApp: 16.5, rain: '0.0 mm' },
  { date: '2026-05-08', day: 'Samedi', hc: 4.7, hp: 6.6, temp: 18.5, tempApp: 16.1, rain: '2.1 mm' },
  { date: '2026-05-09', day: 'Dimanche', hc: 4.5, hp: 6.3, temp: 17.7, tempApp: 15.8, rain: '0.5 mm' },
  { date: '2026-05-10', day: 'Lundi', hc: 4.9, hp: 6.7, temp: 18.9, tempApp: 16.2, rain: '0.0 mm' }
];

const tableBody = document.getElementById('dataTableBody');
const filterButton = document.getElementById('filterButton');
const resetButton = document.getElementById('resetButton');
const startDateInput = document.getElementById('dateStart');
const endDateInput = document.getElementById('dateEnd');

function renderTable(rows) {
  tableBody.innerHTML = rows
    .map(row => `
      <tr>
        <td>${formatDate(row.date)}</td>
        <td>${row.day}</td>
        <td>${row.hc}</td>
        <td>${row.hp}</td>
        <td>${row.temp} °C</td>
        <td>${row.tempApp} °C</td>
        <td>${row.rain}</td>
      </tr>
    `)
    .join('');
}

function formatDate(value) {
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}

function getCurrentLabels() {
  return data.map(item => formatDate(item.date));
}

function getDataset(key) {
  return data.map(item => item[key]);
}

function createCharts() {
  const dailyCtx = document.getElementById('dailyChart').getContext('2d');
  const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');
  const priceCtx = document.getElementById('priceChart').getContext('2d');

  const dailyChart = new Chart(dailyCtx, {
    type: 'line',
    data: {
      labels: getCurrentLabels(),
      datasets: [
        { label: 'Heure Creuse (kWh)', data: getDataset('hc'), borderColor: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.18)', tension: 0.3 },
        { label: 'Heure Pleine (kWh)', data: getDataset('hp'), borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.18)', tension: 0.3 },
        { label: 'Temp. Apparente (°C)', data: getDataset('tempApp'), borderColor: '#60a5fa', backgroundColor: 'rgba(96, 165, 250, 0.18)', tension: 0.3, yAxisID: 'y1' }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'kWh' } },
        y1: { position: 'right', beginAtZero: true, grid: { drawOnChartArea: false }, title: { display: true, text: '°C' } }
      },
      plugins: { annotation: { annotations: {} } }
    }
  });

  new Chart(monthlyCtx, {
    type: 'bar',
    data: {
      labels: ['Mai 2026'],
      datasets: [
        { label: 'Total HC (kWh)', data: [data.reduce((sum, row) => sum + row.hc, 0).toFixed(1)], backgroundColor: '#fbbf24' },
        { label: 'Total HP (kWh)', data: [data.reduce((sum, row) => sum + row.hp, 0).toFixed(1)], backgroundColor: '#ef4444' }
      ]
    },
    options: { responsive: true, scales: { y: { beginAtZero: true, title: { display: true, text: 'kWh' } } }, plugins: { tooltip: { mode: 'index', intersect: false } } }
  });

  new Chart(priceCtx, {
    type: 'line',
    data: {
      labels: getCurrentLabels(),
      datasets: [
        { label: 'Prix HC (€)', data: data.map(row => (row.hc * 0.18).toFixed(2)), borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.2)', tension: 0.3 },
        { label: 'Prix HP (€)', data: data.map(row => (row.hp * 0.24).toFixed(2)), borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.2)', tension: 0.3 }
      ]
    },
    options: { responsive: true, scales: { y: { beginAtZero: true, title: { display: true, text: '€' } } } }
  });
}

function filterData() {
  const start = startDateInput.value;
  const end = endDateInput.value;

  let filtered = data;
  if (start) filtered = filtered.filter(item => item.date >= start);
  if (end) filtered = filtered.filter(item => item.date <= end);

  renderTable(filtered);
}

filterButton.addEventListener('click', filterData);
resetButton.addEventListener('click', () => {
  startDateInput.value = '';
  endDateInput.value = '';
  renderTable(data);
});

renderTable(data);
createCharts();
