import { Injectable } from '@nestjs/common';
import * as process from 'process';
import { v4 as uuidv4 } from 'uuid';

let AWS = require('aws-sdk');

@Injectable()
export class PictureService {
  constructor() {
  }

  async saveFileAndReturnUuid(picture: Express.Multer.File, extension: string): Promise<string> {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    });
    const s3 = new AWS.S3();
    const keyName = uuidv4();
    const params = { Bucket: process.env.BUCKET_KEY, Key: `${keyName}.${extension}`, Body: picture.buffer };
    try {
      const response = await s3.upload(params).promise();
      return `${keyName}.${extension}`;
    } catch (e) {
      console.log(e);
      return '';
    }
  }

}