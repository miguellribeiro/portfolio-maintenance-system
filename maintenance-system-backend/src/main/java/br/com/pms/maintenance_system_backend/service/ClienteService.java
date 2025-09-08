package br.com.pms.maintenance_system_backend.service;

import br.com.pms.maintenance_system_backend.domain.Cliente;
import br.com.pms.maintenance_system_backend.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente criarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }
}