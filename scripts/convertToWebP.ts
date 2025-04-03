import sharp from 'sharp';
import { promises as fs } from 'fs';
import { join } from 'path';

async function convertImages() {
    const srcDir = join(process.cwd(), 'src');
    
    // Buscar todos los archivos de imagen
    const files = await fs.readdir(srcDir, { recursive: true });
    
    for (const file of files) {
        const filePath = join(srcDir, file);
        const ext = file.substring(file.lastIndexOf('.') + 1).toLowerCase();
        
        // Solo procesar archivos de imagen
        if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
            try {
                // Crear la versión WebP
                const webpPath = filePath.replace(`.${ext}`, '.webp');
                await sharp(filePath)
                    .webp({ quality: 80 })
                    .toFile(webpPath);
                
                console.log(`Converted ${file} to WebP`);
            } catch (error) {
                console.error(`Error converting ${file}:`, error);
            }
        }
    }
}

convertImages().catch(console.error);
