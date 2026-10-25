import { Notice } from '../types/notice';

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'notice-gst-drc01',
    title: 'GST Show Cause Notice DRC-01 - Input Tax Credit Mismatch (GSTR-2B vs 3B)',
    issuingAuthority: 'Commercial Taxes Department, Office of Assistant Commissioner (LGSTO-040), Bangalore',
    authorityType: 'State Tax & Revenue',
    category: 'Tax & Financial',
    referenceNumber: 'GSTIN/29AABCU9603R1ZM/DRC-01/2026-27/0419',
    receivedDate: '2026-10-18',
    issueDate: '2026-10-15',
    deadlineDate: '2026-11-14',
    deadlineSource: 'Form GST DRC-01, Section 5: "You are hereby called upon to show cause within thirty (30) days from the date of service of this notice as to why the stated demand and interest should not be confirmed."',
    deadlineType: 'calendar_days',
    urgency: 'urgent',
    status: 'needs_attention',
    confidenceScore: 99,
    plainLanguageSummary:
      'The State GST Department has issued a formal Show Cause Notice (Form GST DRC-01) alleging an Input Tax Credit (ITC) mismatch of ₹3,84,500 between your purchase records (GSTR-2B) and claimed returns (GSTR-3B) for FY 2024-25. You have 30 calendar days to either remit the disputed tax with interest or file an itemized objection with supporting vendor invoices and bank payment proofs.',
    whyIssued: {
      trigger: 'Automated GST portal analytics detected ITC claimed in GSTR-3B exceeding supplier tax invoices uploaded in GSTR-2B by ₹3,84,500.',
      officialRationale: 'Statutory demand proceedings under Section 73(1) of the Central / Karnataka Goods and Services Tax Act, 2017.',
      businessRisk: 'Confirmation of tax demand with mandatory 10% penalty (₹38,450), 18% annual interest, and potential freezing of electronic credit ledger or bank account under Section 83.'
    },
    mandatoryActions: [
      {
        id: 'gst-m1',
        title: 'File Form GST DRC-06 Written Reply on GST Common Portal',
        deadline: '2026-11-14',
        description: 'Submit itemized reconciliation table and vendor 2B mismatch breakdown through the online services portal.',
        statutoryRef: 'Rule 142(4) CGST Rules',
        completed: false
      },
      {
        id: 'gst-m2',
        title: 'Reconcile Supplier Invoices with Chartered Accountant',
        deadline: '2026-11-05',
        description: 'Cross-check disputed invoices with vendor CA certificates and bank statements to prove genuine movement of goods.',
        completed: true
      }
    ],
    suggestedPreparations: [
      {
        id: 'gst-s1',
        title: 'Request Personal Hearing in DRC-06 Reply',
        timeframe: 'Before deadline',
        description: 'Expressly tick the "Personal Hearing Requested" checkbox in Form DRC-06 to ensure the adjudicating officer cannot pass an adverse order without hearing your CA or advocate.',
        completed: false
      },
      {
        id: 'gst-s2',
        title: 'Obtain Vendor Tax Payment Declarations (Annexure A)',
        timeframe: 'Within 10 days',
        description: 'Contact listed vendors whose invoices were delayed in GSTR-1 to secure written confirmation of tax discharge.',
        completed: false
      }
    ],
    documentChecklist: [
      {
        id: 'gst-doc-1',
        name: 'Form GST DRC-01 Show Cause Notice Copy',
        description: 'Complete 6-page notice containing calculation annexure and DIN (Document Identification Number).',
        collected: true,
        mandatory: true,
        locationHint: 'GST Portal > Services > User Services > View Additional Notices'
      },
      {
        id: 'gst-doc-2',
        name: 'GSTR-2B and GSTR-3B Annual Comparison Spreadsheet',
        description: 'Invoice-by-invoice variance sheet for FY 2024-25.',
        collected: true,
        mandatory: true,
        locationHint: 'CA working folder / Tally ERP export'
      },
      {
        id: 'gst-doc-3',
        name: 'Vendor Tax Invoices & Bank Proof of Payment',
        description: 'Proof that payment including GST was made through banking channels within 180 days under Section 16(2).',
        collected: false,
        mandatory: true,
        locationHint: 'Accounts department physical files'
      }
    ],
    legalCitations: [
      {
        code: 'CGST / SGST Act § 73(1)',
        title: 'Determination of Tax Not Paid or Short Paid',
        excerpt: 'Where it appears that any tax has not been paid or short paid or input tax credit has been wrongly availed or utilised, the proper officer shall serve notice.',
        plainMeaning: 'Gives tax officers authority to recover unverified input tax credit within a 3-year limitation period.'
      },
      {
        code: 'CGST Act § 16(2)(c)',
        title: 'Conditions for Claiming Input Tax Credit',
        excerpt: 'Subject to provisions of section 41, the tax charged in respect of such supply has been actually paid to the Government.',
        plainMeaning: 'Buyer can only claim credit if the seller has deposited the tax into the government treasury.'
      }
    ],
    missingOrUncertain: [
      {
        item: 'Exact Vendor Invoices Listed in Disallowance Annexure',
        reason: 'DRC-01 summary cites aggregate monthly variance but annexure B requires online download.',
        severity: 'medium',
        suggestedVerification: 'Download detailed Excel annexure from the notices tab on gst.gov.in.'
      }
    ],
    sourceSnippets: [
      {
        id: 'gst-snip-1',
        section: 'Page 1, Reference Header',
        page: 1,
        originalText: 'OFFICE OF THE ASSISTANT COMMISSIONER OF COMMERCIAL TAXES, LGSTO-040, BENGALURU. Ref No: GSTIN/29AABCU9603R1ZM/DRC-01/2026-27/0419. Date: 15-10-2026.',
        verifiedFact: 'Issued by Bangalore Commercial Taxes Office on October 15, 2026 with valid government DIN.'
      },
      {
        id: 'gst-snip-2',
        section: 'Page 2, Paragraph 4',
        page: 2,
        originalText: 'Upon scrutiny of returns filed for the tax period April 2024 to March 2025, excess ITC availed in GSTR-3B as compared to GSTR-2B is ₹3,84,500.00.',
        verifiedFact: 'Alleged tax variance of ₹3,84,500 for Financial Year 2024-25.'
      },
      {
        id: 'gst-snip-3',
        section: 'Page 3, Paragraph 7',
        page: 3,
        originalText: 'The taxpayer is directed to show cause within 30 days from the receipt of this notice, failing which order under Section 73(9) shall be passed ex-parte.',
        verifiedFact: 'Strict 30-day statutory response deadline expiring November 14, 2026.'
      }
    ],
    fileName: 'GST_DRC01_Notice_FY2024_25.pdf',
    fileSize: '1.8 MB'
  },
  {
    id: 'notice-it-148a',
    title: 'Income Tax Notice u/s 148A(b) - Inquiry on Unexplained High-Value Transactions',
    issuingAuthority: 'Income Tax Department, National Faceless Assessment Centre (NFAC), New Delhi',
    authorityType: 'IRS / Federal Tax',
    category: 'Tax & Financial',
    referenceNumber: 'ITBA/AST/S/148A/2026-27/1048291038',
    receivedDate: '2026-10-19',
    issueDate: '2026-10-18',
    deadlineDate: '2026-11-01',
    deadlineSource: 'Form ITBA-148A(b), Section 3: "You are requested to submit your reply along with supporting documents by 01/11/2026 (within 14 days)."',
    deadlineType: 'calendar_days',
    urgency: 'urgent',
    status: 'needs_attention',
    confidenceScore: 98,
    plainLanguageSummary:
      'The Income Tax Department (NFAC) has issued a pre-assessment inquiry notice under Section 148A(b) for Assessment Year 2024-25 (FY 2023-24). Their insight portal flagged high-value cash deposits and turnover totaling ₹42,50,000 in your commercial current account, alleging that income has escaped assessment. You must file an electronic response within 14 days explaining the source of funds.',
    whyIssued: {
      trigger: 'Automated Insight / SFT (Statement of Financial Transactions) flagged bank credits exceeding gross turnover declared in ITR-4/ITR-5.',
      officialRationale: 'Opportunity of being heard before issuing reassessment notice under Section 148 of the Income-tax Act, 1961.',
      businessRisk: 'Reopening of past assessment, tax levy at 60% plus 25% surcharge under Section 115BBE, and penalty up to 200% under Section 270A.'
    },
    mandatoryActions: [
      {
        id: 'it-m1',
        title: 'Submit E-Response to Notice u/s 148A on E-Filing Portal',
        deadline: '2026-11-01',
        description: 'Upload written explanation with bank reconciliation and audited financial statements on incometax.gov.in.',
        statutoryRef: 'Section 148A(c) Income-tax Act',
        completed: false
      }
    ],
    suggestedPreparations: [
      {
        id: 'it-s1',
        title: 'Download Annual Information Statement (AIS) & Form 26AS',
        timeframe: 'Immediate',
        description: 'Verify if the bank reported gross sales collections as individual high-value deposits in error.',
        completed: true
      },
      {
        id: 'it-s2',
        title: 'Prepare CA Bank Reconciliation Statement (BRS)',
        timeframe: 'Within 5 days',
        description: 'Match customer receipts deposited in bank with sales invoices entered in tally ledger.',
        completed: false
      }
    ],
    documentChecklist: [
      {
        id: 'it-doc-1',
        name: 'Notice u/s 148A(b) with Annexed Reasons',
        description: 'Official notice with detailed information relied upon by the Assessing Officer.',
        collected: true,
        mandatory: true,
        locationHint: 'E-Filing Portal > Pending Actions > E-Proceedings'
      },
      {
        id: 'it-doc-2',
        name: 'Filed ITR-5 / ITR-6 Acknowledgment for AY 2024-25',
        description: 'Proof of timely return filing with computation sheet.',
        collected: true,
        mandatory: true,
        locationHint: 'CA office records'
      },
      {
        id: 'it-doc-3',
        name: 'Bank Current Account Statements (FY 2023-24)',
        description: 'All 12 monthly statements stamped or electronically generated.',
        collected: true,
        mandatory: true,
        locationHint: 'Net banking corporate portal'
      }
    ],
    legalCitations: [
      {
        code: 'Income-tax Act § 148A',
        title: 'Conducting Inquiry, Providing Opportunity Before Issue of Notice u/s 148',
        excerpt: 'The Assessing Officer shall, before issuing any notice under section 148, provide an opportunity of being heard to the assessee.',
        plainMeaning: 'Assessing officer must give taxpayer minimum 7 to 30 days to defend before initiating reassessment.'
      }
    ],
    missingOrUncertain: [
      {
        item: 'Name and Designation of Specific Assessing Officer',
        reason: 'Under the Faceless Assessment Scheme, notices are issued by an anonymous Assessment Unit in NFAC.',
        severity: 'low',
        suggestedVerification: 'All communications must be routed exclusively through the e-proceedings portal.'
      }
    ],
    sourceSnippets: [
      {
        id: 'it-snip-1',
        section: 'Header, NFAC',
        page: 1,
        originalText: 'GOVERNMENT OF INDIA, MINISTRY OF FINANCE, NATIONAL FACELESS ASSESSMENT CENTRE. Notice under clause (b) of Section 148A of the Income-tax Act, 1961. DIN: ITBA/AST/S/148A/2026-27/1048291038.',
        verifiedFact: 'Valid notice issued by National Faceless Assessment Centre.'
      },
      {
        id: 'it-snip-2',
        section: 'Paragraph 2, Allegation',
        page: 1,
        originalText: 'Information available indicates high value transactions amounting to ₹42,50,000/- during the Financial Year 2023-24 which has escaped assessment.',
        verifiedFact: 'Transaction value of ₹42,50,000 identified as allegedly escaped income.'
      }
    ],
    fileName: 'IncomeTax_Notice_148A_AY2024_25.pdf',
    fileSize: '1.2 MB'
  },
  {
    id: 'notice-epfo-7a',
    title: 'EPFO Section 7A Summon - Inquiry for Determination of Dues for Contractual Staff',
    issuingAuthority: 'Employees’ Provident Fund Organisation, Regional Office, Bengaluru West',
    authorityType: 'Labor & Workplace Safety (OSHA)',
    category: 'Regulatory & Labor',
    referenceNumber: 'EPFO/RO/BGL-W/C-7A/39102/2026',
    receivedDate: '2026-10-12',
    issueDate: '2026-10-08',
    deadlineDate: '2026-11-08',
    deadlineSource: 'Summon Notice Section 2: "You are required to appear in person or through authorized representative on 08/11/2026 at 11:30 AM."',
    deadlineType: 'calendar_days',
    urgency: 'upcoming',
    status: 'under_review',
    confidenceScore: 97,
    plainLanguageSummary:
      'The Regional PF Commissioner has initiated quasi-judicial inquiry proceedings under Section 7A of the EPF & MP Act, 1952. The notice alleges non-extension of Provident Fund benefits and non-deposit of dues for security and housekeeping contractual personnel engaged at your premises between April 2023 and March 2025. You are summoned to produce attendance muster rolls, wage registers, and contractor agreements on November 8, 2026.',
    whyIssued: {
      trigger: 'Enforcement inspection of facility contractor rolls following PF coverage drive.',
      officialRationale: 'Statutory determination of escaped PF dues under Section 7A of the Employees’ Provident Funds and Miscellaneous Provisions Act, 1952.',
      businessRisk: 'Ex-parte assessment of dues, damages under Section 14B up to 100% of arrears, 12% interest under Section 7Q, and personal recovery warrant.'
    },
    mandatoryActions: [
      {
        id: 'epf-m1',
        title: 'Attend Hearing or File Written Defense with Authorised Representative',
        deadline: '2026-11-08',
        description: 'Submit Form of Authority (Vakalatnama/Letter of Authority) and certified copies of contractor wage registers.',
        statutoryRef: 'Section 7A(2) EPF Act',
        completed: false
      }
    ],
    suggestedPreparations: [
      {
        id: 'epf-s1',
        title: 'Issue Notice to Manpower Supply Contractor for ECR Challans',
        timeframe: 'Immediate',
        description: 'Demand contractor provide Electronic Challan cum Return (ECR) proofs showing PF numbers (UAN) for deployed staff.',
        completed: true
      }
    ],
    documentChecklist: [
      {
        id: 'epf-doc-1',
        name: 'EPFO Section 7A Summons Notice',
        description: 'Signed summons from Assistant PF Commissioner.',
        collected: true,
        mandatory: true,
        locationHint: 'HR compliance binder'
      },
      {
        id: 'epf-doc-2',
        name: 'Manpower Supply Service Contracts',
        description: 'Agreements specifying contractor is sole employer responsible for PF compliance.',
        collected: true,
        mandatory: true,
        locationHint: 'Legal contract files'
      },
      {
        id: 'epf-doc-3',
        name: 'Salary / Wage Registers & ECR Challans',
        description: 'Monthly payroll records showing EPF deductions.',
        collected: false,
        mandatory: true,
        locationHint: 'Payroll department'
      }
    ],
    legalCitations: [
      {
        code: 'EPF & MP Act § 7A',
        title: 'Determination of Moneys Due from Employers',
        excerpt: 'The Commissioner may, by order, determine the amount due from any employer under any provision of this Act or the Scheme.',
        plainMeaning: 'Quasi-judicial powers equal to a civil court to summon records and assess employer liability.'
      }
    ],
    missingOrUncertain: [
      {
        item: 'Exact List of Uncovered Employees Claimed',
        reason: 'Notice mentions contract workers generically without appending specific names or UANs.',
        severity: 'medium',
        suggestedVerification: 'Request detailed inspection report from the inquiry officer on the first hearing date.'
      }
    ],
    sourceSnippets: [
      {
        id: 'epf-snip-1',
        section: 'Page 1, Summons Order',
        page: 1,
        originalText: 'IN THE COURT OF ASSISTANT PROVIDENT FUND COMMISSIONER, RO BENGALURU WEST. Case No: 39102/2026. Date of Hearing: 08-11-2026.',
        verifiedFact: 'Hearing scheduled before Assistant PF Commissioner on November 8, 2026.'
      }
    ],
    fileName: 'EPFO_Summon_7A_Bengaluru.pdf',
    fileSize: '950 KB'
  },
  {
    id: 'notice-roc-mca',
    title: 'ROC Show Cause Notice - Non-Filing of Annual Return (MGT-7) & Financials (AOC-4)',
    issuingAuthority: 'Registrar of Companies (ROC), Karnataka, Ministry of Corporate Affairs',
    authorityType: 'Regulatory & Labor',
    category: 'Regulatory & Labor',
    referenceNumber: 'ROC/MCA/SEC92-137/2026/P-8841',
    receivedDate: '2026-10-10',
    issueDate: '2026-10-05',
    deadlineDate: '2026-11-04',
    deadlineSource: 'ROC Notice Section 4: "Submit your explanation within 30 days failing which penal action under Section 454 shall be initiated."',
    deadlineType: 'calendar_days',
    urgency: 'upcoming',
    status: 'needs_attention',
    confidenceScore: 96,
    plainLanguageSummary:
      'The Registrar of Companies (ROC) has served a show cause notice for non-filing of E-Form AOC-4 (Financial Statements) and E-Form MGT-7 (Annual Return) for the financial year ended March 31, 2025. Under the Companies Act, failure to file triggers a continuing statutory penalty of ₹100 per day for the company and every officer in default. You have 30 days to file the forms or provide written justification.',
    whyIssued: {
      trigger: 'MCA21 V3 database flagged overdue annual filings past the statutory AGM deadline.',
      officialRationale: 'Enforcement of Sections 92 and 137 of the Companies Act, 2013.',
      businessRisk: 'Adjudication penalty of ₹10,000 plus ₹100/day up to ₹2,00,000 per director, and disqualification of DIN under Section 164(2).'
    },
    mandatoryActions: [
      {
        id: 'roc-m1',
        title: 'File Pending E-Forms AOC-4 and MGT-7 with MCA Portal',
        deadline: '2026-11-04',
        description: 'Upload signed balance sheet, auditor report, and director report with additional MCA statutory fees.',
        completed: false
      }
    ],
    suggestedPreparations: [
      {
        id: 'roc-s1',
        title: 'Obtain Practicing Company Secretary (PCS) Certification',
        timeframe: 'Within 7 business days',
        description: 'Have CS certify the Annual Return form and board resolutions.',
        completed: true
      }
    ],
    documentChecklist: [
      {
        id: 'roc-doc-1',
        name: 'Signed Financial Statements (Balance Sheet & P&L)',
        description: 'Audited statements signed by at least two directors and statutory auditor.',
        collected: true,
        mandatory: true,
        locationHint: 'Company statutory secretarial records'
      },
      {
        id: 'roc-doc-2',
        name: 'Directors Report & AGM Minutes',
        description: 'Approved minutes of Annual General Meeting.',
        collected: false,
        mandatory: true,
        locationHint: 'Board records'
      }
    ],
    legalCitations: [
      {
        code: 'Companies Act § 137(1)',
        title: 'Copy of Financial Statement to be Filed with Registrar',
        excerpt: 'A copy of the financial statements shall be filed with the Registrar within thirty days of the date of annual general meeting.',
        plainMeaning: 'Mandatory filing of company accounts with the MCA portal.'
      }
    ],
    missingOrUncertain: [
      {
        item: 'Whether Late Fee Relief Scheme Applies',
        reason: 'Notice does not state whether any MCA general immunity or late fee amnesty scheme is currently active.',
        severity: 'low',
        suggestedVerification: 'Check latest MCA circulars on mca.gov.in.'
      }
    ],
    sourceSnippets: [
      {
        id: 'roc-snip-1',
        section: 'Page 1, Violation Statement',
        page: 1,
        originalText: 'NOTICE FOR NON-COMPLIANCE OF SECTIONS 92 & 137 OF THE COMPANIES ACT, 2013. Penalty of ₹100 per day is continuing.',
        verifiedFact: 'Default identified under Sections 92 and 137 with continuing daily penalty.'
      }
    ],
    fileName: 'ROC_ShowCause_AOC4_MGT7.pdf',
    fileSize: '780 KB'
  },
  {
    id: 'notice-commercial-lease',
    title: 'Commercial Lease Default - Notice to Cure Monetary & CAM Delta Default',
    issuingAuthority: 'Phoenix Tech Park Properties Ltd. (Commercial Landlord)',
    authorityType: 'Commercial & Real Estate',
    category: 'Commercial Contract',
    referenceNumber: 'LEASE/BLDG-C/FL-4/2026-CURE',
    receivedDate: '2026-10-21',
    issueDate: '2026-10-20',
    deadlineDate: '2026-11-04',
    deadlineSource: 'Lease Cure Notice, Clause 14: "Tenant is granted fifteen (15) calendar days from receipt of this notice to cure all specified defaults."',
    deadlineType: 'calendar_days',
    urgency: 'urgent',
    status: 'needs_attention',
    confidenceScore: 98,
    plainLanguageSummary:
      'The management of Phoenix Tech Park has served a 15-day Notice to Cure under Clause 14 of your commercial lease agreement. They allege: (1) unpaid annual Common Area Maintenance (CAM) true-up and HVAC utility reconciliation of ₹1,42,800, and (2) missing renewal copy of the Commercial General Liability Insurance policy naming the landlord as co-insured. You have 15 days to remedy both issues or face lease termination.',
    whyIssued: {
      trigger: 'Commercial estate management quarterly audit identified unpaid CAM true-up balance and lapsed insurance certificate.',
      officialRationale: 'Contractual default proceedings pursuant to registered commercial lease agreement.',
      businessRisk: 'Termination of tenancy, forfeiture of security deposit, and initiation of eviction proceedings under state rent control / commercial court laws.'
    },
    mandatoryActions: [
      {
        id: 'lease-m1',
        title: 'Remit Undisputed CAM Amount or Submit Formal Audit Dispute Letter',
        deadline: '2026-11-04',
        description: 'Pay ₹1,42,800 under protest while reserving rights to inspect landlord maintenance ledger.',
        completed: false
      },
      {
        id: 'lease-m2',
        title: 'Deliver Insurance Renewal Endorsement to Landlord Estate Office',
        deadline: '2026-10-30',
        description: 'Provide renewed public liability cover certificate with Phoenix Tech Park named as additional insured.',
        completed: false
      }
    ],
    suggestedPreparations: [
      {
        id: 'lease-s1',
        title: 'Review Lease Agreement Clause 14.3 Dispute Resolution',
        timeframe: 'Immediate',
        description: 'Verify if commercial arbitration is mandated for CAM calculation disagreements.',
        completed: true
      }
    ],
    documentChecklist: [
      {
        id: 'lease-doc-1',
        name: 'Notice to Cure Letter and Hand Delivery Receipt',
        description: 'Original notice delivered to facility reception.',
        collected: true,
        mandatory: true,
        locationHint: 'Facility manager office'
      },
      {
        id: 'lease-doc-2',
        name: 'Commercial General Liability Policy Schedule',
        description: 'Policy copy issued by New India Assurance / HDFC ERGO.',
        collected: true,
        mandatory: true,
        locationHint: 'Insurance portal'
      }
    ],
    legalCitations: [
      {
        code: 'Transfer of Property Act § 111(g)',
        title: 'Determination of Lease by Forfeiture',
        excerpt: 'A lease of immovable property determines by forfeiture in case the lessee breaks an express condition.',
        plainMeaning: 'Governs landlord right of reentry upon failure to cure contractual breach.'
      }
    ],
    missingOrUncertain: [
      {
        item: 'Detailed Itemization of Landlord Electricity Utility Rate',
        reason: 'CAM bill applies flat rate per sq ft without sharing BESCOM utility bills.',
        severity: 'medium',
        suggestedVerification: 'Request building submeter readings before final payment.'
      }
    ],
    sourceSnippets: [
      {
        id: 'lease-snip-1',
        section: 'Page 1, Notice of Default',
        page: 1,
        originalText: 'YOU ARE HEREBY NOTIFIED THAT TENANT IS IN DEFAULT UNDER CLAUSE 14 OF LEASE DATED 12/04/2022. You have 15 days to cure.',
        verifiedFact: '15-day cure window running from receipt date October 21, 2026.'
      }
    ],
    fileName: 'Phoenix_Lease_Cure_Notice_2026.pdf',
    fileSize: '620 KB'
  },
  {
    id: 'notice-bbmp-license',
    title: 'BBMP Municipal Corporation - Annual Trade License Renewal & Fire Safety Notice',
    issuingAuthority: 'Bruhat Bengaluru Mahanagara Palike (BBMP) Health & Fire Bureau',
    authorityType: 'Licensing & Municipal',
    category: 'Municipal & Licensing',
    referenceNumber: 'BBMP/HLTH/TL-RENEW/2026-27/8831',
    receivedDate: '2026-10-05',
    issueDate: '2026-09-30',
    deadlineDate: '2026-11-30',
    deadlineSource: 'Municipal Notice Section 2: "Trade license renewal with NOC from Fire and Emergency Services must be submitted before November 30, 2026."',
    deadlineType: 'calendar_days',
    urgency: 'upcoming',
    status: 'in_progress',
    confidenceScore: 99,
    plainLanguageSummary:
      'The municipal corporation health department has issued an annual statutory renewal reminder for your commercial trade license. It mandates submission of an updated Fire Safety NOC and payment of the municipal trade license fee before November 30, 2026. Non-renewal after November 30 will attract a 100% late fee penalty and notice of closure.',
    whyIssued: {
      trigger: 'Annual municipal trade license renewal cycle expiration.',
      officialRationale: 'Section 353 of the Karnataka Municipal Corporations Act, 1976.',
      businessRisk: 'Premises sealing, disconnection of commercial water/electricity, and penal fine under municipal bylaws.'
    },
    mandatoryActions: [
      {
        id: 'bbmp-m1',
        title: 'Submit Online Trade License Renewal on BBMP Portal',
        deadline: '2026-11-30',
        description: 'Upload latest property tax receipt and fire safety compliance certificate.',
        completed: false
      }
    ],
    suggestedPreparations: [
      {
        id: 'bbmp-s1',
        title: 'Conduct Fire Extinguisher Refill & Tagging Inspection',
        timeframe: 'Before filing',
        description: 'Verify ABC powder extinguishers are certified and tagged within valid inspection date.',
        completed: true
      }
    ],
    documentChecklist: [
      {
        id: 'bbmp-doc-1',
        name: 'Existing Trade License Certificate (2025-26)',
        description: 'Previous year approved license number.',
        collected: true,
        mandatory: true,
        locationHint: 'Store entrance display frame'
      },
      {
        id: 'bbmp-doc-2',
        name: 'Property Tax (SAS) Paid Receipt for FY 2026-27',
        description: 'Mandatory proof of property tax payment for premises.',
        collected: true,
        mandatory: true,
        locationHint: 'Accounts tax binder'
      }
    ],
    legalCitations: [
      {
        code: 'KMC Act § 353',
        title: 'Licensing of Places for Certain Purposes',
        excerpt: 'No person shall use any premises for any of the purposes specified in Schedule X without a license from the Commissioner.',
        plainMeaning: 'Mandatory trade license requirement for all commercial establishments.'
      }
    ],
    missingOrUncertain: [
      {
        item: 'Whether Fire Safety NOC is Mandatory for Areas Under 500 Sq Meters',
        reason: 'BBMP circular dated 2024 relaxed NOC for small non-hazardous shops.',
        severity: 'low',
        suggestedVerification: 'Check exact square footage calculation on the municipal portal.'
      }
    ],
    sourceSnippets: [
      {
        id: 'bbmp-snip-1',
        section: 'Page 1, Renewal Order',
        page: 1,
        originalText: 'ANNUAL TRADE LICENSE RENEWAL NOTICE. Due Date: November 30, 2026. Late fee of 100% applicable thereafter.',
        verifiedFact: 'Statutory renewal deadline is November 30, 2026.'
      }
    ],
    fileName: 'BBMP_Trade_License_Notice_2026.pdf',
    fileSize: '540 KB'
  }
];
