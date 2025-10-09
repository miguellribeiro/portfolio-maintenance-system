package br.com.pms.maintenance_system_backend.dto.auth;

import br.com.pms.maintenance_system_backend.dto.user.UserDTO;

public record LoginResponseDTO(
    String token,
    UserDTO user
) {}

