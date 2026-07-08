# Legacy Comparison and Borrow Plan

This document compares the planned modular platform with the legacy Django app in `___django___`, and identifies what can be reused as product behavior and domain guidance.

## Current Reality (Planning Stage)

Implementation has not started yet. At this point, the repository contains planning and architecture documents, while the legacy Django app remains the strongest executable reference for product behavior.

Evidence in project docs:
- `docs/IMPLEMENTATION PLAN.md` is a phased plan with future timelines.
- `docs/TECHNICAL REQUIREMENTS DOCUMENT (TRD).md` is marked `Draft for Review`.
- `docs/BACKEND API DESIGN & ARCHITECTURE PLAN.md` is marked `Draft for Review`.

For this reason, this comparison is between:
- target modules and planned architecture, and
- proven behavior in the legacy Django implementation.

## Why Keep the Legacy App in Scope

The legacy app already encodes:
- validated user journeys,
- domain entities and relationships,
- practical dashboard grouping,
- baseline navigation and page flow.

We should borrow behavior and domain rules, not framework-specific implementation.

## Planned vs Legacy Snapshot

| Area | Planned Modular Platform (Not Started) | Legacy Django (`___django___`) | Borrow Recommendation |
| :--- | :--- | :--- | :--- |
| Auth and onboarding | Defined in PRD/TRD/API docs; implementation pending | Signup/signin/logout fully wired in `accounts/views.py` and URL config | Reuse flow sequence, field validation, and success/error states |
| User profile | Planned as role-based profile and farmer identity model | `UserProfile` includes full name, phone, farm metadata, feature toggles | Reuse profile shape as first API contract baseline |
| Crop monitoring | Planned as advisory and monitoring modules | `Crop` and `SensorData` models with dashboard chart inputs | Reuse model boundaries and metric set (soil moisture, temp, humidity) |
| Weather | Planned under advisory and farmer-facing insights | Weather dashboard with city lookup abstraction | Reuse query behavior and fallback-city pattern |
| Dashboard routing | Planned role-specific web/mobile surfaces | Clear `dashboard/crops` and `dashboard/weather` segmentation | Reuse information architecture and route grouping |
| Reporting and M&E | Planned in TRD and API architecture | Legacy includes operational dashboard patterns and summary pages | Reuse practical KPI grouping and module-level dashboard sections |

## Concrete References in Legacy

- URL composition and module boundaries:
  - `___django___/django_project/urls.py`
- Auth and dashboard behavior:
  - `___django___/accounts/views.py`
  - `___django___/accounts/models.py`
- Crop monitoring behavior and chart data prep:
  - `___django___/crop_monitoring/views.py`
  - `___django___/crop_monitoring/models.py`
  - `___django___/crop_monitoring/urls.py`
- Weather dashboard behavior:
  - `___django___/weather/views.py`
  - `___django___/weather/urls.py`
- UI structure references:
  - `___django___/templates/`

## Borrow Strategy for Pre-Implementation

1. Extract contracts before coding
- Convert Django models and flows into framework-agnostic domain contracts.
- Start with `UserProfile`, `Crop`, `SensorData`, and weather response shape.

2. Lock parity criteria in docs
- Define behavior parity at route/endpoint level before writing modules.
- Include success states, empty states, and error states from legacy behavior.

3. Build module order around legacy stability
- Implement in this order: auth/profile -> crop/weather -> dashboards/reporting.
- Keep each module shippable and testable independently.

4. Validate continuously against legacy behavior
- Compare each new endpoint/view against legacy expected output and flow.
- Track gaps in a parity tracker as implementation begins.

## What Not to Copy Directly

- Django-specific authentication/session wiring.
- Server-rendered template coupling.
- Framework-specific URL naming conventions where they conflict with API standards.

## Suggested Next Documentation Additions

- `docs/API_PARITY_CHECKLIST.md`: endpoint-level mapping from legacy behavior to new API contracts.
- `docs/DOMAIN_MODEL_MAPPING.md`: legacy model fields to new backend schema mapping.
- `docs/FEATURE_PARITY_TRACKER.md`: status board per feature area (auth, crops, weather, dashboard, reporting).
