package com.project.backend.repository;

import java.util.List;

import com.project.backend.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeRepository extends JpaRepository<Income, Long> {

    /**
     * Finds an income record by shipment ID.
     *
     * @param shipmentId ID of the shipment
     * @return income record associated with the specified shipment ID or null if not found
     */
    List<Income> findByShipmentId(Long shipmentId);
}
