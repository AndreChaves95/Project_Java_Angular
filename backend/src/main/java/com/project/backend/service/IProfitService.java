package com.project.backend.service;

import com.project.backend.dto.ProfitDto;

public interface IProfitService {

    public ProfitDto calculateProfitByShipmentId(Long shipmentId);
    
    public ProfitDto calculateTotalProfits();
}
