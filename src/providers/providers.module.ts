import { Module } from '@nestjs/common';
import { EtherealMailProvider } from './EmailProvider/EtherealMailProvider';

@Module({
  controllers: [],
  providers: [EtherealMailProvider],
  exports: [EtherealMailProvider],
})
export class ProvidersModule {}
