package br.com.pms.maintenance_system_backend.repository;

import br.com.pms.maintenance_system_backend.domain.OrdemServico;
import br.com.pms.maintenance_system_backend.enums.StatusOS;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdemServicoRepository extends JpaRepository<OrdemServico, Long> {
    List<OrdemServico> findByStatus(StatusOS status);
}