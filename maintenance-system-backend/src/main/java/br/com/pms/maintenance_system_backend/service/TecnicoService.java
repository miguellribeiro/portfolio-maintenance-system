package br.com.pms.maintenance_system_backend.service;

import br.com.pms.maintenance_system_backend.domain.Tecnico;
import br.com.pms.maintenance_system_backend.repository.TecnicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TecnicoService {

    @Autowired
    private TecnicoRepository tecnicoRepository;

    public Tecnico criarTecnico(Tecnico tecnico) {
        return tecnicoRepository.save(tecnico);
    }

    public List<Tecnico> listarTodos() {
        return tecnicoRepository.findAll();
    }
}