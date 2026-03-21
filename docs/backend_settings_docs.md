# Backend Settings Documentation

This document describes the backend endpoints (Server Actions) used to manage dynamic settings for Mentorship and VIP Signals.

## Mentorship Settings

### `getMentorshipSettings()`
- **Type**: Server Action
- **Description**: Fetches current mentorship configuration.
- **Returns**: `Promise<{ registrationOpenDate: string | null, productSlug: string }>`

### `updateMentorshipSettings(data)`
- **Type**: Server Action
- **Description**: Updates the mentorship configuration.
- **Arguments**:
  - `registrationOpenDate`: ISO date string or `null`.
  - `productSlug`: WooCommerce product slug (e.g., `standard-mentorship`).
- **Returns**: `Promise<{ success: boolean }>`

---

## VIP Signals Settings

### `getVIPSettings()`
- **Type**: Server Action
- **Description**: Fetches current VIP configuration including plan links.
- **Returns**: `Promise<VIPSettings>`

### `updateVIPSettings(data)`
- **Type**: Server Action
- **Description**: Updates the VIP configuration.
- **Arguments**: `VIPSettings` object.
- **Returns**: `Promise<{ success: boolean }>`

---

## Storage
All settings are stored as JSON files on the server:
- `mentorship-settings.json`
- `vip-settings.json`
