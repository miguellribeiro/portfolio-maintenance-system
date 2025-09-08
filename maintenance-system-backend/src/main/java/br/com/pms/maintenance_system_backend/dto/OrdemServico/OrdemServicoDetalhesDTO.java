package br.com.pms.maintenance_system_backend.dto.OrdemServico;

import br.com.pms.maintenance_system_backend.dto.Cliente.ClienteDTO;
import br.com.pms.maintenance_system_backend.dto.Tecnico.TecnicoDTO;
import java.time.LocalDateTime;

public record OrdemServicoDetalhesDTO(
    Long id,
    String tipo,
    String status,
    String descricaoProblema,
    LocalDateTime dataAbertura,
    LocalDateTime dataConclusao,
    ClienteDTO cliente, // Usamos outros DTOs para compor a resposta
    TecnicoDTO tecnico
) {}