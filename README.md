# Project_Java_Angular
This backend implements the “Calculate Profit” use case, allowing users to calculate shipment profit values based on income and cost inputs.
The goal is to expose simple, well-structured REST endpoints that perform the necessary calculations accurately and cleanly.

## Implemented Endpoints
- GET: /api/profits/{shipmentId} -> Calculates the profit for an existing shipment based on its stored costs and incomes.
- GET: /api/profits/all -> Aggregates the total profits from all shipments.
- POST: /api/profits/calculate -> Calculates the profit on demand using manual input (income, cost, additionalCost) without saving it to the database.

## Design Decisions

- Layered structure chosen instead of Clean Architecture for simplicity and readability — the use case is small and focused.

- BigDecimal used for all financial operations to ensure precision and avoid rounding errors.

- DTOs and Mappers used to isolate the API layer from persistence models.

- Exception handling implemented for missing shipments and invalid operations, ensuring clear API responses.
