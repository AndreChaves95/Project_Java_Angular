package com.project.backend.service.implementation;

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

        var cost = costRepository.sumCostByShipmentId(shipmentId);
        var income = incomeRepository.sumIncomeByShipmentId(shipmentId);
        var profitValue = income.subtract(cost);
        // check if exists
        Profit profit = profitRepository.findByShipmentId(shipmentId);
        if (profit == null) {
            profit = new Profit();
            profit.setShipment(shipment);
        }
        profit.setTotalCost(cost);
        profit.setTotalIncome(income);
        profit.setProfitValue(profitValue);
        profitRepository.save(profit);

        return ProfitMapper.mapToDto(profit);
    }

    @Override
    public List<ProfitDto> calculateTotalProfits(List<Long> shipmentIds) {
        return List.of();
    }
}
