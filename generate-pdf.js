const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const htmlPath = path.resolve(__dirname, 'test-plan.html');
  const fileUrl = `file://${htmlPath}`;
  
  await page.goto(fileUrl);
  
  const pdfPath = path.resolve(__dirname, 'DeltaPrime-AI-Test-Plan.pdf');
  await page.pdf({ 
    path: pdfPath,
    format: 'A4',
    margin: {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm'
    }
  });
  
  await browser.close();
  
  console.log(`✅ PDF generated successfully: ${pdfPath}`);
  return pdfPath;
}

generatePDF().catch(console.error);