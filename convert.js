import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

async function convertImages() {
  const files = fs.readdirSync(publicDir);
  
  for (const file of files) {
    if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.png')) {
      const ext = path.extname(file);
      const name = path.basename(file, ext);
      const inputPath = path.join(publicDir, file);
      const outputPath = path.join(publicDir, `${name}.webp`);
      
      console.log(`Converting ${file} to WebP...`);
      try {
        await sharp(inputPath)
          .webp({ quality: 75 })
          .toFile(outputPath);
          
        // Borrar el archivo original despues de la conversion exitosa
        fs.unlinkSync(inputPath);
        console.log(`Deleted original: ${file}`);
      } catch (error) {
        console.error(`Error converting ${file}:`, error);
      }
    }
  }
  console.log('¡Conversión completada!');
}

convertImages();
