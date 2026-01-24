#!/bin/bash

# Image Optimization Script for JBH Website
# This script optimizes all images in the public directory

echo "🖼️  Starting image optimization..."
echo ""

# Check if sharp-cli is installed
if ! command -v sharp &> /dev/null; then
    echo "📦 Installing sharp-cli for image optimization..."
    npm install -g sharp-cli
fi

# Create optimized directory
mkdir -p public/images/optimized

# Function to optimize images
optimize_images() {
    local input_dir=$1
    local output_dir=$2
    
    echo "Processing: $input_dir"
    
    # Find all images and optimize them
    find "$input_dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
        # Get relative path
        rel_path="${file#$input_dir/}"
        output_file="$output_dir/$rel_path"
        
        # Create output directory if it doesn't exist
        mkdir -p "$(dirname "$output_file")"
        
        # Get file extension
        ext="${file##*.}"
        ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
        
        # Convert to WebP with optimization
        webp_file="${output_file%.*}.webp"
        
        echo "  ✓ Optimizing: $rel_path"
        
        # Convert to WebP (80% quality, good balance)
        if [ "$ext_lower" = "png" ]; then
            # PNG to WebP (lossless for transparency)
            sharp -i "$file" -o "$webp_file" --webp '{"quality":90,"lossless":false}'
        else
            # JPG to WebP
            sharp -i "$file" -o "$webp_file" --webp '{"quality":80}'
        fi
        
        # Also create optimized original format as fallback
        if [ "$ext_lower" = "jpg" ] || [ "$ext_lower" = "jpeg" ]; then
            sharp -i "$file" -o "$output_file" --jpeg '{"quality":85,"progressive":true}'
        elif [ "$ext_lower" = "png" ]; then
            sharp -i "$file" -o "$output_file" --png '{"quality":85,"compressionLevel":9}'
        fi
    done
}

# Optimize images in public directory
echo "🔄 Optimizing images..."
optimize_images "public/images" "public/images/optimized"

echo ""
echo "✅ Image optimization complete!"
echo ""
echo "📊 Size comparison:"
original_size=$(du -sh public/images | cut -f1)
optimized_size=$(du -sh public/images/optimized 2>/dev/null | cut -f1 || echo "0")
echo "  Original: $original_size"
echo "  Optimized: $optimized_size"
echo ""
echo "💡 Next steps:"
echo "  1. Review optimized images in public/images/optimized/"
echo "  2. Update image paths in your components to use WebP format"
echo "  3. Keep original images as fallback for older browsers"
