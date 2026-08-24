// Convert image URLs from strings to objects with url and caption
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/portfolio.json', 'utf8'));

function convertImages(arr) {
  if (!arr) return [];
  return arr.map(item => {
    if (typeof item === 'string') {
      return { url: item, caption: '' };
    }
    return item; // already an object
  });
}

// Convert all cases
['renovation', 'maintenance'].forEach(type => {
  if (data[type]) {
    data[type].forEach(caseItem => {
      caseItem.images = convertImages(caseItem.images);
      caseItem.before_images = convertImages(caseItem.before_images);
      caseItem.after_images = convertImages(caseItem.after_images);
    });
  }
});

fs.writeFileSync('data/portfolio.json', JSON.stringify(data, null, 2));
console.log('Conversion complete!');
