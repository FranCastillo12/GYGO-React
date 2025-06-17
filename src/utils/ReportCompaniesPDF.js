import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/Logo.png";
export const ReportCompaniesPDF = (data) => {
   const doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "A4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Espacio reservado para el logo
  doc.setFontSize(12);
  doc.setTextColor(150);
  doc.addImage(logo, "PNG", 40, 30, 50, 50);

  // Título del reporte
  doc.setFontSize(20);
  doc.setTextColor("#333");
  doc.text("Reporte de Empresas Registradas", pageWidth / 2, 50, {
    align: "center",
  });

  // Fecha de generación
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 45, 90);

  // Preparar las filas de la tabla
  const rows = data.map((item) => [
    item.nombre || "N/A",
    item.serviceName || "N/A",
    item.numberOfUsers != null ? item.numberOfUsers : "N/A",
    item.fechaCreación
      ? new Date(item.fechaCreación).toLocaleDateString()
      : "N/A",
  ]);

  autoTable(doc, {
    head: [["Empresa", "Servicio", "Cantidad Usuarios", "Fecha Incorporación"]],
    body: rows.length > 0 ? rows : [["No hay registros", "", "", ""]],
    startY: 100,
    tableWidth: "wrap", // Calcula el ancho de tabla necesario
    margin: { left: (pageWidth - 600) / 2 }, // Ajusta aquí si quieres afinar más el centrado
    styles: {
      fontSize: 10,
      cellPadding: 6,
    },
    headStyles: {
      fillColor: [68, 175, 105], // Verde
      textColor: "#ffffff",
      halign: "center",
    },
    bodyStyles: {
      textColor: "#333",
    },
    columnStyles: {
      0: { cellWidth: 200 },
      1: { cellWidth: 150 },
      2: { cellWidth: 120, halign: "center" },
      3: { cellWidth: 130, halign: "center" },
    },
  });

  // Pie de página
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(
      `Página ${i} de ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 30,
      { align: "center" }
    );
  }

  // Descargar PDF
  doc.save("reporte_empresas.pdf");
};