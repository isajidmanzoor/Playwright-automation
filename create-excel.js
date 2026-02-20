const fs = require('fs');

// Check if xlsx is available, if not use a simpler approach
let ExcelJS;
try {
  ExcelJS = require('exceljs');
} catch {
  // If exceljs not available, try xlsx
  try {
    ExcelJS = require('xlsx');
  } catch {
    console.log('Installing required dependencies...');
    require('child_process').execSync('npm install exceljs --save', { stdio: 'inherit' });
    ExcelJS = require('exceljs');
  }
}

const workbook = new ExcelJS.Workbook();

// Sheet 1: Test Summary
const summarySheet = workbook.addWorksheet('Test Summary');
summarySheet.columns = [
  { header: 'Test Case ID', key: 'id', width: 15 },
  { header: 'Title', key: 'title', width: 50 },
  { header: 'Type', key: 'type', width: 15 },
  { header: 'Priority', key: 'priority', width: 12 },
  { header: 'Status', key: 'status', width: 15 }
];

const testSummaryData = [
  { id: 'TC-8826-001', title: 'Add Connection Type "DIRA" (Director A)', type: 'Functional', priority: 'High', status: 'Not Executed' },
  { id: 'TC-8826-002', title: 'Add Connection Type "DIRB" (Director B)', type: 'Functional', priority: 'High', status: 'Not Executed' },
  { id: 'TC-8826-003', title: 'Add Connection Type "DIRC" (Director C)', type: 'Functional', priority: 'High', status: 'Not Executed' },
  { id: 'TC-8826-004', title: 'Add Connection Type "PUBO" (Pseudo-UBO)', type: 'Functional', priority: 'High', status: 'Not Executed' },
  { id: 'TC-8826-005', title: 'Map AFAS "Director A" → BASE "DIRA"', type: 'Functional', priority: 'High', status: 'Not Executed' },
  { id: 'TC-8826-006', title: 'Map AFAS "Director B" → BASE "DIRB"', type: 'Functional', priority: 'High', status: 'Not Executed' },
  { id: 'TC-8826-007', title: 'Map AFAS "Director C" → BASE "DIRC"', type: 'Functional', priority: 'High', status: 'Not Executed' },
  { id: 'TC-8826-008', title: 'Map AFAS "Pseudo-UBO" → BASE "PUBO"', type: 'Functional', priority: 'High', status: 'Not Executed' },
  { id: 'TC-8826-009', title: 'Verify All Connection Types Are Listed', type: 'Verification', priority: 'Medium', status: 'Not Executed' },
  { id: 'TC-8826-010', title: 'Verify All AFAS Relation Type Mappings Are Active', type: 'Verification', priority: 'Medium', status: 'Not Executed' },
  { id: 'TC-8826-011', title: 'Negative Test — Duplicate Connection Type Code', type: 'Negative', priority: 'Medium', status: 'Not Executed' },
  { id: 'TC-8826-012', title: 'Negative Test — Invalid Characters in Code', type: 'Negative', priority: 'Medium', status: 'Not Executed' },
  { id: 'TC-8826-013', title: 'AFAS Data Integration Test', type: 'Integration', priority: 'High', status: 'Not Executed' },
  { id: 'TC-8826-014', title: 'User Permission Test', type: 'Security', priority: 'Medium', status: 'Not Executed' },
  { id: 'TC-8826-015', title: 'Class Assignment Verification', type: 'Verification', priority: 'High', status: 'Not Executed' }
];

summarySheet.addRows(testSummaryData);

// Format header row
summarySheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
summarySheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF366092' } };
summarySheet.getRow(1).alignment = { horizontal: 'center', vertical: 'center' };

// Sheet 2: Test Cases Details
const detailsSheet = workbook.addWorksheet('Test Case Details');
detailsSheet.columns = [
  { header: 'Test Case ID', key: 'id', width: 15 },
  { header: 'Title', key: 'title', width: 45 },
  { header: 'Objective', key: 'objective', width: 50 },
  { header: 'Preconditions', key: 'preconditions', width: 50 },
  { header: 'Expected Results', key: 'expected', width: 50 },
  { header: 'Type', key: 'type', width: 12 },
  { header: 'Priority', key: 'priority', width: 10 }
];

