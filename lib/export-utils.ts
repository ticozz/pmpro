import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable, { RowInput, CellInput } from "jspdf-autotable";

export function exportToExcel(data: any[], filename: string) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

export function exportToPDF(data: any[], title: string) {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(16);
  doc.text(title, 14, 15);

  // Convert data to table format
  const headers = Object.keys(data[0]);
  const rows = data.map((obj) => Object.values(obj));

  autoTable(doc, {
    head: [headers],
    body: rows as RowInput[],
    startY: 25,
    theme: "grid",
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontSize: 9,
      fontStyle: "bold",
    },
  });

  doc.save(`${title.toLowerCase().replace(/\s+/g, "_")}.pdf`);
}
