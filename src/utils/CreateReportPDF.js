import { jsPDF } from "jspdf";

export const exportChartToPDF = (chartRef) => {
  const chart = chartRef.current;

  if (!chart) {
    alert("No hay gráfico para exportar");
    return;
  }

  const chartInstance = chart.chartInstance || chart;

  const base64Image = chartInstance.toBase64Image();
  const pdf = new jsPDF();

  pdf.setFontSize(18);
  pdf.text("Reporte de Emisiones", 15, 20);
  pdf.addImage(base64Image, "PNG", 15, 30, 180, 100);

  pdf.save("reporte_emisiones.pdf");
};
