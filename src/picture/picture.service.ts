import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class PictureService {
  private readonly client: S3Client;
  private readonly bucket = process.env.R2_BUCKET!;
  private readonly publicBaseUrl = process.env.R2_PUBLIC_URL!;

  constructor() {
    this.client = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY!,
        secretAccessKey: process.env.R2_SECRET_KEY!,
      },
    });
  }

  async saveFileAndReturnUuid(
    picture: Express.Multer.File,
    extension: string,
  ): Promise<string> {
    const keyName = `${uuidv4()}.${extension}`;

    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: keyName,
          Body: picture.buffer,
          ContentType: picture.mimetype,
        }),
      );

      return `${this.publicBaseUrl}/${keyName}`;
    } catch (e) {
      console.error(`R2 upload failed:`, e);
      return '';
    }
  }
}