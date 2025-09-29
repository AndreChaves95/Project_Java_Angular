INSERT INTO shipment (id, shipment_number) VALUES
(1, 'SHIP-001'),
(2, 'SHIP-002'),
(3, 'SHIP-003');

INSERT INTO cost (shipment_id, amount, description) VALUES
(1, 30000, 'Cars'),
(1, 3500, 'Fuel'),
(2, 7500, 'Laptops'),
(3, 2000, 'Tables'),
(3, 800, 'Chairs');

INSERT INTO income (shipment_id, amount, description) VALUES
(1, 45000, 'Cars'),
(1, 5000, 'Fuel'),
(2, 7000, 'Laptops'),
(3, 2500, 'Tables'),
(3, 1000, 'Chairs');
