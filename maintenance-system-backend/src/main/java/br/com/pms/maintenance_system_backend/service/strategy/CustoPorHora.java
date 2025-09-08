package br.com.pms.maintenance_system_backend.service.strategy;

import br.com.pms.maintenance_system_backend.domain.OrdemServico;
import java.math.BigDecimal;

public class CustoPorHora implements CalculoCustoStrategy {

    private static final BigDecimal VALOR_HORA = new BigDecimal("150.00");

    @Override
    public BigDecimal calcular(OrdemServico os) {
        BigDecimal horasEstimadas = new BigDecimal("2");
        return VALOR_HORA.multiply(horasEstimadas);
    }
}