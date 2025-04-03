import { Controller, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ExcelCompareService } from 'src/pdf-service/pdf-service.service';
import * as multer from 'multer';


@Controller('comparar')
export class ExcelController {
  constructor(private readonly excelService: ExcelCompareService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'sheet1', maxCount: 1 }, { name: 'sheet2', maxCount: 1 }],
      {
        storage: multer.memoryStorage(), // ✅ aqui está a mudança
      }
    )
  )
  async compararPlanilhas(@UploadedFiles() files: { sheet1: Express.Multer.File[]; sheet2: Express.Multer.File[] }) {
    const file1 = files.sheet1?.[0];
    const file2 = files.sheet2?.[0];
  
    if (!file1 || !file2) {
      throw new Error('Arquivos não enviados corretamente');
    }
  
    const resultado = this.excelService.compareExcelFiles(
      file1.buffer,
      file2.buffer,
    );
  
    return {
      sucesso: resultado.length === 0,
      diferencas: resultado,
    };
  }
  
}