-- Clear existing data to prevent primary key violations
DELETE FROM shipment;
DELETE FROM cost;
DELETE FROM income;
DELETE FROM profit;

-- Reset auto-increment sequences
ALTER TABLE shipment ALTER COLUMN id RESTART WITH 1;
ALTER TABLE cost ALTER COLUMN id RESTART WITH 1;
ALTER TABLE income ALTER COLUMN id RESTART WITH 1;
ALTER TABLE profit ALTER COLUMN id RESTART WITH 1;

INSERT INTO shipment (id, shipment_number) VALUES
(1, 'SHIP-001'),
(2, 'SHIP-002'),
(3, 'SHIP-003');

INSERT INTO cost (shipment_id, amount, description) VALUES
(1, 30000, 'Cars'),
(1, 3500.50, 'Fuel'),
(2, 7500, 'Laptops'),
(3, 2000, 'Tables'),
(3, 800.25, 'Chairs');

INSERT INTO income (shipment_id, amount, description) VALUES
(1, 45000, 'Cars'),
(1, 5000.25, 'Fuel'),
(2, 7000, 'Laptops'),
(3, 2500.52, 'Tables'),
(3, 1000.15, 'Chairs');