const testCaseDetails = [
  {
    id: 'TC-8826-001',
    title: 'Add Connection Type "DIRA" (Director A)',
    objective: 'Verify that the "Director A" connection type with code "DIRA" and "Officer / Principal" class can be created in BASE.',
    preconditions: 'User logged in with admin privileges; BASE accessible; No existing DIRA code; Access to Master Data → Connection Types',
    expected: 'Connection type "DIRA - Director A" created; Confirmation message displayed; DIRA appears in Active Connection Types table; Class set to "Officer / Principal"; Status shows "Active"',
    type: 'Functional',
    priority: 'High'
  },
  {
    id: 'TC-8826-002',
    title: 'Add Connection Type "DIRB" (Director B)',
    objective: 'Verify that the "Director B" connection type with code "DIRB" and "Officer / Principal" class can be created in BASE.',
    preconditions: 'User logged in with admin privileges; BASE accessible; No existing DIRB code; TC-8826-001 completed; Access to Master Data → Connection Types',
    expected: 'Connection type "DIRB - Director B" created; Confirmation message displayed; DIRB appears in Active Connection Types table; Class set to "Officer / Principal"; Status shows "Active"',
    type: 'Functional',
    priority: 'High'
  },
  {
    id: 'TC-8826-003',
    title: 'Add Connection Type "DIRC" (Director C)',
    objective: 'Verify that the "Director C" connection type with code "DIRC" and "Officer / Principal" class can be created in BASE.',
    preconditions: 'User logged in with admin privileges; BASE accessible; No existing DIRC code; TC-8826-001 and TC-8826-002 completed; Access to Master Data → Connection Types',
    expected: 'Connection type "DIRC - Director C" created; Confirmation message displayed; DIRC appears in Active Connection Types table; Class set to "Officer / Principal"; Status shows "Active"',
    type: 'Functional',
    priority: 'High'
  },
  {
    id: 'TC-8826-004',
    title: 'Add Connection Type "PUBO" (Pseudo-UBO)',
    objective: 'Verify that the "Pseudo-UBO" connection type with code "PUBO" and "Officer / Principal" class can be created in BASE.',
    preconditions: 'User logged in with admin privileges; BASE accessible; No existing PUBO code; TC-8826-001, 002, 003 completed; Access to Master Data → Connection Types',
    expected: 'Connection type "PUBO - Pseudo-UBO" created; Confirmation message displayed; PUBO appears in Active Connection Types table; Class set to "Officer / Principal"; Status shows "Active"',
    type: 'Functional',
    priority: 'High'
  },
  {
    id: 'TC-8826-005',
    title: 'Map AFAS "Director A" → BASE "DIRA"',
    objective: 'Verify that AFAS connection type "Director A" is correctly mapped to BASE connection type code "DIRA".',
    preconditions: 'BASE connection type "DIRA" exists; User logged in with admin privileges; AFAS integration configured; Access to AFAS Relation Type Mappings',
    expected: 'AFAS Relation Type mapping "Director A → DIRA" created; Confirmation message displayed; Mapping appears in list marked "Active"; Mapping shows AFAS "Director A" | BASE "DIRA"',
    type: 'Functional',
    priority: 'High'
  },
  {
    id: 'TC-8826-006',
    title: 'Map AFAS "Director B" → BASE "DIRB"',
    objective: 'Verify that AFAS connection type "Director B" is correctly mapped to BASE connection type code "DIRB".',
    preconditions: 'BASE connection type "DIRB" exists; User logged in with admin privileges; AFAS integration configured; TC-8826-005 completed',
    expected: 'AFAS Relation Type mapping "Director B → DIRB" created; Confirmation message displayed; Mapping appears in list marked "Active"; Mapping shows AFAS "Director B" | BASE "DIRB"',
    type: 'Functional',
    priority: 'High'
  },
  {
    id: 'TC-8826-007',
    title: 'Map AFAS "Director C" → BASE "DIRC"',
    objective: 'Verify that AFAS connection type "Director C" is correctly mapped to BASE connection type code "DIRC".',
    preconditions: 'BASE connection type "DIRC" exists; User logged in with admin privileges; AFAS integration configured; TC-8826-005 and TC-8826-006 completed',
    expected: 'AFAS Relation Type mapping "Director C → DIRC" created; Confirmation message displayed; Mapping appears in list marked "Active"; Mapping shows AFAS "Director C" | BASE "DIRC"',
    type: 'Functional',
    priority: 'High'
  },
  {
    id: 'TC-8826-008',
    title: 'Map AFAS "Pseudo-UBO" → BASE "PUBO"',
    objective: 'Verify that AFAS connection type "Pseudo-UBO" is correctly mapped to BASE connection type code "PUBO".',
    preconditions: 'BASE connection type "PUBO" exists; User logged in with admin privileges; AFAS integration configured; TC-8826-005, 006, 007 completed',
    expected: 'AFAS Relation Type mapping "Pseudo-UBO → PUBO" created; Confirmation message displayed; Mapping appears in list marked "Active"; Mapping shows AFAS "Pseudo-UBO" | BASE "PUBO"',
    type: 'Functional',
    priority: 'High'
  },
  {
    id: 'TC-8826-009',
    title: 'Verify All Connection Types Are Listed',
    objective: 'Verify that all four new connection types with their codes appear in the BASE Connection Types table.',
    preconditions: 'All four connection types created (TC-8826-001 to 004); User logged in with admin privileges; Access to Master Data → Connection Types',
    expected: 'All four connection types visible: DIRA | Director A | Officer / Principal | Active; DIRB | Director B | Officer / Principal | Active; DIRC | Director C | Officer / Principal | Active; PUBO | Pseudo-UBO | Officer / Principal | Active; No errors or warnings; All statuses "Active"',
    type: 'Verification',
    priority: 'Medium'
  },
  {
    id: 'TC-8826-010',
    title: 'Verify All AFAS Relation Type Mappings Are Active',
    objective: 'Verify that all AFAS relation type mappings have been created and are active.',
    preconditions: 'All four AFAS mappings created (TC-8826-005 to 008); User logged in with admin privileges; Access to AFAS Relation Type Mappings section',
    expected: 'All four mappings visible in mapping list; Each displays correct source/destination pairs; Mappings marked "Active" or "Enabled"; No mapping conflicts or duplicates; All reference correct BASE codes (DIRA, DIRB, DIRC, PUBO)',
    type: 'Verification',
    priority: 'Medium'
  },
  {
    id: 'TC-8826-011',
    title: 'Negative Test — Duplicate Connection Type Code',
    objective: 'Verify system prevents creation of duplicate connection type codes.',
    preconditions: 'Connection type with code "DIRA" already exists; User logged in with admin privileges; Access to Master Data → Connection Types',
    expected: 'Error message displayed: "Connection Type code \'DIRA\' already exists"; No duplicate created; User returned to form with error highlighted; Existing DIRA entry remains unchanged',
    type: 'Negative',
    priority: 'Medium'
  },
  {
    id: 'TC-8826-012',
    title: 'Negative Test — Invalid Characters in Code',
    objective: 'Verify system validates connection type codes and rejects invalid input.',
    preconditions: 'User logged in with admin privileges; No connection type with test code exists',
    expected: 'Validation error displayed: "Code contains invalid characters. Use alphanumeric only."; Connection type not created; User returned to form with error message; Invalid field highlighted',
    type: 'Negative',
    priority: 'Medium'
  },
  {
    id: 'TC-8826-013',
    title: 'AFAS Data Integration Test',
    objective: 'Verify that AFAS data with new connection types is correctly processed and mapped to BASE.',
    preconditions: 'All connection types and mappings created and active; Test AFAS data available with Director A, B, C, Pseudo-UBO records; AFAS integration sync enabled; Access to import/sync logs',
    expected: 'AFAS import/sync completes successfully; No errors in log; All records mapped correctly: AFAS "Director A" → BASE "DIRA"; "Director B" → "DIRB"; "Director C" → "DIRC"; "Pseudo-UBO" → "PUBO"; All show Class "Officer / Principal"; Record counts match; No mapping errors',
    type: 'Integration',
    priority: 'High'
  },
  {
    id: 'TC-8826-014',
    title: 'User Permission Test',
    objective: 'Verify that only authorized users can add/modify connection types and mappings.',
    preconditions: 'Two user accounts: one admin, one read-only; Both configured in system',
    expected: 'Admin: can view list, click "New" button, create types, modify mappings; Read-only: can view list only, "New" button disabled/hidden, cannot access mapping configuration; Unauthorized attempts show "Permission Denied" message',
    type: 'Security',
    priority: 'Medium'
  },
  {
    id: 'TC-8826-015',
    title: 'Class Assignment Verification',
    objective: 'Verify that all new connection types have been correctly assigned to "Officer / Principal" class.',
    preconditions: 'All four connection types created (TC-8826-001 to 004); User logged in with admin privileges; Access to Master Data → Connection Types',
    expected: 'All four connection types display Class = "Officer / Principal": DIRA, DIRB, DIRC, PUBO; No misclassified entries; No classification warnings',
    type: 'Verification',
    priority: 'High'
  }
];

