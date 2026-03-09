# User Story 8826 — Test Cases

**Title:** Add new Connection types in BASE & amend AFAS Relation Type Mapping  
**Epic:** BASE/BASE Core  
**Sprint:** BASE:DevSprint '10  
**Status:** To do  
**Assigned to:** Rayan Ahmad - NoNames  
**Stakeholder Input:** Kseniya Kudravets (Jan 30)

---

## Acceptance Criteria

### AC1: Add New Connection Types to BASE
The following Connection types with their respective codes should be added to BASE:

| Connection Type | Code | Class | Notes |
|---|---|---|---|
| Director A | DIRA | Officer / Principal | New connection type |
| Director B | DIRB | Officer / Principal | New connection type |
| Director C | DIRC | Officer / Principal | New connection type |
| Pseudo-UBO | PUBO | Officer / Principal | New connection type |

### AC2: AFAS Relation Type Mapping
AFAS Relation Type Mapping from AFAS Connection type → BASE Connection Type should be amended as follows:

| AFAS Connection Type | BASE Connection Type | BASE Code |
|---|---|---|
| Director A | Director A | DIRA |
| Director B | Director B | DIRB |
| Director C | Director C | DIRC |
| Pseudo-UBO | Pseudo-UBO | PUBO |

### AC3: Officer / Principal Class Assignment
All new connection types (DIRA, DIRB, DIRC, PUBO) must be classified as "Officer / Principal" class.

---

## Test Cases

### TC-8826-001: Add Connection Type "DIRA" (Director A)

**Objective:** Verify that the "Director A" connection type with code "DIRA" and "Officer / Principal" class can be created in BASE.

**Preconditions:**
- User is logged into BASE system with admin privileges
- BASE database is accessible and in working state
- No existing connection type with code "DIRA" exists
- User has access to Master Data → Connection Types section

**Steps:**
1. Navigate to Master Data → Connection Types in BASE system
2. In "Active Connection Types" table, click "New" button (top toolbar)
3. In the connection type entry form, enter:
   - **Code:** DIRA
   - **Name:** Director A
   - **Class:** Officer / Principal (select from dropdown)
4. Review the entry for accuracy
5. Click "Save" or "Create" button

**Expected Results:**
- Connection type "DIRA - Director A" is successfully created
- System displays confirmation message
- "DIRA" connection type appears in the Active Connection Types table
- Class is set to "Officer / Principal"
- Status shows as "Active"

**Postconditions:**
- Connection type DIRA is available for mapping and use in the system
- AFAS mapping for "Director A" can now reference this connection type

---

### TC-8826-002: Add Connection Type "DIRB" (Director B)

**Objective:** Verify that the "Director B" connection type with code "DIRB" and "Officer / Principal" class can be created in BASE.

**Preconditions:**
- User is logged into BASE system with admin privileges
- BASE database is accessible
- No existing connection type with code "DIRB" exists
- TC-8826-001 (DIRA) has been completed successfully

**Steps:**
1. Navigate to Master Data → Connection Types in BASE system
2. In "Active Connection Types" table, click "New" button
3. In the connection type entry form, enter:
   - **Code:** DIRB
   - **Name:** Director B
   - **Class:** Officer / Principal (select from dropdown)
4. Review the entry for accuracy
5. Click "Save" or "Create" button

**Expected Results:**
- Connection type "DIRB - Director B" is successfully created
- System displays confirmation message
- "DIRB" connection type appears in the Active Connection Types table
- Class is set to "Officer / Principal"
- Status shows as "Active"

**Postconditions:**
- Connection type DIRB is available for mapping and use

---

### TC-8826-003: Add Connection Type "DIRC" (Director C)

**Objective:** Verify that the "Director C" connection type with code "DIRC" and "Officer / Principal" class can be created in BASE.

**Preconditions:**
- User is logged into BASE system with admin privileges
- BASE database is accessible
- No existing connection type with code "DIRC" exists
- TC-8826-001 and TC-8826-002 have been completed successfully

