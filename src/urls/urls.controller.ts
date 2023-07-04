import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req,
  Res,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { MainInterceptor } from 'src/interpreter/main.interseptor';
import { Response } from 'express';
@Controller('')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  @UseInterceptors(MainInterceptor)
  create(
    @Body() createUrlDto: CreateUrlDto,
    @Req() req: any,
    @Res() res: Response,
  ) {
    return this.urlsService.create(createUrlDto, req.url, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    console.log(id);
    return this.urlsService.findOne(id, res);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
  //   return this.urlsService.update(+id, updateUrlDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.urlsService.remove(+id);
  // }
}
