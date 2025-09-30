package com.project.backend.integration.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.math.BigDecimal;
import java.util.List;


import com.project.backend.dto.ProfitDto;
import com.project.backend.entity.Cost;
import com.project.backend.entity.Income;
import com.project.backend.entity.Shipment;
import com.project.backend.exception.ResourceNotFoundException;
import com.project.backend.repository.CostRepository;
import com.project.backend.repository.IncomeRepository;
import com.project.backend.repository.ShipmentRepository;
import com.project.backend.service.implementation.ProfitServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest  // Using to load full application context
@Transactional   // Using to ensure db changes are rolled back after each test.
class ProfitServiceImplIntegrationTests {

    @Autowired
    private ProfitServiceImpl profitService;

    @Autowired
    private ShipmentRepository shipmentRepository;

    @Autowired
    private CostRepository costRepository;

    @Autowired
    private IncomeRepository incomeRepository;

    @Test
    void calculateProfitByShipmentIdShouldReturnProfit() {
        Shipment shipment = new Shipment();
        shipment.setId(4L);
        shipment.setShipmentNumber("SHIP-0044");
        shipmentRepository.save(shipment);

        Cost cost = new Cost();
        cost.setShipment(shipment);
        cost.setAmount(BigDecimal.valueOf(1500));
        costRepository.save(cost);
        assertNotNull(costRepository.sumCostByShipmentId(shipment.getId()));

        Income income = new Income();
        income.setShipment(shipment);
        income.setAmount(BigDecimal.valueOf(2500));
        incomeRepository.save(income);
        assertNotNull(incomeRepository.sumIncomeByShipmentId(shipment.getId()));

        ProfitDto profitDTO = profitService.calculateProfitByShipmentId(shipment.getId());

        assertNotNull(profitDTO);
        assertEquals(BigDecimal.valueOf(1500.00), profitDTO.getTotalCost().setScale(1));
        assertEquals(BigDecimal.valueOf(2500.00), profitDTO.getTotalIncome().setScale(1));
        assertEquals(BigDecimal.valueOf(1000.00), profitDTO.getProfitValue().setScale(1));

        // Cleanup
        incomeRepository.delete(income);
        costRepository.delete(cost);
        shipmentRepository.delete(shipment);
    }

    @Test
    void calculateProfitByShipmentIdShouldThrowExceptionWhenShipmentNotFound() {
        assertThrows(ResourceNotFoundException.class, () -> profitService.calculateProfitByShipmentId(22L));
    }

    @Test
    void calculateProfitForAllShipmentsShouldReturnProfit() {
        List<Shipment> shipments = shipmentRepository.findAll();
        assertNotNull(shipments);
        assertEquals(3, shipments.size());

        ProfitDto profitDTO = profitService.calculateTotalProfits();
        assertNotNull(profitDTO);
        assertEquals(BigDecimal.valueOf(43800.75), profitDTO.getTotalCost());
        assertEquals(BigDecimal.valueOf(60500.92), profitDTO.getTotalIncome());
        assertEquals(BigDecimal.valueOf(16700.17), profitDTO.getProfitValue());
    }

}
