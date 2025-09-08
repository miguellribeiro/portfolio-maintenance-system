package br.com.pms.maintenance_system_backend.service.strategy;

import br.com.pms.maintenance_system_backend.domain.OrdemServico;
import java.math.BigDecimal;

public interface CalculoCustoStrategy {
    BigDecimal calcular(OrdemServico os);
}