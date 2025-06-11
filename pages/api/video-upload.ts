import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ error: 'Form parsing failed' });
    }

    try {
      const file: any = Array.isArray(files.file) ? files.file[0] : files.file;
      const title = String(fields.title || '');
      const description = String(fields.description || '');
      const originalSize = String(file?.size || 0);

      if (!file?.filepath) {
        return res.status(400).json({ error: 'Video file missing' });
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'video-uploads',
          eager: [
            { width: 1280, height: 720, crop: 'pad' } // optional preview/transformed version
          ],
          eager_async: true,
        },
        async (error, result) => {
          if (error || !result) {
            console.error('Cloudinary error:', error);
            return res.status(500).json({ error: 'Cloudinary upload failed' });
          }

          const video = await prisma.video.create({
            data: {
              title,
              description,
              publicId: result.public_id,
              originalSize,
              compressedSize: String(result.bytes),
              duration: String(result.duration || 0),
            },
          });

          return res.status(200).json(video);
        }
      );

      fs.createReadStream(file.filepath).pipe(uploadStream);
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Upload failed' });
    }
  });
}
