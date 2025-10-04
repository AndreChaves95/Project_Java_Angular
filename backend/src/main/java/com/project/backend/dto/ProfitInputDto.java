package com.project.backend.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfitInputDto {

    private Long shipmentId;

    private BigDecimal income;

    private BigDecimal cost;

    private BigDecimal additionalCost;
}
