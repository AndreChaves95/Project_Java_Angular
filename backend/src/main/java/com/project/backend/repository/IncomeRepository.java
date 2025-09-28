package com.project.backend.repository;

import java.math.BigDecimal;

import com.project.backend.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IncomeRepository extends JpaRepository<Income, Long> {

    /**
     * Finds an income record by shipment ID.
     *
     * @param shipmentId ID of the shipment
     * @return income record associated with the specified shipment ID or null if not found
     */
    @Query("SELECT COALESCE(SUM(i.amount), 0) FROM Income i WHERE i.shipment.id = :shipmentId")
    BigDecimal sumIncomeByShipmentId(@Param("shipmentId") Long shipmentId);
}
