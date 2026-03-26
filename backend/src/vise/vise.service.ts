import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCheckoutDto } from './dto/create-checkout.dto'
import { CreateLeadDto } from './dto/create-lead.dto'
import { MailService } from '../mail/mail.service'

@Injectable()
export class ViseLandingService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async processCheckout(createCheckoutDto: CreateCheckoutDto) {
    const { name, email, phone, company, projectDescription, amount } = createCheckoutDto

    // Validate amount
    if (amount !== 40000) {
      throw new BadRequestException('Valor do pedido inválido')
    }

    try {
      // Create order in database
      const order = await this.prisma.viseLandingOrder.create({
        data: {
          clientName: name,
          clientEmail: email,
          clientPhone: phone,
          clientCompany: company || null,
          projectDescription,
          amount,
          status: 'PENDING',
          paymentMethod: 'CARD',
        },
      })

      // Send confirmation email to client
      await this.mailService.sendCheckoutConfirmation({
        to: email,
        clientName: name,
        orderId: order.id,
        amount: 400,
      })

      // Send notification to admin
      await this.mailService.sendAdminNotification({
        to: process.env.ADMIN_EMAIL || 'vise.creativestudio@gmail.com',
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        projectDescription,
        orderId: order.id,
      })

      return {
        success: true,
        message: 'Pedido criado com sucesso',
        orderId: order.id,
      }
    } catch (error) {
      throw new BadRequestException('Erro ao processar pedido')
    }
  }

  async createLead(createLeadDto: CreateLeadDto) {
    const { name, email, phone, message } = createLeadDto

    try {
      // Create lead in database
      const lead = await this.prisma.viseLandingLead.create({
        data: {
          name,
          email,
          phone,
          message,
        },
      })

      // Send email to admin
      await this.mailService.sendLeadNotification({
        to: process.env.ADMIN_EMAIL || 'vise.creativestudio@gmail.com',
        name,
        email,
        phone,
        message,
      })

      // Send confirmation to client
      await this.mailService.sendLeadConfirmation({
        to: email,
        name,
      })

      return {
        success: true,
        message: 'Lead criado com sucesso',
        leadId: lead.id,
      }
    } catch (error) {
      throw new BadRequestException('Erro ao criar lead')
    }
  }

  async sendContactEmail(contactDto: any) {
    const { name, email, subject, message } = contactDto

    try {
      // Send email to admin
      await this.mailService.sendContactMessage({
        to: process.env.ADMIN_EMAIL || 'vise.creativestudio@gmail.com',
        from: email,
        name,
        subject,
        message,
      })

      return {
        success: true,
        message: 'Mensagem enviada com sucesso',
      }
    } catch (error) {
      throw new BadRequestException('Erro ao enviar mensagem')
    }
  }
}
