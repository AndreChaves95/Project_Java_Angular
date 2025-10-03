package com.project.backend.entity;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne    // Used this because each Shipment has his own Profit
    @JoinColumn(name = "shipment_id", nullable = false)
    private Shipment shipment;

    private String shipmentNumber;

    private BigDecimal totalCost;

    private BigDecimal totalIncome;

    private BigDecimal profitValue;
}
