package br.com.pms.maintenance_system_backend.dto.OrdemServico;

public record AtualizacaoStatusOS(
    String novoStatus // "EM_ANDAMENTO", "CONCLUIDA", etc.
) {}