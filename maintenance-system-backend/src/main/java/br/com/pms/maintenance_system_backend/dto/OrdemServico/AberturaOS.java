package br.com.pms.maintenance_system_backend.dto.OrdemServico;

public record AberturaOS(
    Long clienteId,
    String tipo, // "Preventiva" ou "Corretiva"
    String descricaoProblema
) {}