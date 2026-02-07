# Small Parcel Page Implementation

## Overview

This page implements the complete UI for the OMS Small Parcel management system, matching the design specifications.

## Components Implemented

### Main Page (`index.tsx`)
- **Sidebar Navigation**: Dark-themed sidebar with "Logistics" section
- **Page Header**: Title and description text
- **Toolbar**: 
  - Search input for Airbill No, Customer Name, or Billing Ref
  - Advanced Search button
  - Column Settings dropdown
  - Export button
- **Filter Bar**:
  - "Include Archived Orders" checkbox (positioned left of "Active Filters:")
  - Active filters display with removable tags
  - "Clear All" button
- **Order Table**:
  - All 12 required columns
  - Status tags with color coding
  - Pagination (10/20/50/100 items per page)
  - Horizontal scroll for smaller screens
  - Total items count

## Features

### Current Implementation
- ✅ Complete page layout matching design
- ✅ All table columns (AIRBILL NO, CUSTOMER NAME, BILLING REF, STATUS, SERVICE TYPE, SERVICE CENTER, FROM CITY, TO CITY, TO ATTN, TO ZIP, CREATE TIME, LAST OPERATION TIME)
- ✅ "Include Archived Orders" checkbox
- ✅ Active filters display
- ✅ Search input
- ✅ Toolbar buttons
- ✅ Pagination with configurable page sizes
- ✅ Mock data for demonstration
- ✅ Responsive design with horizontal scroll

### Next Steps (Task 3+)
- Connect to backend API for real data
- Implement search functionality
- Implement advanced search dialog
- Implement column settings dialog
- Implement export functionality
- Add permission-based visibility for archived orders checkbox
- Add loading states
- Add error handling

## Mock Data

The page currently displays 2 mock orders to demonstrate the layout and functionality. This will be replaced with real API data in subsequent tasks.

## Styling

Custom styles are defined in `index.css`:
- Table header styling
- Hover effects
- Responsive design for screens < 1280px
- Sidebar theming

## Testing

Unit tests are provided in `index.test.tsx` to verify:
- Page title and description rendering
- Search input presence
- Checkbox visibility
- Toolbar buttons
- Table columns
- Mock data display

## Dependencies

Required packages:
- `antd`: UI component library
- `@ant-design/icons`: Icon components
- `react`: Core framework
- `react-redux`: State management

Make sure to run `npm install` to install the `@ant-design/icons` package if not already installed.
