import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { DespedidaDto } from './dto/despedidaDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('saludo/:name')
  getHello(@Param('name') name: string): string {
    return this.appService.getHello(name);
  }

  @Get('despedida')
  getDespedida(@Query('name') name: string): DespedidaDto {
    var despedidaDto: DespedidaDto = new DespedidaDto();
    despedidaDto.name = this.appService.getDespedida(name);
    return despedidaDto;
  }
}
