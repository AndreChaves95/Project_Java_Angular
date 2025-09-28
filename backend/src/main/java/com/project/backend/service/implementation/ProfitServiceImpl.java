package com.project.backend.service.implementation;

import java.math.BigDecimal;
import java.util.List;

import com.project.backend.dto.ProfitDto;
import com.project.backend.entity.Profit;
import com.project.backend.entity.Shipment;
import com.project.backend.exception.ResourceNotFoundException;
import com.project.backend.mapper.ProfitMapper;
import com.project.backend.repository.CostRepository;
import com.project.backend.repository.IncomeRepository;
import com.project.backend.repository.ProfitRepository;
import com.project.backend.repository.ShipmentRepository;
import com.project.backend.service.IProfitService;
import org.springframework.stereotype.Service;

@Service
public class ProfitServiceImpl implements IProfitService {

    private final ProfitRepository profitRepository;

    private final ShipmentRepository shipmentRepository;

    private final CostRepository costRepository;

    private final IncomeRepository incomeRepository;

    public ProfitServiceImpl(ProfitRepository profitRepository, ShipmentRepository shipmentRepository,
                             CostRepository costRepository, IncomeRepository incomeRepository) {
        this.profitRepository = profitRepository;
        this.shipmentRepository = shipmentRepository;
        this.costRepository = costRepository;
        this.incomeRepository = incomeRepository;
    }

    @Override
    public ProfitDto calculateProfitByShipmentId(Long shipmentId) {
        Shipment shipment = shipmentRepository.findShipmentById(shipmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment", shipmentId));

        var cost = costRepository.findByShipmentId(shipmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Cost", shipmentId));
        var income = incomeRepository.findByShipmentId(shipmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Income", shipmentId));

        BigDecimal profitValue = income.subtract(cost);
        Profit profit = new Profit();
        profit.setShipment(shipment);
        profit.setTotalCost(cost);
        profit.setTotalIncome(income);
        profit.setProfitValue(profitValue);
        // Need to validate if already exists on database (data.sql)
        if (!profitRepository.existsById(shipmentId)) {
            profit = profitRepository.save(profit);
        }
        return ProfitMapper.mapToDto(profit);
    }

    @Override
    public List<ProfitDto> calculateTotalProfits(List<Long> shipmentIds) {
        return List.of();
    }
}
