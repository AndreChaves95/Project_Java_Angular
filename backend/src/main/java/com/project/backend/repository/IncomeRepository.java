package com.project.backend.repository;

import java.math.BigDecimal;

import com.project.backend.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IncomeRepository extends JpaRepository<Income, Long> {

    /**
     * Finds the total income associated with a specific shipment.
     * Used COALESCE function to return 0 if no income records are found.
     *
     * @param shipmentId ID of the shipment
     * @return the income record associated with the shipment
     */
    @Query("SELECT COALESCE(SUM(i.amount), 0) FROM Income i WHERE i.shipment.id = :shipmentId")
    BigDecimal sumIncomeByShipmentId(@Param("shipmentId") Long shipmentId);
}
