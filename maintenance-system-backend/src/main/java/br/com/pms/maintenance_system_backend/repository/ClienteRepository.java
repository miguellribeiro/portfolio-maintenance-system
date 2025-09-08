package br.com.pms.maintenance_system_backend.repository;

import br.com.pms.maintenance_system_backend.domain.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {}