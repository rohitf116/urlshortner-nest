import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { ConflictException } from '@nestjs/common';

export type UrlDocument = Url & Document;
export type UrlModel = Model<UrlDocument>;

@Schema({ timestamps: true })
export class Url {
  @Prop()
  urlCode: string;

  @Prop({ unique: true })
  longUrl: string;

  @Prop()
  shortUrl: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);

UrlSchema.pre('save', async function (next) {
  const model = this.constructor as UrlModel;
  const existingUrl = await model.findOne({ longUrl: this.longUrl });

  if (existingUrl) {
    throw new ConflictException('URL already exists');
  }

  next();
});
