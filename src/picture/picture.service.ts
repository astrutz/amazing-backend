import { Injectable } from '@nestjs/common';
import * as process from 'process';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class PictureService {
  constructor() {
  }

  async saveFileAndReturnUuid(picture: Express.Multer.File, extension: string): Promise<string> {
    const keyName = uuidv4();
    try {
      const base64Image = picture.buffer.toString('base64');
      const formData = new FormData();
      formData.append( "image", base64Image );
      const response = await axios.post(`${process.env.IMGBB_API_URL}?key=${process.env.IMGBB_API_KEY}&name=${keyName}.${extension}`, formData);
      return response.data.data.image.url;
    } catch (e) {
      console.log(e);
      return '';
    }
  }

}