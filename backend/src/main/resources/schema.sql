CREATE TABLE IF NOT EXISTS shipment (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    shipment_number VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS cost (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    shipment_id BIGINT NOT NULL,
    amount DECIMAL(10,2),
    description VARCHAR(255),
    FOREIGN KEY (shipment_id) REFERENCES shipment(id)
);

CREATE TABLE IF NOT EXISTS income (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    shipment_id BIGINT NOT NULL,
    amount DECIMAL(10,2),
    description VARCHAR(255),
    FOREIGN KEY (shipment_id) REFERENCES shipment(id)
);

CREATE TABLE IF NOT EXISTS profit (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    shipment_id BIGINT NOT NULL,
    total_income DECIMAL(10,2),
    total_cost DECIMAL(10,2),
    profit_value DECIMAL(10,2),
    FOREIGN KEY (shipment_id) REFERENCES shipment(id)
);