# Backend Documentation: VIP Signals Product & Variations

To support the dynamic population of the VIP Signals Plan Modal, the backend needs to provide a product structure with specific variations.

## Recommended Product Structure (WooCommerce/Custom API)

### Base Product: `VIP Signals Membership`
- **Slug**: `vip-membership`
- **Type**: `variable` (Variable Product)

### Attributes
- **Attribute Name**: `Plan Duration` (or similar)
- **Values**: `1 Month`, `12 Months`, `Unlimited`

### Variations

Each variation should have the following metadata/custom fields to populate the UI correctly:

| Field | Description | Example (Plan 1) | Example (Plan 2) | Example (Plan 3) |
| :--- | :--- | :--- | :--- | :--- |
| **Title** | The display title of the plan | 1 Month | 12 Months | Unlimited |
| **Price** | The price of the variation | 199 | 299 | 499 |
| **Badge** | The badge text shown at the top left | STARTER | BEST VALUE | BEST DEAL |
| **Popular Badge**| Optional flag/text for the top right | (None) | MOST POPULAR | (None) |
| **Is Highlighted**| Boolean to trigger the golden glow | `false` | `true` | `false` |
| **Button Text** | Text for the CTA button | Get 1 Month Access | Get 12 Months Access | Get Lifetime Access |

## API Integration Note

The frontend currently uses mock data in `VIPPlanModal.tsx`. To make this dynamic:
1. Fetch the product by slug `vip-membership`.
2. Map the `variations` array from the API response to the `plans` array in the component.
3. Ensure the custom fields (metadata) are included in the variation response.

### Example Variation Response Schema
```json
{
  "id": 1001,
  "title": "12 Months",
  "price": "299",
  "meta_data": [
    { "key": "vip_badge", "value": "BEST VALUE" },
    { "key": "vip_popular_badge", "value": "MOST POPULAR" },
    { "key": "vip_highlight", "value": "true" },
    { "key": "vip_button_text", "value": "Get 12 Months Access" }
  ]
}
```