**Steps:**
1. Navigate to Master Data → Connection Types in BASE system
2. In "Active Connection Types" table, click "New" button
3. In the connection type entry form, enter:
   - **Code:** DIRC
   - **Name:** Director C
   - **Class:** Officer / Principal (select from dropdown)
4. Review the entry for accuracy
5. Click "Save" or "Create" button

**Expected Results:**
- Connection type "DIRC - Director C" is successfully created
- System displays confirmation message
- "DIRC" connection type appears in the Active Connection Types table
- Class is set to "Officer / Principal"
- Status shows as "Active"

**Postconditions:**
- Connection type DIRC is available for mapping and use

---

### TC-8826-004: Add Connection Type "PUBO" (Pseudo-UBO)

**Objective:** Verify that the "Pseudo-UBO" connection type with code "PUBO" and "Officer / Principal" class can be created in BASE.

**Preconditions:**
- User is logged into BASE system with admin privileges
- BASE database is accessible
- No existing connection type with code "PUBO" exists
- TC-8826-001, TC-8826-002, and TC-8826-003 have been completed successfully

**Steps:**
1. Navigate to Master Data → Connection Types in BASE system
2. In "Active Connection Types" table, click "New" button
3. In the connection type entry form, enter:
   - **Code:** PUBO
   - **Name:** Pseudo-UBO
   - **Class:** Officer / Principal (select from dropdown)
4. Review the entry for accuracy
5. Click "Save" or "Create" button

**Expected Results:**
- Connection type "PUBO - Pseudo-UBO" is successfully created
- System displays confirmation message
- "PUBO" connection type appears in the Active Connection Types table
- Class is set to "Officer / Principal"
- Status shows as "Active"

**Postconditions:**
- Connection type PUBO is available for mapping and use

---

### TC-8826-005: Map AFAS Connection Type "Director A" to BASE "DIRA"

**Objective:** Verify that AFAS connection type "Director A" is correctly mapped to BASE connection type code "DIRA".

**Preconditions:**
- BASE connection type "DIRA" exists (from TC-8826-001)
- User is logged into BASE system with admin privileges
- AFAS integration module is configured
- User has access to AFAS Relation Type Mappings section

**Steps:**
1. Navigate to Master Data → AFAS Relation Type or AFAS Connection Type Mappings
2. Click "New" button to create new mapping entry
3. In the mapping form, enter:
   - **AFAS Connection Type:** Director A (or corresponding AFAS code)
   - **BASE Connection Type:** DIRA (or select from dropdown showing "DIRA - Director A")
4. Set status to "Active" or "Enabled"
5. Review mapping for accuracy
6. Click "Save" button

**Expected Results:**
- AFAS Relation Type mapping "Director A → DIRA" is successfully created
- System displays confirmation message
- Mapping appears in the AFAS Relation Type Mapping list marked as "Active"
- Mapping table shows: AFAS "Director A" | BASE "DIRA"

**Postconditions:**
- AFAS data with connection type "Director A" will automatically mapped to BASE connection type "DIRA"

---

### TC-8826-006: Map AFAS Connection Type "Director B" to BASE "DIRB"

**Objective:** Verify that AFAS connection type "Director B" is correctly mapped to BASE connection type code "DIRB".

**Preconditions:**
- BASE connection type "DIRB" exists (from TC-8826-002)
- User is logged into BASE system with admin privileges
- AFAS integration module is configured
- TC-8826-005 has been completed

**Steps:**
1. Navigate to Master Data → AFAS Relation Type or AFAS Connection Type Mappings
2. Click "New" button to create new mapping entry
3. In the mapping form, enter:
   - **AFAS Connection Type:** Director B (or corresponding AFAS code)
   - **BASE Connection Type:** DIRB (or select from dropdown showing "DIRB - Director B")
