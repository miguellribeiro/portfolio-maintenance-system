package br.com.pms.maintenance_system_backend.service.observer;

import br.com.pms.maintenance_system_backend.domain.OrdemServico;

public interface StatusOSObserver {
  void atualizar(OrdemServico os);
}