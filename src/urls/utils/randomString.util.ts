import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class RandomStringService {
  generateRandomString(length: number): string {
    const randomBytesBuffer = randomBytes(Math.ceil(length / 2));
    const randomString = randomBytesBuffer.toString('hex').slice(0, length);
    return randomString;
  }
}