4. Set status to "Active" or "Enabled"
5. Review mapping for accuracy
6. Click "Save" button

**Expected Results:**
- AFAS Relation Type mapping "Director B → DIRB" is successfully created
- System displays confirmation message
- Mapping appears in the AFAS Relation Type Mapping list marked as "Active"
- Mapping table shows: AFAS "Director B" | BASE "DIRB"

**Postconditions:**
- AFAS data with connection type "Director B" will be automatically mapped to BASE connection type "DIRB"

---

### TC-8826-007: Map AFAS Connection Type "Director C" to BASE "DIRC"

**Objective:** Verify that AFAS connection type "Director C" is correctly mapped to BASE connection type code "DIRC".

**Preconditions:**
- BASE connection type "DIRC" exists (from TC-8826-003)
- User is logged into BASE system with admin privileges
- AFAS integration module is configured
- TC-8826-005 and TC-8826-006 have been completed

**Steps:**
1. Navigate to Master Data → AFAS Relation Type or AFAS Connection Type Mappings
2. Click "New" button to create new mapping entry
3. In the mapping form, enter:
   - **AFAS Connection Type:** Director C (or corresponding AFAS code)
   - **BASE Connection Type:** DIRC (or select from dropdown showing "DIRC - Director C")
4. Set status to "Active" or "Enabled"
5. Review mapping for accuracy
6. Click "Save" button

**Expected Results:**
- AFAS Relation Type mapping "Director C → DIRC" is successfully created
- System displays confirmation message
- Mapping appears in the AFAS Relation Type Mapping list marked as "Active"
- Mapping table shows: AFAS "Director C" | BASE "DIRC"

**Postconditions:**
- AFAS data with connection type "Director C" will be automatically mapped to BASE connection type "DIRC"

---

### TC-8826-008: Map AFAS Connection Type "Pseudo-UBO" to BASE "PUBO"

**Objective:** Verify that AFAS connection type "Pseudo-UBO" is correctly mapped to BASE connection type code "PUBO".

**Preconditions:**
- BASE connection type "PUBO" exists (from TC-8826-004)
- User is logged into BASE system with admin privileges
- AFAS integration module is configured
- TC-8826-005, TC-8826-006, and TC-8826-007 have been completed

**Steps:**
1. Navigate to Master Data → AFAS Relation Type or AFAS Connection Type Mappings
2. Click "New" button to create new mapping entry
3. In the mapping form, enter:
   - **AFAS Connection Type:** Pseudo-UBO (or corresponding AFAS code)
   - **BASE Connection Type:** PUBO (or select from dropdown showing "PUBO - Pseudo-UBO")
4. Set status to "Active" or "Enabled"
5. Review mapping for accuracy
6. Click "Save" button

**Expected Results:**
- AFAS Relation Type mapping "Pseudo-UBO → PUBO" is successfully created
- System displays confirmation message
- Mapping appears in the AFAS Relation Type Mapping list marked as "Active"
- Mapping table shows: AFAS "Pseudo-UBO" | BASE "PUBO"

**Postconditions:**
- AFAS data with connection type "Pseudo-UBO" will be automatically mapped to BASE connection type "PUBO"

---

### TC-8826-009: Verify All Connection Types Are Listed

**Objective:** Verify that all four new connection types with their codes appear in the BASE Connection Types table.

**Preconditions:**
- All four connection types have been created (TC-8826-001 through TC-8826-004)
- User is logged into BASE system with admin privileges
- User has access to Master Data → Connection Types

**Steps:**
1. Navigate to Master Data → Connection Types in BASE system
2. View the "Active Connection Types" table
3. Check if all four types are visible in the Code column:
   - DIRA (Director A)
   - DIRB (Director B)
   - DIRC (Director C)
   - PUBO (Pseudo-UBO)
4. Verify each entry shows the correct Name value
5. (Optional) Filter by Class "Officer / Principal" to confirm all are in this class

