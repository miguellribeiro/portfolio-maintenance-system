package br.com.pms.maintenance_system_backend.dto.auth;

public record LoginRequestDTO(
    String login,
    String password
) {}