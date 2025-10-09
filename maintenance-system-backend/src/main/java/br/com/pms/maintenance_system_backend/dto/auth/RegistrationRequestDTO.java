package br.com.pms.maintenance_system_backend.dto.auth;

import br.com.pms.maintenance_system_backend.enums.UserRole;

public record RegistrationRequestDTO(
    String nome,
    String email,
    String senha,
    UserRole role
) {}
