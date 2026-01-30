#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const GALLERY_DIR = path.join(__dirname, '../public/images/gallery');
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const QUALITY = 85;

// Image extensions to process
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Track statistics
let stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  originalSize: 0,
  optimizedSize: 0
};

async function getFileSize(filePath) {
  const stats = await fs.promises.stat(filePath);
  return stats.size;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  if (!IMAGE_EXTENSIONS.includes(ext)) {
    return;
  }

  try {
    const originalSize = await getFileSize(filePath);
    stats.originalSize += originalSize;

    // Read the image
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Skip if already optimized (small file size and reasonable dimensions)
    if (originalSize < 100000 && metadata.width <= MAX_WIDTH && metadata.height <= MAX_HEIGHT) {
      console.log(`⏭️  Skipping ${path.basename(filePath)} (already optimized)`);
      stats.skipped++;
      stats.optimizedSize += originalSize;
      return;
    }

    // Create a temporary file
    const tempPath = filePath + '.tmp';

    // Optimize the image
    let pipeline = image;

    // Resize if needed
    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      pipeline = pipeline.resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Convert to WebP for better compression, or optimize in original format
    if (ext === '.webp') {
      await pipeline
        .webp({ quality: QUALITY })
        .toFile(tempPath);
    } else if (ext === '.png') {
      await pipeline
        .png({ quality: QUALITY, compressionLevel: 9 })
        .toFile(tempPath);
    } else {
      await pipeline
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(tempPath);
    }

    const optimizedSize = await getFileSize(tempPath);
    stats.optimizedSize += optimizedSize;

    // Only replace if the optimized version is smaller
    if (optimizedSize < originalSize) {
      await fs.promises.rename(tempPath, filePath);
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      console.log(`✅ Optimized ${path.basename(filePath)} (${savings}% smaller)`);
      stats.processed++;
    } else {
      await fs.promises.unlink(tempPath);
      console.log(`⏭️  Skipping ${path.basename(filePath)} (optimization didn't reduce size)`);
      stats.skipped++;
      stats.optimizedSize += originalSize - optimizedSize; // Adjust stats
    }

  } catch (error) {
    console.error(`❌ Error optimizing ${path.basename(filePath)}:`, error.message);
    stats.errors++;
  }
}

async function processDirectory(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      await optimizeImage(fullPath);
    }
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');
  console.log(`📁 Gallery directory: ${GALLERY_DIR}\n`);

  if (!fs.existsSync(GALLERY_DIR)) {
    console.error('❌ Gallery directory not found!');
    process.exit(1);
  }

  const startTime = Date.now();

  await processDirectory(GALLERY_DIR);

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log('\n' + '='.repeat(50));
  console.log('📊 Optimization Summary:');
  console.log('='.repeat(50));
  console.log(`✅ Processed: ${stats.processed} images`);
  console.log(`⏭️  Skipped: ${stats.skipped} images`);
  console.log(`❌ Errors: ${stats.errors} images`);
  console.log(`📦 Original size: ${(stats.originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 Optimized size: ${(stats.optimizedSize / 1024 / 1024).toFixed(2)} MB`);
  
  if (stats.originalSize > 0) {
    const totalSavings = ((stats.originalSize - stats.optimizedSize) / stats.originalSize * 100).toFixed(1);
    const savedMB = ((stats.originalSize - stats.optimizedSize) / 1024 / 1024).toFixed(2);
    console.log(`💾 Total savings: ${savedMB} MB (${totalSavings}%)`);
  }
  
  console.log(`⏱️  Time taken: ${duration}s`);
  console.log('='.repeat(50));
}

main().catch(console.error);
