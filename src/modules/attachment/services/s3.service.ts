import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { extname } from 'path';

@Injectable()
export class S3Service {
  private supabaseUrl: string;
  private supabaseKey: string;
  private bucket: string;

  constructor(private config: ConfigService) {
    this.supabaseUrl = this.config.get<string>('SUPABASE_URL', '');
    this.supabaseKey = this.config.get<string>('SUPABASE_SERVICE_KEY', '');
    this.bucket = this.config.get<string>('SUPABASE_BUCKET', 'attachments');
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const name = `${Date.now()}-${randomBytes(8).toString('hex')}${extname(file.originalname)}`;

    const res = await fetch(
      `${this.supabaseUrl}/storage/v1/object/${this.bucket}/${name}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.supabaseKey}`,
          'Content-Type': file.mimetype,
        },
        body: new Uint8Array(file.buffer),
      },
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Supabase upload failed: ${err}`);
    }

    return `${this.supabaseUrl}/storage/v1/object/public/${this.bucket}/${name}`;
  }

  async delete(url: string): Promise<void> {
    const prefix = `/storage/v1/object/public/${this.bucket}/`;
    const idx = url.indexOf(prefix);
    if (idx === -1) return;

    const fileName = url.slice(idx + prefix.length);

    await fetch(
      `${this.supabaseUrl}/storage/v1/object/${this.bucket}/${fileName}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.supabaseKey}`,
        },
      },
    );
  }
}
