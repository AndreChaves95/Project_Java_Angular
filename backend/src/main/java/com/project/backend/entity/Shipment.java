package com.project.backend.entity;

import java.util.ArrayList;
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

    private String reference;

    @OneToMany(mappedBy = "shipment", cascade = CascadeType.ALL)
    private List<Income> incomes = new ArrayList<>();

    @OneToMany(mappedBy = "shipment", cascade = CascadeType.ALL)
    private List<Cost> costs = new ArrayList<>();

    @OneToOne(mappedBy = "shipment", cascade = CascadeType.ALL)
    private Profit profit;
}
