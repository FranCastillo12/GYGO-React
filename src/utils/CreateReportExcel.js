import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (labels, emissions) => {
  if (labels.length === 0 || emissions.length === 0) {
    alert("No hay datos para exportar");
    return;
  }

  const data = labels.map((label, index) => ({
    Mes: label,
    Emisiones: emissions[index]
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const file = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(file, "reporte_emisiones.xlsx");
};
