import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { Model, Connection, Types } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from './model/url.model';
import { RandomStringService } from './utils/randomString.util';

@Injectable()
export class UrlsService {
  constructor(
    @InjectModel(Url.name) private userModel: Model<Url>,
    @InjectConnection() private connection: Connection,
    private randomStringService: RandomStringService,
  ) {}
  async create(createUrlDto: CreateUrlDto) {}

  findAll() {
    return `This action returns all urls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
