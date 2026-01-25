/**
 * Image Optimization Script for JBH Website
 * Converts all JPG/PNG images to optimized WebP format
 * 
 * Usage: node optimize-images.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, 'public', 'images');
const WEBP_QUALITY = 80;
const JPEG_QUALITY = 85;
const PNG_QUALITY = 85;

// Statistics
let stats = {
  processed: 0,
  originalSize: 0,
  optimizedSize: 0,
  errors: 0
};

/**
 * Get all image files recursively
 */
function getImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip optimized directory
      if (file !== 'optimized') {
        getImageFiles(filePath, fileList);
      }
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Get file size in KB
 */
function getFileSizeKB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const dir = path.dirname(inputPath);
    const basename = path.basename(inputPath, ext);
    
    // Output paths
    const webpPath = path.join(dir, `${basename}.webp`);
    const optimizedPath = path.join(dir, `${basename}${ext}`);

    // Get original size
    const originalSize = getFileSizeKB(inputPath);
    stats.originalSize += parseFloat(originalSize);

    // Convert to WebP
    await sharp(inputPath)
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpPath);

    const webpSize = getFileSizeKB(webpPath);
    stats.optimizedSize += parseFloat(webpSize);
    

    // Also create optimized original format as fallback
    if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(inputPath)
        .jpeg({ quality: JPEG_QUALITY, progressive: true })
        .toFile(optimizedPath + '.tmp');
      
      // Replace original
      fs.renameSync(optimizedPath + '.tmp', optimizedPath);
    } else if (ext === '.png') {
      await sharp(inputPath)
        .png({ quality: PNG_QUALITY, compressionLevel: 9 })
        .toFile(optimizedPath + '.tmp');
      
      // Replace original
      fs.renameSync(optimizedPath + '.tmp', optimizedPath);
    }

    stats.processed++;
  } catch (error) {
    console.error(`   ❌ Error processing ${inputPath}:`, error.message);
    stats.errors++;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    await import('sharp');
  } catch {
    process.exit(1);
  }

  const images = getImageFiles(INPUT_DIR);
  
  if (images.length === 0) {
    return;
  }

  for (const imagePath of images) {
    await optimizeImage(imagePath);
  }
    
}

// Run the script
main().catch(console.error);
