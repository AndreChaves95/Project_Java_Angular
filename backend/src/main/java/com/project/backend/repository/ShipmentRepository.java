package com.project.backend.repository;

import com.project.backend.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipmentRepository extends JpaRepository<Shipment, Long> {

    /**
     * Finds a shipment by ID.
     *
     * @param shipmentId ID of the shipment
     * @return shipment with the specified ID or null if not found
     */
    Shipment findShipmentById(Long shipmentId);
}
