package br.com.pms.maintenance_system_backend.controller;

import br.com.pms.maintenance_system_backend.domain.Cliente;
import br.com.pms.maintenance_system_backend.dto.Cliente.ClienteDTO;
import br.com.pms.maintenance_system_backend.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping // POST em "/clientes"
    public ResponseEntity<ClienteDTO> criarCliente(@RequestBody ClienteDTO dto) {
        Cliente novoCliente = new Cliente();
        novoCliente.setNome(dto.nome());
        novoCliente.setEmail(dto.email());
        novoCliente.setTelefone(dto.telefone());
        novoCliente.setEndereco(dto.endereco());

        Cliente clienteSalvo = clienteService.criarCliente(novoCliente);
        return ResponseEntity.ok(new ClienteDTO(clienteSalvo.getId(), clienteSalvo.getNome(), clienteSalvo.getEmail(), clienteSalvo.getTelefone(), clienteSalvo.getEndereco()));
    }

    @GetMapping // GET em "/clientes"
    public ResponseEntity<List<ClienteDTO>> listarClientes() {
        List<ClienteDTO> clientes = clienteService.listarTodos().stream()
            .map(cliente -> new ClienteDTO(cliente.getId(), cliente.getNome(), cliente.getEmail(), cliente.getTelefone(), cliente.getEndereco()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(clientes);
    }
}