package br.com.pms.maintenance_system_backend.controller;

import br.com.pms.maintenance_system_backend.dto.auth.LoginRequestDTO;
import br.com.pms.maintenance_system_backend.dto.auth.LoginResponseDTO;
import br.com.pms.maintenance_system_backend.dto.auth.RegistrationRequestDTO;
import br.com.pms.maintenance_system_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth") // Caminho base atualizado para /auth
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO body) {
        LoginResponseDTO response = authService.authenticate(body);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequestDTO body) {
        authService.register(body);
        return ResponseEntity.ok().build();
    }
}