detailsSheet.addRows(testCaseDetails);

// Format header row
detailsSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
detailsSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF366092' } };
detailsSheet.getRow(1).alignment = { horizontal: 'center', vertical: 'center', wrapText: true };

// Set row heights for better readability
detailsSheet.getRow(1).height = 25;
for (let i = 2; i <= detailsSheet.rowCount; i++) {
  detailsSheet.getRow(i).height = 60;
  detailsSheet.getRow(i).alignment = { vertical: 'top', wrapText: true };
}

// Sheet 3: Acceptance Criteria
const acSheet = workbook.addWorksheet('Acceptance Criteria');
acSheet.columns = [
  { header: 'Criteria', key: 'criteria', width: 30 },
  { header: 'Details', key: 'details', width: 70 }
];

const acData = [
  { criteria: 'AC1: Add Connection Types (1 of 4)', details: 'Director A with code "DIRA" and class "Officer / Principal"' },
  { criteria: 'AC1: Add Connection Types (2 of 4)', details: 'Director B with code "DIRB" and class "Officer / Principal"' },
  { criteria: 'AC1: Add Connection Types (3 of 4)', details: 'Director C with code "DIRC" and class "Officer / Principal"' },
  { criteria: 'AC1: Add Connection Types (4 of 4)', details: 'Pseudo-UBO with code "PUBO" and class "Officer / Principal"' },
  { criteria: 'AC2: AFAS Mapping (1 of 4)', details: 'AFAS "Director A" → BASE "DIRA"' },
  { criteria: 'AC2: AFAS Mapping (2 of 4)', details: 'AFAS "Director B" → BASE "DIRB"' },
  { criteria: 'AC2: AFAS Mapping (3 of 4)', details: 'AFAS "Director C" → BASE "DIRC"' },
  { criteria: 'AC2: AFAS Mapping (4 of 4)', details: 'AFAS "Pseudo-UBO" → BASE "PUBO"' },
  { criteria: 'AC3: Class Assignment', details: 'All new connection types must be classified as "Officer / Principal"' }
];

