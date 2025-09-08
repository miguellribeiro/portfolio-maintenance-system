package br.com.pms.maintenance_system_backend.dto.Tecnico;

public record TecnicoDTO(
    Long id,
    String nome,
    String especialidade
) {}