# Simormawa — Design Brief

## Register
Product. Dashboard-heavy management tool for student organization operations.

## Product Purpose
Simormawa is the internal management system for a UKM/HIMA-level student organization at UISI. It replaces manual WhatsApp-based tracking and spreadsheet-driven reporting with a structured, role-based platform. The system manages the full lifecycle of work programs (proker) — planning, execution, evaluation, budgeting, and reporting.

## Users & Context

| Role | Pressure | Primary Job |
|---|---|---|
| **BPH** | Oversight, trust, visibility | Monitor all proker progress, evaluate outcomes, approve budgets |
| **Kadiv** | Accountability, deadlines | Assign PIC, evaluate their division's proker via KPI/KPA forms |
| **PIC/Staff** | Execution, reminders | Execute proker, upload docs, report progress |
| **Bendahara** | Accuracy, audit trail | Track budget submissions, monitor cash position |
| **Sekretaris** | Completeness, order | Generate LPJ reports, archive evaluation history |
| **Admin** | System health | Manage user accounts, roles |

Most users are not technical. Many access via smartphone. The interface must feel familiar — not like enterprise software.

## Key User Jobs

- **Monitor** (BPH, Kadiv, Bendahara) — status dashboards, financial position, evaluation summaries
- **Operate** (PIC, Kadiv) — create and update work programs, submit evaluations, upload documents
- **Decide** (BPH, Bendahara) — evaluate KPI/KPA scores, approve budget submissions

## Voice

- **Concrete, not bureaucratic.** This is a student organization tool, not SAP. "Daftar Proker", not "Work Program Registry".
- **Calm, respected, direct.** The tone of a good ketua — clear about deadlines and rules, not cold.
- **No enthusiasm exclamation.** Save for graduation night.
- **Indonesian interface labels.** The product is Indonesian. Navigation, buttons, empty states, and error messages speak Indonesian. Code remains in English; visible UI text is Indonesian.

## Anti-References / Drift to Refuse

- Do not look like an ERP or SAP-clone. This is not for a corporation.
- Do not look like a generic SaaS dashboard in cream-and-purple or blue-and-white.
- Do not use those box-heavy card grids that signal a starter template.
- Do not default to one-size-fits-all hero + cards + pill buttons composition.
- The student org context is real. Avoid corporate photography, stock illustrations, or "team of professionals" imagery.
- No gradient CTA buttons or heavy drop shadows — this is a daily tool, not a launch page.

## Design Principles

1. **One team, one surface.** All roles share the same app shell. The role determines what is visible, not a different theme or layout.
2. **Status is the narrator.** The most important thing on every screen is what state things are in. Status badges, timeline indicators, and progress bars should be the first thing the eye finds.
3. **Mobile is not an afterthought.** PICs and staff access from phone. The core flows (status update, doc upload, deadline view) must work comfortably on a 375px screen.
4. **Every table needs a purpose.** If a screen lists items, the columns should answer the question the user has in that moment — not mirror the database schema.
5. **Three levels of hierarchy always:** heading / summary / detail. Never two, never four.

## Framework & UI Library

- **Framework:** Vue.js (composition API). Not React/NextJS.
- **Build tool:** Vite.
- **UI library:** Ant Design Vue. Use Ant Design components as the primary building block for forms, tables, modals, buttons, and navigation.
- **Router:** Vue Router.
- **State management:** Pinia.

## Color Palette (fixed)

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#F9F7F7` | Main background, page canvas |
| `--color-surface` | `#DBE2EF` | Card, sidebar, elevated surfaces |
| `--color-primary` | `#3F72AF` | Primary actions, active nav, links, focus |
| `--color-primary-dark` | `#112D4E` | Text, headings, top nav bar, high-emphasis elements |

The palette is fixed per project direction. No additional hues enter the core set. Status colors for proker (NOT_STARTED, IN_PROGRESS, COMPLETED, ON_HOLD) use Ant Design's built-in status color tokens tinted to match the palette's temperature.

**Contrast guarantees (on #F9F7F7 bg):**
- `#112D4E` text at 16px → ~12:1 — passes everything
- `#3F72AF` text at 16px → ~4.8:1 — passes AA, fails AAA
- `#3F72AF` text at 14px bold → ~4.8:1 — passes AA
- Use `#112D4E` for body text. Reserve `#3F72AF` for interactive elements only, never for paragraph copy.

## Typography

- **Font family:** `'Segoe UI', system-ui, -apple-system, sans-serif`
- **Weights:** 400 (regular) for body, 600 (semibold) for headings, 700 (bold) for display/title only
- **Scale:** 14px body, 16px large body, 20px H3, 24px H2, 32px H1
- **Monospace:** `'Cascadia Code', 'JetBrains Mono', 'Segoe UI Mono', monospace` for code or numeric data only

## Login Page Layout

- **Split layout**, exactly two halves:
  - **Left (50%):** Full-bleed image. The image should be relevant to the organization context — a candid photo of student activity, not a corporate stock photo. No text overlay on the image itself.
  - **Right (50%):** Centered login/register form panel. White background (`#F9F7F7`). Contains: app logo/mark, heading ("Masuk" / "Daftar"), email + password fields, submit button, link to toggle login↔register.
- On mobile (<768px): image collapses entirely. The form takes full width with the logo and heading at top.

## Visual Foundation

- **Register base:** Product. Colors are applied consistently across the surface.
- **Status colors:** Each of the four proker statuses gets a distinct, accessible hue. These are the most-used color signals in the app.
- **Role as a tag, not a layout switch.** Role determines content, not the coat of paint.
- **Forms:** Inline validation, label always visible (not placeholder). One column on mobile.
- **Empty states:** Teach what belongs here and how to fill it.

## Component Rules

- **Status badge** — `a-tag` from Ant Design, compact, small size, background tint only.
- **Tables** — `a-table` from Ant Design, no alternating row stripes, `bordered={false}`.
- **Data cards** — `a-card` from Ant Design, used only for dashboard summary tiles. Not for list items.
- **Buttons** — `a-button` from Ant Design, one verb per button. Destructive = `danger` prop.
- **File upload** — `a-upload` from Ant Design with drag-and-drop. Show format + size limits before upload.
- **Navigation** — `a-layout-sider` + `a-menu` for sidebar, `a-breadcrumb` for secondary nav.
- **Form sections** — separated by `a-divider` or weight of spacing. No card-in-card patterns.
