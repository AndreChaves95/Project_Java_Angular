package com.project.backend.repository;

import java.math.BigDecimal;

import com.project.backend.entity.Profit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfitRepository extends JpaRepository<Profit, Long> {

    /**
     * Finds a profit record by shipment ID.
     *
     * @param shipmentId ID of the shipment
     * @return profit record associated with the specified shipment ID or null if not found
     */
    BigDecimal findByShipmentId(Long shipmentId);
}
