package br.com.pms.maintenance_system_backend.service;

import br.com.pms.maintenance_system_backend.domain.Cliente;
import br.com.pms.maintenance_system_backend.domain.OrdemServico;
import br.com.pms.maintenance_system_backend.domain.Tecnico;
import br.com.pms.maintenance_system_backend.enums.StatusOS;
import br.com.pms.maintenance_system_backend.repository.ClienteRepository;
import br.com.pms.maintenance_system_backend.repository.OrdemServicoRepository;
import br.com.pms.maintenance_system_backend.repository.TecnicoRepository;
import br.com.pms.maintenance_system_backend.service.factory.OrdemCorretivaFactory;
import br.com.pms.maintenance_system_backend.service.factory.OrdemServicoFactory;
import br.com.pms.maintenance_system_backend.service.factory.OrdemPreventivaFactory;
import br.com.pms.maintenance_system_backend.service.observer.LogObserver;
import br.com.pms.maintenance_system_backend.service.observer.StatusOSObserver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrdemServicoService {
  @Autowired
  private OrdemServicoRepository ordemServicoRepository;

  @Autowired
  private ClienteRepository clienteRepository;

  @Autowired
  private TecnicoRepository tecnicoRepository;

  private final List<StatusOSObserver> observers = new ArrayList<>();

  public OrdemServicoService() {
    this.observers.add(new LogObserver());
  }

  private void notificarObservers(OrdemServico os) {
    for (StatusOSObserver observer : observers) {
      observer.atualizar(os);
    }
  }

  // Abre uma nova Ordem de Serviço
  public OrdemServico abrirOS(Long clienteId, String tipo, String descricaoProblema) {
    Cliente cliente = clienteRepository.findById(clienteId)
        .orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));

    OrdemServicoFactory factory;

    if ("Preventiva".equalsIgnoreCase(tipo)) {
      factory = new OrdemPreventivaFactory();
    } else if ("Corretiva".equalsIgnoreCase(tipo)) {
      factory = new OrdemCorretivaFactory();
    } else {
      throw new IllegalArgumentException("Tipo de Ordem de Serviço inválido: " + tipo);
    }

    OrdemServico novaOS = factory.criarOrdemServico(cliente, descricaoProblema);
    return ordemServicoRepository.save(novaOS);
  }

  //Atualiza o status de uma OS.
  public OrdemServico atualizarStatus(Long osId, StatusOS novoStatus) {
    OrdemServico os = ordemServicoRepository.findById(osId)
        .orElseThrow(() -> new RuntimeException("Ordem de Serviço não encontrada!"));

    os.setStatus(novoStatus);

    if (novoStatus == StatusOS.CONCLUIDA || novoStatus == StatusOS.CANCELADA) {
      os.setDataConclusao(LocalDateTime.now());
    }

    OrdemServico osAtualizada = ordemServicoRepository.save(os);

    notificarObservers(osAtualizada);

    return osAtualizada;
  }

  // Atribui um técnico a uma Ordem de Serviço.
  public OrdemServico atribuirTecnico(Long osId, Long tecnicoId) {
    OrdemServico os = ordemServicoRepository.findById(osId)
        .orElseThrow(() -> new RuntimeException("Ordem de Serviço não encontrada!"));
    
    Tecnico tecnico = tecnicoRepository.findById(tecnicoId)
        .orElseThrow(() -> new RuntimeException("Técnico não encontrado!"));

    os.setTecnico(tecnico);
    os.setStatus(StatusOS.EM_ANDAMENTO);

    OrdemServico osAtualizada = ordemServicoRepository.save(os);
    
    notificarObservers(osAtualizada);

    return osAtualizada;
  }
  
  public List<OrdemServico> listarTodas() {
    return ordemServicoRepository.findAll();
  }
}