**Expected Results:**
- All four connection type codes appear in the Active Connection Types table
- Each displays the correct name:
  - DIRA | Director A | Officer / Principal | Active
  - DIRB | Director B | Officer / Principal | Active
  - DIRC | Director C | Officer / Principal | Active
  - PUBO | Pseudo-UBO | Officer / Principal | Active
- No errors or warnings displayed
- All statuses show as "Active"

**Postconditions:**
- Connection types are confirmed to be properly registered and accessible

---

### TC-8826-010: Verify All AFAS Relation Type Mappings Are Active

**Objective:** Verify that all AFAS relation type mappings have been created and are active.

**Preconditions:**
- All four AFAS mappings have been created (TC-8826-005 through TC-8826-008)
- User is logged into BASE system with admin privileges
- User has access to AFAS Relation Type Mappings section

**Steps:**
1. Navigate to Master Data → AFAS Relation Type Mappings (or similar)
2. View the mapping list/table
3. Search for or verify presence of all four mappings:
   - AFAS "Director A" → BASE "DIRA"
   - AFAS "Director B" → BASE "DIRB"
   - AFAS "Director C" → BASE "DIRC"
   - AFAS "Pseudo-UBO" → BASE "PUBO"
4. Verify each mapping shows status as "Active" or "Enabled"

**Expected Results:**
- All four mappings are visible in the mapping list
- Each mapping displays correct source/destination pairs
- Mappings are marked as "Active" or "Enabled"
- No mapping conflicts or duplicates detected
- All mappings reference the correct BASE connection type codes (DIRA, DIRB, DIRC, PUBO)


**Postconditions:**
- AFAS integration is properly configured with all required mappings

---

### TC-8826-011: Negative Test — Duplicate Connection Type Code

**Objective:** Verify system prevents creation of duplicate connection type codes.

**Preconditions:**
- Connection type with code "DIRA" already exists (from TC-8826-001)
- User is logged into BASE system with admin privileges
- User has access to Master Data → Connection Types

**Steps:**
1. Navigate to Master Data → Connection Types
2. Click "New" button
3. In the connection type entry form, enter:
   - **Code:** DIRA (duplicate)
   - **Name:** Director A Duplicate
   - **Class:** Officer / Principal
4. Click "Save" button

**Expected Results:**
- System displays error message: "Connection Type code 'DIRA' already exists"
- Or displays validation error: "Duplicate Code - Please use a unique code"
- No duplicate is created
- User is returned to the Connection Type creation form with error highlighted
- Existing DIRA entry remains unchanged

**Postconditions:**
- System maintains data integrity by preventing duplicate codes

---

### TC-8826-012: Negative Test — Invalid Characters in Connection Type Code

**Objective:** Verify system validates connection type codes and rejects invalid input.

**Preconditions:**
- User is logged into BASE system with admin privileges
- No connection type with test code exists

**Steps:**
1. Navigate to Master Data → Connection Types
2. Click "New" button
3. In the connection type entry form, enter:
   - **Code:** DIR@#$% (invalid characters)
   - **Name:** Invalid Director Type
   - **Class:** Officer / Principal
4. Click "Save" button

**Expected Results:**
- System displays validation error: "Code contains invalid characters. Use alphanumeric characters only."
- Or displays: "Invalid format for Connection Type Code"
- Connection type is not created
- User is returned to form with error message displayed and invalid field highlighted

**Postconditions:**
- Only valid connection type codes are accepted

---

### TC-8826-013: AFAS Data Integration Test

**Objective:** Verify that AFAS data with new connection types is correctly processed and mapped to BASE.

**Preconditions:**
- All connection types and mappings have been created and are active (TC-8826-001 through TC-8826-008)
- Test AFAS data feed is available with records containing Director A, B, C, and Pseudo-UBO connection types
- AFAS integration sync process is configured and enabled
- User has access to AFAS import/sync logs

