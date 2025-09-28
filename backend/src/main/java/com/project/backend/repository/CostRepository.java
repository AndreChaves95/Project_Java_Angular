package com.project.backend.repository;

import java.math.BigDecimal;

import com.project.backend.entity.Cost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CostRepository extends JpaRepository<Cost, Long> {

    /**
     * Finds a cost record by shipment ID.
     *
     * @param shipmentId ID of the shipment
     * @return cost record associated with the specified shipment ID or null if not found
     */
    @Query("SELECT COALESCE(SUM(c.amount), 0) FROM Cost c WHERE c.shipment.id = :shipmentId")
    BigDecimal sumCostByShipmentId(@Param("shipmentId") Long shipmentId);
}
