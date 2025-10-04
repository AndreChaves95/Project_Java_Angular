package com.project.backend.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Shipment {

    @Id
    private Long id;

    @OneToMany(mappedBy = "shipment", cascade = CascadeType.ALL)
    private List<Income> incomes;

    @OneToMany(mappedBy = "shipment", cascade = CascadeType.ALL)
    private List<Cost> costs;

    @OneToOne(mappedBy = "shipment", cascade = CascadeType.ALL)
    private Profit totalProfit;
}