**Steps:**
   1. Prepare test AFAS data with records containing:
      - AFAS Connection Type: Director A
      - AFAS Connection Type: Director B
      - AFAS Connection Type: Director C
      - AFAS Connection Type: Pseudo-UBO
   2. Trigger AFAS data import/sync process (manually or via scheduled job)
   3. Monitor sync process completion
   4. Check BASE system for imported records
   5. Verify Connection Type fields in imported records

**Expected Results:**
- AFAS import/sync completes successfully
- Import log shows no errors or critical warnings
- All records are mapped correctly in BASE:
  - AFAS "Director A" records appear with BASE Connection Type "DIRA" (Director A)
  - AFAS "Director B" records appear with BASE Connection Type "DIRB" (Director B)
  - AFAS "Director C" records appear with BASE Connection Type "DIRC" (Director C)
  - AFAS "Pseudo-UBO" records appear with BASE Connection Type "PUBO" (Pseudo-UBO)
- All mapped records show Class: "Officer / Principal"
- No mapping errors or warnings in import log
- Record counts match between source and destination

**Postconditions:**
- AFAS integration with new connection types is fully functional
- Data flow from AFAS to BASE is working as expected

---

### TC-8826-014: User Permission Test

**Objective:** Verify that only authorized users can add/modify connection types and mappings.

**Preconditions:**
- Two user accounts: one with admin/configuration privileges, one with read-only/limited privileges
- Both users are configured in the system

**Steps:**
1. **Admin User Test:**
   - Log in as admin user
   - Navigate to Master Data → Connection Types
   - Verify "New" (or "Add") button is available and clickable
   - Navigate to AFAS Relation Type Mappings
   - Verify ability to create new mappings

2. **Limited User Test:**
   - Log out as admin
   - Log in as read-only/limited user
   - Navigate to Master Data → Connection Types section
   - Check if "New" button is available or disabled
   - Attempt to access AFAS Relation Type Mappings edit functionality

**Expected Results:**
- Admin user can:
  - View Connection Types list
  - Click "New" button and create connection types
  - View and modify AFAS mappings
- Limited user:
  - Can view Connection Types list (read-only)
  - Cannot see or access "New" button (disabled or hidden)
  - Cannot access or modify AFAS mapping configuration
  - If attempting unauthorized access: system displays "Permission Denied" or similar message

**Postconditions:**
- Access control is properly enforced
- Users can only perform actions within their permission level

---

### TC-8826-015: Class Assignment Verification

**Objective:** Verify that all new connection types have been correctly assigned to "Officer / Principal" class.

**Preconditions:**
- All four connection types have been created (TC-8826-001 through TC-8826-004)
- User is logged into BASE system with admin privileges
- User has access to Master Data → Connection Types

**Steps:**
1. Navigate to Master Data → Connection Types
2. View the Active Connection Types table
3. For each of the four new connection types (DIRA, DIRB, DIRC, PUBO):
   - Click on the connection type row or view details
   - Check the "Class" field or classification attribute
   - Confirm it displays "Officer / Principal"

**Expected Results:**
- All four connection types display Class = "Officer / Principal":
  - DIRA - Director A — Class: Officer / Principal
  - DIRB - Director B — Class: Officer / Principal
  - DIRC - Director C — Class: Officer / Principal
  - PUBO - Pseudo-UBO — Class: Officer / Principal
- No misclassified or unclassified entries
- System shows no warnings related to classification

**Postconditions:**
- All connection types are properly classified
- System can correctly filter/group by Officer / Principal class when needed

---

## Test Execution Summary

