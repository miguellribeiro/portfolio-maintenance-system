package br.com.pms.maintenance_system_backend.service.factory;

import br.com.pms.maintenance_system_backend.domain.Cliente;
import br.com.pms.maintenance_system_backend.domain.OrdemServico;

public abstract class OrdemServicoFactory {
    public abstract OrdemServico criarOrdemServico(Cliente cliente, String descricaoProblema);
}