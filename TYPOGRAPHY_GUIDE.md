# Typography System Documentation

## Overview

Standardized typography system implemented across all dashboard components ensuring consistent sizing and hierarchy.

## Typography Classes (Defined in `src/styles/globals.css`)

### Heading Styles

| Class        | Usage                          | Size             | Weight           | Example                          |
| ------------ | ------------------------------ | ---------------- | ---------------- | -------------------------------- |
| `heading-lg` | Section titles (cards, panels) | 18px (text-lg)   | Bold (font-bold) | "Today's Classes", "Assignments" |
| `heading-md` | Component titles               | 16px (text-base) | Semibold         | Sidebar items, card titles       |
| `heading-sm` | Item headings within cards     | 14px (text-sm)   | Semibold         | Alert titles, exam titles        |

### Body & Text Styles

| Class          | Usage                    | Size           | Weight   | Color    |
| -------------- | ------------------------ | -------------- | -------- | -------- |
| `body-text`    | Main descriptive text    | 14px (text-sm) | Regular  | Gray-600 |
| `caption-text` | Small informational text | 12px (text-xs) | Regular  | Gray-600 |
| `label-text`   | Labels & metadata        | 12px (text-xs) | Semibold | Gray-700 |
| `muted-text`   | Subtle/secondary text    | 12px (text-xs) | Regular  | Gray-500 |

## Component Font Size Mapping

### Dashboard Page

- **Section Heading**: `heading-lg` (18px, bold) - "Today's Classes", "Assignments"
- **Subtitle/Meta**: `muted-text` (12px, regular) - dates, descriptions
- **Stats Title**: `caption-text` (12px, regular)
- **Stats Value**: 24px (text-2xl, bold) - numerical values

### Cards

- **Card Title**: `heading-lg` (18px, bold)
- **Card Subtitle**: `body-text` (14px, regular)
- **Item Title**: `heading-sm` (14px, semibold)
- **Item Description**: `caption-text` or `body-text`
- **Metadata**: `muted-text` (12px, regular)

### Alerts & Badges

- **Alert Title**: `heading-sm` (14px, semibold)
- **Alert Message**: `body-text` (14px, regular)
- **Badge Labels**: `label-text` (12px, semibold)
- **Timestamps**: `muted-text` (12px, regular)

### Header

- **Logo Text**: `heading-md` (16px, semibold)
- **Logo Subtitle**: `muted-text` (12px, regular)
- **User Name**: `heading-sm` (14px, semibold)
- **User Role**: `muted-text` (12px, regular)

### Lists & Tables

- **Row Title**: `heading-sm` (14px, semibold)
- **Row Meta**: `caption-text` (12px, regular)
- **List Item**: `caption-text` (12px, regular)

## Implementation Examples

### Before (Inconsistent)

```tsx
<h2 className="text-lg font-bold text-gray-900">Title</h2>
<p className="text-sm text-gray-600">Subtitle</p>
<span className="text-xs text-gray-600">Meta</span>
```

### After (Consistent)

```tsx
<h2 className="heading-lg">Title</h2>
<p className="body-text">Subtitle</p>
<span className="muted-text">Meta</span>
```

## Responsive Considerations

All typography sizes are consistent across breakpoints. No responsive typography changes are applied to maintain visual hierarchy.

## Benefits

✅ **Consistency**: Uniform font sizing across all components  
✅ **Accessibility**: Proper hierarchy for screen readers  
✅ **Maintainability**: Single source of truth for typography  
✅ **Scalability**: Easy to adjust sizes globally  
✅ **Professional Look**: Clean, polished visual appearance

## Components Updated (Jan 30, 2026)

- ✅ Header
- ✅ Sidebar
- ✅ WelcomeSection
- ✅ StatCard
- ✅ QuickActions
- ✅ TodayClasses
- ✅ AssignmentsTasks
- ✅ RecentGrades
- ✅ AttendanceByCourse
- ✅ AttendanceOverview
- ✅ EnrolledModulesTable
- ✅ FinancialStatus
- ✅ Avatar
- ✅ IconButton
- ✅ SearchBar

## Future Consistency Checks

When adding new components, apply these typography classes:

1. **Main Title** → `heading-lg`
2. **Subtitle/Description** → `body-text` or `muted-text`
3. **Item Titles** → `heading-sm`
4. **Small Labels** → `label-text` or `caption-text`
5. **Metadata** → `muted-text`
