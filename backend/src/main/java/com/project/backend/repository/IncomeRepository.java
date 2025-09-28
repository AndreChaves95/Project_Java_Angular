package com.project.backend.repository;

import java.math.BigDecimal;
import java.util.Optional;

import com.project.backend.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeRepository extends JpaRepository<Income, Long> {

    /**
     * Finds an income record by shipment ID.
     *
     * @param shipmentId ID of the shipment
     * @return income record associated with the specified shipment ID or null if not found
     */
    Optional<BigDecimal> findByShipmentId(Long shipmentId);
}
