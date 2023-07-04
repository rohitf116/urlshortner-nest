import {
  Injectable,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { Model, Connection, Types } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from './model/url.model';
import { RandomStringService } from './utils/randomString.util';
import { Response } from 'express';
@Injectable()
export class UrlsService {
  constructor(
    @InjectModel(Url.name) private urlModel: Model<Url>,
    @InjectConnection() private connection: Connection,
    private randomStringService: RandomStringService,
  ) {}
  async create(createUrlDto: CreateUrlDto, url: string, res: Response) {
    const foundUrl = await this.urlModel.findOne({
      longUrl: createUrlDto.longUrl,
    });
    if (foundUrl) {
      return res.status(HttpStatus.OK).json(foundUrl);
    }
    const urlCode = this.randomStringService.generateRandomString(6);
    const shortUrl = `${url}/${urlCode}`;
    const newUrl = await this.urlModel.create({
      ...createUrlDto,
      urlCode,
      shortUrl,
    });
    if (!newUrl) {
      throw new HttpException(
        'Failed to create URL',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      data: newUrl,
    };
  }

  findAll() {
    return `This action returns all urls`;
  }

  async findOne(id: string, res: Response) {
    const url = await this.urlModel.findOne({ urlCode: id });
    if (!url) {
      throw new NotFoundException('Url not found');
    }
    res.redirect(url.longUrl);
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
