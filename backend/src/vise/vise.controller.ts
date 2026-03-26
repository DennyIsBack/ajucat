import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { ViseLandingService } from './vise.service'
import { CreateCheckoutDto } from './dto/create-checkout.dto'
import { CreateLeadDto } from './dto/create-lead.dto'

@Controller('api/vise')
export class ViseController {
  constructor(private readonly viseLandingService: ViseLandingService) {}

  @Post('checkout')
  @HttpCode(HttpStatus.CREATED)
  async createCheckout(@Body() createCheckoutDto: CreateCheckoutDto) {
    return this.viseLandingService.processCheckout(createCheckoutDto)
  }

  @Post('lead')
  @HttpCode(HttpStatus.CREATED)
  async createLead(@Body() createLeadDto: CreateLeadDto) {
    return this.viseLandingService.createLead(createLeadDto)
  }

  @Post('contact')
  @HttpCode(HttpStatus.OK)
  async sendContactMessage(@Body() contactDto: any) {
    return this.viseLandingService.sendContactEmail(contactDto)
  }
}
