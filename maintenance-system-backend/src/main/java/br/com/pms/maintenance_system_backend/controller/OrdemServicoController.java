package br.com.pms.maintenance_system_backend.controller;

import br.com.pms.maintenance_system_backend.domain.OrdemServico;
import br.com.pms.maintenance_system_backend.dto.Cliente.*;
import br.com.pms.maintenance_system_backend.dto.OrdemServico.*;
import br.com.pms.maintenance_system_backend.dto.Tecnico.*;
import br.com.pms.maintenance_system_backend.enums.StatusOS;
import br.com.pms.maintenance_system_backend.service.OrdemServicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/os")
public class OrdemServicoController {

    @Autowired
    private OrdemServicoService osService;

    @PostMapping // POST em "/os"
    public ResponseEntity<OrdemServicoDetalhesDTO> abrirOS(@RequestBody AberturaOS request) {
        OrdemServico novaOS = osService.abrirOS(
            request.clienteId(),
            request.tipo(),
            request.descricaoProblema()
        );
        return ResponseEntity.ok(converterParaDetalhesDTO(novaOS));
    }

    @GetMapping // GET em "/os"
    public ResponseEntity<List<OrdemServicoDetalhesDTO>> listarTodas() {
        List<OrdemServico> listaOS = osService.listarTodas();
        List<OrdemServicoDetalhesDTO> listaDTO = listaOS.stream()
                                                        .map(this::converterParaDetalhesDTO)
                                                        .collect(Collectors.toList());
        return ResponseEntity.ok(listaDTO);
    }

    @PutMapping("/{id}/atribuir") // PUT em "/os/123/atribuir"
    public ResponseEntity<OrdemServicoDetalhesDTO> atribuirTecnico(@PathVariable Long id, @RequestBody AtribuicaoTecnicoOS request) {
        OrdemServico osAtualizada = osService.atribuirTecnico(id, request.tecnicoId());
        return ResponseEntity.ok(converterParaDetalhesDTO(osAtualizada));
    }

    @PutMapping("/{id}/status") // PUT em "/os/123/status"
    public ResponseEntity<OrdemServicoDetalhesDTO> atualizarStatus(@PathVariable Long id, @RequestBody AtualizacaoStatusOS request) {
        StatusOS novoStatus = StatusOS.valueOf(request.novoStatus().toUpperCase());
        OrdemServico osAtualizada = osService.atualizarStatus(id, novoStatus);
        return ResponseEntity.ok(converterParaDetalhesDTO(osAtualizada));
    }

    // Método auxiliar privado para converter Entidade em DTO
    private OrdemServicoDetalhesDTO converterParaDetalhesDTO(OrdemServico os) {
        ClienteDTO clienteDTO = new ClienteDTO(
            os.getCliente().getId(),
            os.getCliente().getNome(),
            os.getCliente().getEmail(),
            os.getCliente().getTelefone(),
            os.getCliente().getEndereco()
        );

        TecnicoDTO tecnicoDTO = null;
        if (os.getTecnico() != null) {
            tecnicoDTO = new TecnicoDTO(
                os.getTecnico().getId(),
                os.getTecnico().getNome(),
                os.getTecnico().getEspecialidade()
            );
        }

        return new OrdemServicoDetalhesDTO(
            os.getId(),
            os.getTipo(),
            os.getStatus().toString(),
            os.getDescricaoProblema(),
            os.getDataAbertura(),
            os.getDataConclusao(),
            clienteDTO,
            tecnicoDTO
        );
    }
}