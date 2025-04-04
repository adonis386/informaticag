const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const inputDir = path.join(__dirname, '..', 'public', 'assets');
const outputDir = path.join(__dirname, '..', 'public', 'assets');

async function convertImages() {
  try {
    const files = await fs.readdir(inputDir);
    
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png|PNG)$/)) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);
        
        try {
          await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath);
          console.log(`Converted ${file} to WebP and saved in public/assets`);
        } catch (error) {
          console.error(`Error converting ${file}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}

convertImages().catch(console.error);
