// src/components/PdfButton.tsx
'use client';
import { Button } from '@/components/ui/button';
// @ts-expect-error
import html2pdf from 'html2pdf.js';

export function PdfButton() {
  const generatePDF = () => {
    const element = document.getElementById('pdf-content');
    const opt = {
      margin: 1,
      filename: 'orcamento.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf(element).set(opt).save();
  };

  return (
    <Button onClick={generatePDF} className="mt-4">
      Gerar PDF
    </Button>
  );
}
