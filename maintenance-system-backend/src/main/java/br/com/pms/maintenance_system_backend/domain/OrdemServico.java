package br.com.pms.maintenance_system_backend.domain;

import br.com.pms.maintenance_system_backend.enums.StatusOS;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ordens_servico")
@Getter
@Setter
public class OrdemServico {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "cliente_id") 
  private Cliente cliente;

  @ManyToOne
  @JoinColumn(name = "tecnico_id")
  private Tecnico tecnico;
  private String tipo; // "Preventiva", "Corretiva"
  private String descricaoProblema;

  @Enumerated(EnumType.STRING)
  private StatusOS status;
  private LocalDateTime dataAbertura;
  private LocalDateTime dataConclusao;
}