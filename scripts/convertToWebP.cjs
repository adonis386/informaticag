const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function convertImages() {
    const srcDir = path.join(__dirname, '..', 'public', 'assets');
    
    // Buscar todos los archivos de imagen
    const files = await fs.readdir(srcDir, { recursive: true });
    
    for (const file of files) {
        const filePath = path.join(srcDir, file);
        const ext = path.extname(file).toLowerCase();
        
        // Solo procesar archivos de imagen
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
            try {
                // Crear la versión WebP en el mismo directorio
                const webpPath = filePath.replace(ext, '.webp');
                await sharp(filePath)
                    .webp({ quality: 80 })
                    .toFile(webpPath);
                
                console.log(`Converted ${file} to WebP and saved in public/assets`);
            } catch (error) {
                console.error(`Error converting ${file}:`, error);
            }
        }
    }
}

convertImages().catch(console.error);
