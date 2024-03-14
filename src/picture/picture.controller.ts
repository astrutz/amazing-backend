import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PictureService } from './picture.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('picture')
export class PictureController {
  constructor(
    private readonly _pictureService: PictureService,
  ) {
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this._pictureService.saveFileAndReturnUuid(file, file.originalname.split('.')[1]);
  }
}
