package br.com.pms.maintenance_system_backend.dto.user;

public record UserDTO(
  Long id,
  String nome,
  String email,
  String role
) {}
