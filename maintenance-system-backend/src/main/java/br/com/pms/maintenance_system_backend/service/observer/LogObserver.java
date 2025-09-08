package br.com.pms.maintenance_system_backend.service.observer;

import br.com.pms.maintenance_system_backend.domain.OrdemServico;

public class LogObserver implements StatusOSObserver {
  @Override
  public void atualizar(OrdemServico os) {
    System.out.println(
      "[LOG] Notificação: A Ordem de Serviço #" + os.getId() +
      " foi atualizada para o status: " + os.getStatus()
    );
  }
}