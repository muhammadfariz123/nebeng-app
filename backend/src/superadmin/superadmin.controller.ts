import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query 
} from '@nestjs/common';
import { SuperadminService } from './superadmin.service';

@Controller('superadmin')
export class SuperadminController {
  constructor(private readonly superadminService: SuperadminService) {}

  // === DASHBOARD ===
  @Get('dashboard')
  async getDashboard() {
    return await this.superadminService.getDashboard();
  }

  // === TERMINALS ===
  @Get('terminals')
  async getTerminals() {
    return await this.superadminService.getTerminals();
  }

  @Post('terminals')
  async createTerminal(@Body() data: any) {
    return await this.superadminService.createTerminal(data);
  }

  @Put('terminals/:id')
  async updateTerminal(@Param('id') id: string, @Body() data: any) {
    return await this.superadminService.updateTerminal(+id, data);
  }

  @Delete('terminals/:id')
  async deleteTerminal(@Param('id') id: string) {
    return await this.superadminService.deleteTerminal(+id);
  }

  // === LOKASI ===
  @Get('provinces')
  async getProvinces() {
    return await this.superadminService.getProvinces();
  }

  @Get('regencies')
  async getRegencies(@Query('provinceId') provinceId: string) {
    return await this.superadminService.getRegencies(+provinceId);
  }

  @Get('districts')
  async getDistricts(@Query('regencyId') regencyId: string) {
    return await this.superadminService.getDistricts(+regencyId);
  }
}
