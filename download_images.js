// Download images from Google Sites to local folder
const https = require('https');
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('data/portfolio.json', 'utf8'));
const imageDir = 'images';

// Create images directory
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(imageDir, filename));
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => { fs.unlink(path.join(imageDir, filename), () => {}); reject(err); });
  });
}

async function downloadAll() {
  let count = 0;
  
  for (const type of ['renovation', 'maintenance']) {
    for (const caseItem of (data[type] || [])) {
      const allImages = [
        ...(caseItem.before_images || []),
        ...(caseItem.after_images || []),
        ...(caseItem.images || [])
      ];
      
      // Deduplicate by URL
      const uniqueUrls = [...new Set(allImages.map(img => img.url || img))];
      
      for (const img of uniqueUrls) {
        if (!img || img.startsWith('images/')) continue;
        
        const ext = '.jpg';
        const filename = `${caseItem.id}_${count}${ext}`;
        const localPath = `images/${filename}`;
        
        try {
          console.log(`Downloading: ${filename}`);
          await downloadImage(img, filename);
          
          // Replace URL in all arrays
          const replaceUrl = (arr) => {
            if (!arr) return;
            for (let i = 0; i < arr.length; i++) {
              if (typeof arr[i] === 'string' && arr[i] === img) {
                arr[i] = localPath;
              } else if (arr[i] && arr[i].url === img) {
                arr[i].url = localPath;
              }
            }
          };
          
          replaceUrl(caseItem.before_images);
          replaceUrl(caseItem.after_images);
          replaceUrl(caseItem.images);
          
          count++;
        } catch (err) {
          console.error(`Failed: ${filename}`, err.message);
        }
      }
    }
  }
  
  // Save updated JSON
  fs.writeFileSync('data/portfolio.json', JSON.stringify(data, null, 2));
  console.log(`\nDone! Downloaded ${count} images.`);
}

downloadAll().catch(console.error);
