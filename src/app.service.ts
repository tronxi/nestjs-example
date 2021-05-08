import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(name: string): string {
    return 'La vidaaa!' + name;
  }

  getDespedida(name: string): string {
    return 'adios ' + name;
  }
}
