package br.com.pms.maintenance_system_backend.service.factory;

import br.com.pms.maintenance_system_backend.domain.Cliente;
import br.com.pms.maintenance_system_backend.domain.OrdemServico;
import br.com.pms.maintenance_system_backend.enums.StatusOS;
import java.time.LocalDateTime;

public class OrdemCorretivaFactory extends OrdemServicoFactory {
  @Override
  public OrdemServico criarOrdemServico(Cliente cliente, String descricaoProblema) {
    OrdemServico os = new OrdemServico();
    os.setTipo("Corretiva");
    os.setCliente(cliente);
    os.setDescricaoProblema(descricaoProblema);
    os.setStatus(StatusOS.ABERTA);
    os.setDataAbertura(LocalDateTime.now());
    return os;
  }
}