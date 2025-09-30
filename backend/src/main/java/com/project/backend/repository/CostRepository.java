package com.project.backend.repository;

import java.math.BigDecimal;

import com.project.backend.entity.Cost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CostRepository extends JpaRepository<Cost, Long> {

    /**
     * Finds the total cost associated with a specific shipment.
     * Used COALESCE function to return 0 if no cost records are found.
     *
     * @param shipmentId ID of the shipment
     * @return the cost record associated with the shipment
     */
    @Query("SELECT COALESCE(SUM(c.amount), 0) FROM Cost c WHERE c.shipment.id = :shipmentId")
    BigDecimal sumCostByShipmentId(@Param("shipmentId") Long shipmentId);
}
