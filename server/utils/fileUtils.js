import fs from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads/channelsChat');

export const deleteMessageImages = async (imageUrls) => {
    try {
        if (!imageUrls || !Array.isArray(imageUrls)) {
            throw new Error("Invalid image URLs provided.");
        }

        const deletePromises = imageUrls.map(async (imageUrl) => {
            try {
                const filename = path.basename(imageUrl); // Fix the typo
                const filePath = path.join(UPLOAD_DIR, filename);
                await fs.unlink(filePath);
            } catch (err) {
                console.error(`Failed to delete file: ${err.message}`);
            }
        });

        await Promise.all(deletePromises);
    } catch (error) {
        console.error(`Error in deleteMessageImages: ${error.message}`);
    }
};
