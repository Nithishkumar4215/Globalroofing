import { jsPDF } from 'jspdf';

interface PDFData {
  length: number;
  width: number;
  height: number;
  structureType: string;
  roofType: string;
  roofColor: string;
  totalArea: number;
  roofingArea: number;
  columnsCount: number;
  screenshotUrl: string;
}

export function generateDesignReport(data: PDFData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryColor = [30, 80, 140]; // #1E508C (Dark Blue)
  const secondaryColor = [243, 112, 33]; // #F37021 (Orange)
  const textColor = [51, 65, 85]; // Slate-700
  const lightBg = [248, 250, 252]; // Slate-50

  // --- 1. HEADER SECTION ---
  // Draw Stylized Company Logo Chevron (Vector)
  // Outer charcoal roof
  doc.setFillColor(45, 53, 64);
  doc.triangle(15, 32, 30, 17, 45, 32, 'F');
  // Inner white hollow to create chevron look
  doc.setFillColor(255, 255, 255);
  doc.triangle(19, 32, 30, 22, 41, 32, 'F');
  // Orange gabled wall / middle pillar
  doc.setFillColor(243, 112, 33);
  doc.rect(26, 28, 8, 12, 'F');
  // Left pillar
  doc.setFillColor(45, 53, 64);
  doc.rect(19, 32, 4, 8, 'F');

  // Company Name
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('GLOBAL ROOFING', 52, 23);

  // Company Contact Details
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text('Address: Chennai, Tamil Nadu, India', 52, 29);
  doc.text('Mobile: +91 6381421900 | WhatsApp: +91 6381421900', 52, 34);
  doc.text('Email: venkatidsc@gmail.com | Web: www.globalroofing.com', 52, 39);

  // Decorative border below Header
  doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setLineWidth(0.8);
  doc.line(15, 45, 195, 45);

  // --- 2. REPORT TITLE ---
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('3D STRUCTURE DESIGN REPORT', 15, 54);

  // --- 3. PROJECT DETAILS TABLE ---
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.rect(15, 59, 180, 48, 'F');
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.2);
  doc.rect(15, 59, 180, 48, 'S');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);

  // Left Column
  doc.text('Structure Type:', 20, 66);
  doc.text('Roof Profile:', 20, 73);
  doc.text('Dimensions (L x W x H):', 20, 80);
  doc.text('Estimated Columns:', 20, 87);
  doc.text('Report Generated On:', 20, 94);

  // Right Column (Calculations)
  doc.text('Total Footprint Area:', 110, 66);
  doc.text('Est. Roofing Sheet Area:', 110, 73);
  doc.text('Roof Color Theme:', 110, 80);

  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);

  // Values left
  doc.text(data.structureType, 65, 66);
  doc.text(data.roofType, 65, 73);
  doc.text(`${data.length} ft x ${data.width} ft x ${data.height} ft`, 65, 80);
  doc.text(`${data.columnsCount} columns`, 65, 87);
  doc.text(new Date().toLocaleString(), 65, 94);

  // Values right
  doc.text(`${data.totalArea.toLocaleString()} sq.ft`, 155, 66);
  doc.text(`${data.roofingArea.toLocaleString()} sq.ft`, 155, 73);
  doc.text(data.roofColor, 155, 80);

  // --- 4. 3D DESIGN PREVIEW ---
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('3D STRUCTURAL VISUALIZATION', 15, 117);

  // Add 3D Image preview frame
  const imgWidth = 180;
  const imgHeight = 95;
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setLineWidth(0.4);
  doc.rect(15, 121, imgWidth, imgHeight, 'S');

  // Insert Canvas screenshot
  try {
    doc.addImage(data.screenshotUrl, 'PNG', 15.2, 121.2, imgWidth - 0.4, imgHeight - 0.4);
  } catch (error) {
    console.error('Failed to embed 3D preview image:', error);
  }

  // --- 5. COMPANY PROFILE & SERVICES ---
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('COMPANY PROFILE & CAPABILITIES', 15, 230);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  
  const profileText = 
    'Company Profile: Global Roofing is a premier structural engineering and metal fabrication contractor in Tamil Nadu, dedicated to delivering robust industrial roofing solutions. We specialize in advanced structural framing, industrial sheet fixing, and custom canopy designs engineered for optimal durability.';
  const servicesText = 
    'Core Services: Industrial & warehouse shed fabrication, modular factory layout engineering, high-performance Mangalore tile cooling roof systems, weather-resistant polycarbonate skylights, and precision profile bending.';
  const qaText = 
    'Quality Assurance: We construct with structural-grade materials and adhere strictly to certified safety protocols, ensuring weather resilience, wind-load capacity, and lifetime structural integrity.';

  doc.text(profileText, 15, 237, { maxWidth: 180 });
  doc.text(servicesText, 15, 243, { maxWidth: 180 });
  doc.text(qaText, 15, 249, { maxWidth: 180 });

  // --- 6. FOOTER SECTION ---
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(15, 265, 195, 265);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Thank you for choosing GLOBAL ROOFING.', 105, 272, { align: 'center' });

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text('Mobile: +91 6381421900 | WhatsApp: +91 6381421900 | Email: venkatidsc@gmail.com | Web: www.globalroofing.com', 105, 278, { align: 'center' });

  // Save the PDF
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `${data.structureType.replace(/\s+/g, '_')}_${data.length}x${data.width}_${dateStr}.pdf`;
  doc.save(filename);
}
