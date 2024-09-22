import express, { Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import cors from 'cors';

const app = express();
app.use(cors());
const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage to access buffer directly

app.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
  const { format, brightness, saturation, grayscale, rotation } = req.body;

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    let image = sharp(req.file.buffer);

    // Apply image modifications without resizing
    image = image.modulate({
      brightness: parseFloat(brightness) || 1,
      saturation: parseFloat(saturation) || 1,
    });

    if (grayscale === 'true') {
      image = image.grayscale();
    }

    image = image.rotate(parseInt(rotation, 10) || 0);

    let buffer;

    switch (format) {
      case 'jpeg':
        buffer = await image.toFormat('jpeg', { quality: 85 }).toBuffer(); // Adjust quality as needed
        break;
      case 'png':
        // Strip metadata, use a lower compression level, and limit color depth
        buffer = await image
          .toFormat('png', { compressionLevel: 9, palette: true }) // Adjust compression level and use palette
          .toBuffer();
        break;
      case 'webp':
        buffer = await image.toFormat('webp', { quality: 85 }).toBuffer(); // Adjust quality as needed
        break;
      case 'tiff':
        buffer = await image.toFormat('tiff', { compression: 'lzw' }).toBuffer(); // TIFF is typically lossless
        break;
      case 'gif':
        buffer = await image.toFormat('gif').toBuffer(); // GIF is typically large due to frame count
        break;
      default:
        return res.status(400).send('Unsupported format');
    }

    res.type(`image/${format}`);
    res.send(buffer);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).send('Error processing image');
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Server is running on port 4000</h1>');
});
// Start server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
