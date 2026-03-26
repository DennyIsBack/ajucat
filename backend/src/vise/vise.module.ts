import { Module } from '@nestjs/common'
import { ViseController } from './vise.controller'
import { ViseLandingService } from './vise.service'
import { PrismaService } from '../prisma/prisma.service'
import { MailService } from '../mail/mail.service'

@Module({
  controllers: [ViseController],
  providers: [ViseLandingService, PrismaService, MailService],
})
export class ViseModule {}