acSheet.addRows(acData);

// Format header
acSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
acSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF366092' } };
for (let i = 2; i <= acSheet.rowCount; i++) {
  acSheet.getRow(i).height = 20;
  acSheet.getRow(i).alignment = { vertical: 'top', wrapText: true };
}

// Sheet 4: Key Information
const infoSheet = workbook.addWorksheet('Key Information');
infoSheet.columns = [
  { header: 'Section', key: 'section', width: 25 },
  { header: 'Information', key: 'info', width: 60 }
];

const infoData = [
  { section: 'User Story ID', info: '#8826' },
  { section: 'Title', info: 'Add new Connection types in BASE & amend AFAS Relation Type Mapping' },
  { section: 'Epic', info: 'BASE / BASE Core' },
  { section: 'Assigned Developer', info: 'Rayan Ahmad - NoNames' },
  { section: 'Stakeholder Guidance', info: 'Kseniya Kudravets (Jan 30)' },
  { section: 'Total Test Cases', info: '15' },
  { section: 'Test Plan Date', info: 'February 18, 2026' },
  { section: 'Connection Type Codes', info: 'DIRA, DIRB, DIRC, PUBO' },
  { section: 'Class Assignment', info: '"Officer / Principal"' },
  { section: 'System Module', info: 'Master Data → Connection Types' },
  { section: 'Related Module', info: 'Master Data → AFAS Relation Type Mappings' },
  { section: 'Testing Environment', info: 'Development / UAT with AFAS test data' },
  { section: 'Precondition', info: 'AFAS integration module must be active and configured' }
];

infoSheet.addRows(infoData);

// Format header
infoSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
infoSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF366092' } };
for (let i = 2; i <= infoSheet.rowCount; i++) {
  infoSheet.getRow(i).height = 20;
  infoSheet.getRow(i).alignment = { vertical: 'top', wrapText: true };
}

// Save the workbook
workbook.xlsx.writeFile('specs/User-Story-8826-Test-Cases.xlsx').then(() => {
  console.log('✅ Excel file created successfully: specs/User-Story-8826-Test-Cases.xlsx');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error creating Excel file:', err.message);
  process.exit(1);
});
