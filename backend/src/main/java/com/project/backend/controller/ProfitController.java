package com.project.backend.controller;

import com.project.backend.dto.ProfitDto;
import com.project.backend.service.IProfitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profits")
@CrossOrigin(origins = "http://localhost:4200")
public class ProfitController {

    private final IProfitService profitService;

    public ProfitController(IProfitService profitService) {
        this.profitService = profitService;
    }

    @GetMapping("/{shipmentId}")
    public ResponseEntity<ProfitDto> calculateProfitByShipmentId(@PathVariable Long shipmentId) {
        return ResponseEntity.ok(profitService.calculateProfitByShipmentId(shipmentId));
    }

    @GetMapping("/all")
    public ResponseEntity<ProfitDto> calculateTotalProfits() {
        return ResponseEntity.ok(profitService.calculateTotalProfits());
    }
}
