package com.project.backend.entity;

import java.math.BigDecimal;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass // To indicate it is not an entity but attributes inherited by classes extending it
@Getter
@Setter
public class BaseEntity {

    private BigDecimal amount;

    private String description;
}
