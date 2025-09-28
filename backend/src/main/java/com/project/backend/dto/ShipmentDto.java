package com.project.backend.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShipmentDto {

    private Long shipmentId;

    private String shipmentNumber;

    private BigDecimal income;

    private BigDecimal cost;
}
