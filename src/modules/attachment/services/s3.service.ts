import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { randomBytes } from 'crypto';
import { extname } from 'path';

@Injectable()
export class S3Service {
  private client: S3Client;
  private bucket: string;
  private region: string;

  constructor(private config: ConfigService) {
    this.region = this.config.get<string>('AWS_REGION', 'eu-north-1');
    this.bucket = this.config.get<string>('AWS_S3_BUCKET', '');

    this.client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.config.get<string>('AWS_ACCESS_KEY_ID', ''),
        secretAccessKey: this.config.get<string>('AWS_SECRET_ACCESS_KEY', ''),
      },
    });
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const key = `attachments/${Date.now()}-${randomBytes(8).toString('hex')}${extname(file.originalname)}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }

  async delete(url: string): Promise<void> {
    const key = this.extractKey(url);
    if (!key) return;

    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }

  private extractKey(url: string): string | null {
    const prefix = `https://${this.bucket}.s3.${this.region}.amazonaws.com/`;
    if (url.startsWith(prefix)) {
      return url.slice(prefix.length);
    }
    return null;
  }
}
