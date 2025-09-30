package com.project.backend.integration.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class ProfitControllerIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testGetProfitByShipmentId() throws Exception {
        Long shipmentId = 1L;
        mockMvc.perform(get("/api/profits/{shipmentId}", shipmentId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.shipmentId").value(shipmentId))
                .andExpect(jsonPath("$.totalCost").value(33500.5))
                .andExpect(jsonPath("$.totalIncome").value(50000.25))
                .andExpect(jsonPath("$.profitValue").value(16499.75));
    }

    @Test
    void testGetTotalProfits() throws Exception {
        mockMvc.perform(get("/api/profits/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalCost").value(43800.75))
                .andExpect(jsonPath("$.totalIncome").value(60500.92))
                .andExpect(jsonPath("$.profitValue").value(16700.17));
    }
}