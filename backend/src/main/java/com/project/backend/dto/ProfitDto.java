package com.project.backend.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfitDto {

    private Long shipmentId;

    private String shipmentNumber;

    private BigDecimal totalCost;

    private BigDecimal totalIncome;

    private BigDecimal profitValue;
}
