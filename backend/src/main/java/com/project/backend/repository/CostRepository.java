package com.project.backend.repository;

import java.math.BigDecimal;
import java.util.Optional;

import com.project.backend.entity.Cost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CostRepository extends JpaRepository<Cost, Long> {

    /**
     * Finds a cost record by shipment ID.
     *
     * @param shipmentId ID of the shipment
     * @return cost record associated with the specified shipment ID or null if not found
     */
    Optional<BigDecimal> findByShipmentId(Long shipmentId);
}
