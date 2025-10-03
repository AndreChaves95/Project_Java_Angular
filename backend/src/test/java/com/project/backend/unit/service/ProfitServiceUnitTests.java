package com.project.backend.unit.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import com.project.backend.dto.ProfitDto;
import com.project.backend.entity.Profit;
import com.project.backend.entity.Shipment;
import com.project.backend.exception.ResourceNotFoundException;
import com.project.backend.repository.CostRepository;
import com.project.backend.repository.IncomeRepository;
import com.project.backend.repository.ProfitRepository;
import com.project.backend.repository.ShipmentRepository;
import com.project.backend.service.implementation.ProfitServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ProfitServiceUnitTests {

    private ProfitRepository profitRepository;
    private ShipmentRepository shipmentRepository;
    private CostRepository costRepository;
    private IncomeRepository incomeRepository;

    private ProfitServiceImpl profitService;

    @BeforeEach
    void setup() {
        profitRepository = mock(ProfitRepository.class);
        shipmentRepository = mock(ShipmentRepository.class);
        costRepository = mock(CostRepository.class);
        incomeRepository = mock(IncomeRepository.class);

        profitService = new ProfitServiceImpl(
                profitRepository, shipmentRepository, costRepository, incomeRepository
        );
    }

    @Test
    void calculateProfitByShipmentIdShouldReturnProfit() {
        Long shipmentId = 1L;
        Shipment shipment = new Shipment();
        shipment.setId(shipmentId);

        when(shipmentRepository.findShipmentById(shipmentId)).thenReturn(Optional.of(shipment));
        when(costRepository.sumCostByShipmentId(shipmentId)).thenReturn(new BigDecimal("800.00"));
        when(incomeRepository.sumIncomeByShipmentId(shipmentId)).thenReturn(new BigDecimal("2500.00"));
        when(profitRepository.findByShipmentId(shipmentId)).thenReturn(null);

        ProfitDto result = profitService.calculateProfitByShipmentId(shipmentId);

        assertEquals(shipmentId, result.getShipmentId());
        assertEquals(new BigDecimal("2500.00"), result.getTotalIncome());
        assertEquals(new BigDecimal("800.00"), result.getTotalCost());
        assertEquals(new BigDecimal("1700.00"), result.getProfitValue());

        verify(profitRepository).save(any(Profit.class));
    }

    @Test
    void calculateProfitByShipmentIdShouldThrowExceptionWhenShipmentNotFound() {
        when(shipmentRepository.findShipmentById(anyLong())).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> profitService.calculateProfitByShipmentId(99L));
    }

    @Test
    void calculateTotalProfitsShouldReturnAllProfitsTotalValue() {
        Shipment shipment1 = new Shipment();
        shipment1.setId(11L);
        Shipment shipment2 = new Shipment();
        shipment2.setId(22L);

        when(shipmentRepository.findAll()).thenReturn(List.of(shipment1, shipment2));
        when(costRepository.sumCostByShipmentId(shipment1.getId())).thenReturn(new BigDecimal("500.00"));
        when(costRepository.sumCostByShipmentId(shipment2.getId())).thenReturn(new BigDecimal("200.00"));
        when(incomeRepository.sumIncomeByShipmentId(shipment1.getId())).thenReturn(new BigDecimal("1000.00"));
        when(incomeRepository.sumIncomeByShipmentId(shipment2.getId())).thenReturn(new BigDecimal("800.00"));

        ProfitDto result = profitService.calculateTotalProfits();

        assertEquals(new BigDecimal("1800.00"), result.getTotalIncome());
        assertEquals(new BigDecimal("700.00"), result.getTotalCost());
        assertEquals(new BigDecimal("1100.00"), result.getProfitValue());
    }

    @Test
    void calculateTotalProfitsShouldThrowExceptionWhenNoShipmentsFound() {
        when(shipmentRepository.findAll()).thenReturn(List.of());

        assertThrows(ResourceNotFoundException.class,
                () -> profitService.calculateTotalProfits());
    }
}
