# Feature Suggestions & Improvements

This document contains suggestions for new features and improvements for the CGGS-UI School Management System.

## High Priority Features

### 1. User Profile Management
**Status:** Not Implemented  
**Issue:** The avatar dropdown has "Update Profile" but it's not implemented (TODO comment exists in `layout-topbar.component.ts`).  
**Impact:** Users cannot update their own information.  
**Implementation:**
- Create a profile page similar to the change password page
- Allow users to update their personal information (name, email, phone, etc.)
- Add route: `/app/profile`
- Update the `navigateToProfile()` method in topbar component

**Files to Create/Modify:**
- `src/app/pages/webapp/profile/profile.component.ts`
- `src/app/pages/webapp/profile/profile.component.html`
- `src/app/pages/webapp/profile/profile.module.ts`
- Update `src/app/pages/webapp/webapp-routing.module.ts`
- Update `src/app/shared/layout-topbar/layout-topbar.component.ts`

---

### 2. Dashboard with Analytics
**Status:** Not Implemented  
**Issue:** The dashboard component is completely empty (`dashboard.component.ts` has no implementation).  
**Impact:** No overview of system activity or key metrics.  
**Implementation:**
- Statistics cards showing:
  - Total students, staff, classes
  - Recent results/assessments
  - Active sessions
- Charts/graphs:
  - Student enrollment trends
  - Class performance metrics
  - Attendance statistics (if available)
- Recent activity feed
- Quick action buttons

**Files to Create/Modify:**
- `src/app/pages/webapp/dashboard/dashboard.component.ts`
- `src/app/pages/webapp/dashboard/dashboard.component.html`
- `src/app/pages/webapp/dashboard/dashboard.component.scss`
- Create dashboard store/effects if needed for data fetching

---

## Medium Priority Features

### 3. Bulk Operations UI
**Status:** Partially Implemented  
**Issue:** Store has `createMany`, `updateMany`, `deleteMany` actions, but no UI for bulk operations.  
**Impact:** Users must perform operations one-by-one, which is time-consuming.  
**Implementation:**
- Add checkbox selection to table component
- Bulk delete/update buttons that appear when items are selected
- Bulk import (CSV/Excel) for students, staff, etc.
- Confirmation dialogs for bulk operations

**Files to Create/Modify:**
- `src/app/shared/table/table.component.ts` - Add selection functionality
- `src/app/shared/table/table.component.html` - Add checkboxes
- Create bulk operation dialogs/components
- Update individual page components to handle bulk operations

---

### 4. Data Export Functionality
**Status:** Partially Implemented  
**Issue:** Only PDF generation exists for results; no CSV/Excel export for tables.  
**Impact:** Difficult to export data for analysis or reporting.  
**Implementation:**
- Export to CSV/Excel button on table pages
- Export filtered/search results
- Bulk export selected items
- Configurable export columns

**Files to Create/Modify:**
- Create export service: `src/app/services/export.service.ts`
- Add export buttons to table components
- Update individual page components

---

### 5. Enhanced Search and Filtering
**Status:** Basic Implementation Exists  
**Issue:** Basic search exists, but could be more powerful.  
**Impact:** Finding specific records can be slow with large datasets.  
**Implementation:**
- Advanced search with multiple criteria
- Saved search filters
- Quick filters (e.g., "Active Students", "This Term")
- Date range filters
- Multi-select filters

**Files to Create/Modify:**
- `src/app/shared/table/table.component.ts` - Enhance search
- Create advanced search component
- Update individual page components

---

## Low Priority Features

### 6. Activity/Audit Log
**Status:** Not Implemented  
**Issue:** No visible audit trail of user actions.  
**Impact:** Hard to track changes and troubleshoot issues.  
**Implementation:**
- Activity log page showing user actions
- Filter by user, date, action type
- Export audit logs
- Track: create, update, delete operations

**Files to Create/Modify:**
- Create audit log store/effects
- `src/app/pages/webapp/audit-log/audit-log.component.ts`
- `src/app/pages/webapp/audit-log/audit-log.component.html`
- Update backend API to log activities

---

### 7. Notification Center
**Status:** Basic Implementation Exists  
**Issue:** Only toast notifications; no persistent notification center.  
**Impact:** Users may miss important notifications.  
**Implementation:**
- Notification bell icon in topbar
- Notification center with unread count
- Mark as read/unread
- Notification preferences
- Real-time notifications (if WebSocket available)

**Files to Create/Modify:**
- `src/app/shared/layout-topbar/layout-topbar.component.ts` - Add notification bell
- Create notification center component
- Create notification store/effects
- Update routing

---

### 8. Form Validation Improvements
**Status:** Basic Implementation Exists  
**Issue:** Error messages could be more specific.  
**Impact:** Users may not understand validation errors.  
**Implementation:**
- Field-specific error messages
- Real-time validation feedback
- Password strength indicator
- Better error message formatting

**Files to Create/Modify:**
- `src/app/services/helper.service.ts` - Enhance `getErrorMessageHelper`
- Update form components
- Create validation utilities

---

### 9. Responsive Design Improvements
**Status:** Partially Implemented  
**Issue:** Some forms may not be fully responsive.  
**Impact:** Poor mobile experience.  
**Implementation:**
- Review and improve mobile layouts
- Touch-friendly interactions
- Mobile-optimized tables
- Responsive navigation

**Files to Create/Modify:**
- Review all component HTML files
- Update SCSS files for mobile breakpoints
- Test on various screen sizes

---

### 10. Loading States and Optimistic Updates
**Status:** Basic Implementation Exists  
**Issue:** Some operations could benefit from better loading feedback.  
**Impact:** Users may be unsure if actions are processing.  
**Implementation:**
- Skeleton loaders
- Optimistic UI updates
- Progress indicators for long operations
- Better loading state management

**Files to Create/Modify:**
- Create skeleton loader components
- Update loading states in components
- Enhance global loading facade

---

## Notes

- Priority levels are based on user impact and implementation complexity
- High priority items should be addressed first as they provide immediate value
- Medium priority items enhance productivity and user experience
- Low priority items are nice-to-have improvements

---

**Last Updated:** 2025-02-13
