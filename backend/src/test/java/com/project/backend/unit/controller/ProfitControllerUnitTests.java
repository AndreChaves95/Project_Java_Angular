package com.project.backend.unit.controller;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;

import com.project.backend.controller.ProfitController;
import com.project.backend.dto.ProfitDto;
import com.project.backend.service.IProfitService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ProfitController.class)
class ProfitControllerUnitTests {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private IProfitService profitService;

    @Test
    void calculateProfitByShipmentIdShouldReturnProfitValue() throws Exception {
        ProfitDto dto = new ProfitDto();
        dto.setShipmentId(1L);
        dto.setTotalIncome(new BigDecimal("2500.00"));
        dto.setTotalCost(new BigDecimal("800.00"));
        dto.setProfitValue(new BigDecimal("1700.00"));

        when(profitService.calculateProfitByShipmentId(1L)).thenReturn(dto);

        mockMvc.perform(get("/api/profits/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.shipmentId", is(1)))
                .andExpect(jsonPath("$.totalIncome", is(2500.00)))
                .andExpect(jsonPath("$.totalCost", is(800.00)))
                .andExpect(jsonPath("$.profitValue", is(1700.00)));
    }

    @Test
    void calculateTotalProfitsShouldReturnAllProfits() throws Exception {
        ProfitDto dto = new ProfitDto();
        dto.setTotalIncome(new BigDecimal("5000.00"));
        dto.setTotalCost(new BigDecimal("2000.00"));
        dto.setProfitValue(new BigDecimal("3000.00"));

        when(profitService.calculateTotalProfits()).thenReturn(dto);

        mockMvc.perform(get("/api/profits/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalIncome", is(5000.00)))
                .andExpect(jsonPath("$.totalCost", is(2000.00)))
                .andExpect(jsonPath("$.profitValue", is(3000.00)));
    }
}
