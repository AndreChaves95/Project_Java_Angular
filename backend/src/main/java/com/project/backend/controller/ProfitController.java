package com.project.backend.controller;

import com.project.backend.dto.ProfitDto;
import com.project.backend.dto.ShipmentDto;
import com.project.backend.service.IProfitService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/create")
    public ResponseEntity<ShipmentDto> createShipment(@RequestBody ShipmentDto shipmentDto) {
        //profitService.createShipment(shipmentDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(shipmentDto);
    }
}
