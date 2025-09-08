package br.com.pms.maintenance_system_backend.controller;

import br.com.pms.maintenance_system_backend.domain.Tecnico;
import br.com.pms.maintenance_system_backend.dto.Tecnico.TecnicoDTO;
import br.com.pms.maintenance_system_backend.service.TecnicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tecnicos")
public class TecnicoController {

    @Autowired
    private TecnicoService tecnicoService;

    @PostMapping // POST em "/tecnicos"
    public ResponseEntity<TecnicoDTO> criarTecnico(@RequestBody TecnicoDTO dto) {
        Tecnico novoTecnico = new Tecnico();
        novoTecnico.setNome(dto.nome());
        novoTecnico.setEspecialidade(dto.especialidade());

        Tecnico tecnicoSalvo = tecnicoService.criarTecnico(novoTecnico);
        return ResponseEntity.ok(new TecnicoDTO(tecnicoSalvo.getId(), tecnicoSalvo.getNome(), tecnicoSalvo.getEspecialidade()));
    }

    @GetMapping // GET em "/tecnicos"
    public ResponseEntity<List<TecnicoDTO>> listarTecnicos() {
        List<TecnicoDTO> tecnicos = tecnicoService.listarTodos().stream()
                .map(tecnico -> new TecnicoDTO(tecnico.getId(), tecnico.getNome(), tecnico.getEspecialidade()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(tecnicos);
    }
}