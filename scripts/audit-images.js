const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const CSV_PATH = 'scraper_data/safelincs_final_data/COMPLETE_CATALOG.csv';
const IMAGES_DIR = 'scraper_data/safelincs_final_data';

let filesInDir = [];
try {
  if (fs.existsSync(IMAGES_DIR)) {
    filesInDir = fs.readdirSync(IMAGES_DIR).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
  }
} catch (e) {
  console.error(e);
}

const usedImages = new Set();

function findBestMatch(targetFilename) {
  if (!targetFilename) return null;
  
  if (filesInDir.includes(targetFilename)) return targetFilename;

  const targetBase = path.parse(targetFilename).name;
  const targetExt = path.parse(targetFilename).ext;
  const targetNormalized = targetFilename.toLowerCase().replace(/\s+/g, ' ').trim();

  const looseMatch = filesInDir.find(f => 
    f.toLowerCase().replace(/\s+/g, ' ').trim() === targetNormalized
  );
  if (looseMatch) return looseMatch;

  const truncationMatch = filesInDir.find(f => {
    const fBase = path.parse(f).name;
    const fExt = path.parse(f).ext;
    if (fExt && fExt.toLowerCase() !== targetExt.toLowerCase()) return false;
    if (fBase.length < 5) return false;
    return targetBase.toLowerCase().startsWith(fBase.toLowerCase());
  });

  if (truncationMatch) return truncationMatch;

  return null;
}

const csvRows = [];

fs.createReadStream(CSV_PATH)
  .pipe(csv())
  .on('data', (data) => csvRows.push(data))
  .on('end', () => {
    console.log(`Analyzing ${csvRows.length} CSV rows and ${filesInDir.length} image files...`);

    csvRows.forEach(row => {
        const imageFile = row['Image File'];
        if (imageFile) {
            const match = findBestMatch(imageFile);
            if (match) {
                usedImages.add(match);
            }
        }
    });

    const unusedImages = filesInDir.filter(f => !usedImages.has(f));
    
    console.log(`\nUsed Images: ${usedImages.size}`);
    console.log(`Unused Images: ${unusedImages.length}`);
    
    if (unusedImages.length > 0) {
        console.log('\nTop 20 Unused Images:');
        unusedImages.slice(0, 20).forEach(f => console.log(f));
        
        const logPath = 'unused_images.txt';
        fs.writeFileSync(logPath, unusedImages.join('\n'));
        console.log(`\nFull list written to ${logPath}`);
    } else {
        console.log('\nAll images in the directory are matched to a product!');
    }
  });
