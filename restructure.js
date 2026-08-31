const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/portfolio.json', 'utf8'));

// Extract shop cases from renovation
const shopCases = [];
const renovationCases = [];

data.renovation.forEach(item => {
  if (item.type === '商舖翻新' || item.type === '商舖裝修' || item.id.includes('商舖') || item.title.includes('商舖')) {
    shopCases.push(item);
  } else {
    renovationCases.push(item);
  }
});

// Restructure
data.renovation = renovationCases;
data.shop = shopCases;

// Write back
fs.writeFileSync('data/portfolio.json', JSON.stringify(data, null, 2));
console.log(`Renovation: ${data.renovation.length} cases`);
console.log(`Shop: ${data.shop.length} cases`);
console.log(`Maintenance: ${data.maintenance.length} cases`);
