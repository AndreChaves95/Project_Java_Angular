package com.project.backend.service;

import java.util.List;

import com.project.backend.dto.ProfitDto;

public interface IProfitService {

    public ProfitDto calculateProfitByShipmentId(Long shipmentId);
    
    public ProfitDto calculateTotalProfits();
}
