import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly provider: string;
  private cloudinaryConfigured = false;

  constructor(private configService: ConfigService) {
    this.provider =
      this.configService.get<string>('STORAGE_PROVIDER') || 'local';

    if (this.provider === 'cloudinary') {
      const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
      const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
      const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');

      if (cloudName && apiKey && apiSecret) {
        cloudinary.config({
          cloud_name: cloudName,
          api_key: apiKey,
          api_secret: apiSecret,
        });
        this.cloudinaryConfigured = true;
        this.logger.log('Cloudinary configurado com sucesso');
      } else {
        this.logger.warn(
          'Cloudinary selecionado mas credenciais incompletas (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)',
        );
      }
    }
  }

  validateFile(
    mimeType: string,
    fileSize: number,
  ): { valid: boolean; error?: string } {
    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      return {
        valid: false,
        error: `Tipo de arquivo não permitido: ${mimeType}`,
      };
    }

    if (fileSize > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `Arquivo muito grande. Máximo permitido: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
      };
    }

    return { valid: true };
  }

  async uploadFile(
    file: Express.Multer.File,
    folder = 'uploads',
  ): Promise<{ url: string; key: string }> {
    const validation = this.validateFile(file.mimetype, file.size);
    if (!validation.valid) {
      throw new BadRequestException(validation.error);
    }

    const ext = path.extname(file.originalname);
    const key = `${folder}/${uuidv4()}${ext}`;

    if (this.provider === 'cloudinary' && this.cloudinaryConfigured) {
      return this.uploadToCloudinary(file, folder, key);
    }

    // Local storage (para desenvolvimento)
    return this.uploadLocal(file, key);
  }

  private uploadToCloudinary(
    file: Express.Multer.File,
    folder: string,
    key: string,
  ): Promise<{ url: string; key: string }> {
    const publicIdBase = path.basename(key, path.extname(key));
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: publicIdBase,
          resource_type: 'auto',
          overwrite: false,
        },
        (error, result) => {
          if (error) {
            this.logger.error('Erro ao enviar para Cloudinary', error);
            reject(new BadRequestException('Falha no upload para Cloudinary'));
            return;
          }
          if (!result?.secure_url) {
            reject(new BadRequestException('Resposta inválida do Cloudinary'));
            return;
          }
          this.logger.log(`Arquivo enviado para Cloudinary: ${result.public_id}`);
          resolve({
            url: result.secure_url,
            key: result.public_id,
          });
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  private async uploadLocal(
    file: Express.Multer.File,
    key: string,
  ): Promise<{ url: string; key: string }> {
    const url = `/uploads/${key}`;
    this.logger.warn(
      `Arquivo salvo localmente (apenas desenvolvimento): ${key}`,
    );
    return { url, key };
  }

  async deleteFile(key: string): Promise<void> {
    if (this.provider === 'cloudinary' && this.cloudinaryConfigured) {
      try {
        const result = await cloudinary.uploader.destroy(key, {
          resource_type: 'auto',
        });
        if (result.result === 'ok') {
          this.logger.log(`Arquivo removido do Cloudinary: ${key}`);
        } else {
          this.logger.warn(`Cloudinary destroy result: ${result.result}`);
        }
      } catch (err) {
        this.logger.error(`Erro ao remover do Cloudinary: ${key}`, err);
      }
    }
  }

  async getSignedUrl(key: string, _expiresIn = 3600): Promise<string> {
    // Cloudinary: constrói URL pública a partir do public_id
    if (this.provider === 'cloudinary' && this.cloudinaryConfigured) {
      return cloudinary.url(key, { secure: true, resource_type: 'auto' });
    }
    return key;
  }
}
