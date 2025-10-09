package br.com.pms.maintenance_system_backend.enums;

public enum UserRole {
  ADMIN("admin"),
  CLIENTE("cliente"),
  TECNICO("tecnico");

  private String role;

  UserRole(String role) {
      this.role = role;
  }

  public String getRole() {
      return role;
  }
}