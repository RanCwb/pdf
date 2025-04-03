import * as XLSX from 'xlsx';

export class ExcelCompareService {
  compareExcelFiles(buffer1: Buffer, buffer2: Buffer): string[] {
    const workbook1 = XLSX.read(buffer1, { type: 'buffer' });
    const workbook2 = XLSX.read(buffer2, { type: 'buffer' });

    const sheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
    const sheet2 = workbook2.Sheets[workbook2.SheetNames[0]];

    const json1 = XLSX.utils.sheet_to_json(sheet1, { header: 1 }) as any[][];
    const json2 = XLSX.utils.sheet_to_json(sheet2, { header: 1 }) as any[][];

    const errors: string[] = [];

    const maxRows = Math.max(json1.length, json2.length);

    for (let i = 0; i < maxRows; i++) {
      const row1 = json1[i] || [];
      const row2 = json2[i] || [];

      const maxCols = Math.max(row1.length, row2.length);

      for (let j = 0; j < maxCols; j++) {
        const cell1 = row1[j] ?? '';
        const cell2 = row2[j] ?? '';

        if (cell1 !== cell2) {
          errors.push(`Diferença na célula [${i + 1}, ${j + 1}]: "${cell1}" ≠ "${cell2}"`);
        }
      }
    }

    return errors;
  }
}
