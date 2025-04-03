import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CorsMiddleware } from './cors.middleware';
import { ExcelCompareService } from './pdf-service/pdf-service.service';
import { ExcelController } from './pdf-controller/pdf-controller.controller';



@Module({
  imports: [],
  controllers: [AppController,ExcelController],
  providers: [AppService, ExcelCompareService ],
})
export class AppModule implements NestModule  {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes('*');
  }

}