| Test Case ID | Title | Type | Priority | Status |
|---|---|---|---|---|
| TC-8826-001 | Add Connection Type "DIRA" (Director A) | Functional | High | Not Executed |
| TC-8826-002 | Add Connection Type "DIRB" (Director B) | Functional | High | Not Executed |
| TC-8826-003 | Add Connection Type "DIRC" (Director C) | Functional | High | Not Executed |
| TC-8826-004 | Add Connection Type "PUBO" (Pseudo-UBO) | Functional | High | Not Executed |
| TC-8826-005 | Map AFAS "Director A" → BASE "DIRA" | Functional | High | Not Executed |
| TC-8826-006 | Map AFAS "Director B" → BASE "DIRB" | Functional | High | Not Executed |
| TC-8826-007 | Map AFAS "Director C" → BASE "DIRC" | Functional | High | Not Executed |
| TC-8826-008 | Map AFAS "Pseudo-UBO" → BASE "PUBO" | Functional | High | Not Executed |
| TC-8826-009 | Verify All Connection Types Are Listed | Verification | Medium | Not Executed |
| TC-8826-010 | Verify All AFAS Relation Type Mappings Are Active | Verification | Medium | Not Executed |
| TC-8826-011 | Negative Test — Duplicate Connection Type Code | Negative | Medium | Not Executed |
| TC-8826-012 | Negative Test — Invalid Characters in Code | Negative | Medium | Not Executed |
| TC-8826-013 | AFAS Data Integration Test | Integration | High | Not Executed |
| TC-8826-014 | User Permission Test | Security | Medium | Not Executed |
| TC-8826-015 | Class Assignment Verification | Verification | High | Not Executed |

---

## Notes & Requirements

### BASE System UI Reference
- Connection Types are managed via Master Data section of BASE
- Active Connection Types are displayed in a table format with columns: Code, Name, Class, Status
- "New" button (top toolbar) is used to add new connection types
- AFAS Relation Type Mappings are managed in a similar interface with mapping table

### Code Format & Standards
- Connection Type codes must be **uppercase alphanumeric** (4 characters recommended):
  - **DIRA** = Director A
  - **DIRB** = Director B
  - **DIRC** = Director C
  - **PUBO** = Pseudo-UBO
- All codes in this story follow the pattern: 3-letter prefix + final letter (A, B, C) or abbreviation (UBO)

### Class Assignment
- All four new connection types must be assigned to class: **"Officer / Principal"**
- This classification is critical for proper system grouping and filtering

### AFAS Integration
- AFAS Integration module must be active and configured before mapping tests
- Mappings are bidirectional: AFAS source → BASE destination
- Test data file format: as used in AFAS export (likely CSV or XML based on comment reference to Errors.csv)

### Testing Environment
- Tests can be executed in development/UAT environment with AFAS test data
- Avoid using production AFAS data during initial testing
- Prepare test dataset with at least one record per each Director A, B, C, and Pseudo-UBO type

### Stakeholder Notes (from Kseniya Kudravets Jan 30 comment)
> "Hi @Camille Joy Reyes, please use:
> 1. Director A - DIRA
> 2. Director B - DIRB
> 3. Director C - DIRC
> 4. Pseudo-UBO - PUBO
> And Officer / Principal class for all. Thanks!"

This clarifies the exact codes and class to be used throughout the story.

---

## Acceptance Criteria Checklist

- [ ] All four connection types created with correct codes (DIRA, DIRB, DIRC, PUBO)
- [ ] All four connection types assigned to "Officer / Principal" class
- [ ] All four AFAS mappings created and marked as Active
- [ ] No duplicate or conflicting connection type codes exist
- [ ] AFAS integration successfully processes new connection types
- [ ] Access control prevents unauthorized modifications
- [ ] All new connection types appear in Connection Types list
- [ ] All mappings appear in AFAS Relation Type Mappings list

---

## Sign-Off and Approval

**QA Test Plan Created:** February 18, 2026  
**Related User Story:** BASE/BASE Core #8826  
**Assigned Developer:** Rayan Ahmad - NoNames  
**Stakeholder Guidance:** Kseniya Kudravets (Jan 30)  

> **Note:** These test cases should be executed and approved before the user story is marked as "Done" in the sprint.