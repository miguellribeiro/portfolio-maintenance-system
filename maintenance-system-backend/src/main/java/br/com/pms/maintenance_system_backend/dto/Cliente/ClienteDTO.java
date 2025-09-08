package br.com.pms.maintenance_system_backend.dto.Cliente;

public record ClienteDTO(
    Long id,
    String nome,
    String email,
    String telefone,
    String endereco
) {}