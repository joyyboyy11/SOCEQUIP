document.getElementById('year').textContent = new Date().getFullYear();

  // Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  // Ticker content (real project figures), duplicated for seamless loop
  const tickerData = [
    ['450+', 'systèmes solaires en Casamance'],
    ['27 / 14', 'centrales solaires sécurisées, 14 régions'],
    ['56', 'villages électrifiés en solaire (ASER)'],
    ['8 421 ml', 'de réseau MT — Ndiassane Saloum'],
    ['R+11', 'immeuble SCI Immobilière, Dakar'],
    ['26', 'villages raccordés au Lac de Guiers'],
    ['10 kWc', 'centrale solaire — village de Sabodola'],
    ['900', 'paires de câble tirées — Sonatel Médina'],
    ['300', 'systèmes PV — CR de Wack Ngouna'],
  ];
  const track = document.getElementById('ticker');
  const buildItems = () => tickerData.map(([num, label]) =>
    `<div class="ticker-item"><span class="dot"></span><b>${num}</b>${label}</div>`
  ).join('');
  track.innerHTML = buildItems() + buildItems();
