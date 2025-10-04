package com.project.backend.mapper;

import com.project.backend.dto.ProfitDto;
import com.project.backend.entity.Profit;

public class ProfitMapper {

    public static ProfitDto mapToDto(Profit profit) {
        if (profit == null) {
            return null;
        }

       return new ProfitDto(
               profit.getShipment().getId(),
               profit.getTotalCost(),
               profit.getTotalIncome(),
               profit.getProfitValue());
    }
}
