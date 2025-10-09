package br.com.pms.maintenance_system_backend.service;

import br.com.pms.maintenance_system_backend.domain.Usuario;
import br.com.pms.maintenance_system_backend.dto.auth.LoginRequestDTO;
import br.com.pms.maintenance_system_backend.dto.auth.LoginResponseDTO;
import br.com.pms.maintenance_system_backend.dto.auth.RegistrationRequestDTO;
import br.com.pms.maintenance_system_backend.dto.user.UserDTO;
import br.com.pms.maintenance_system_backend.repository.UsuarioRepository;
import br.com.pms.maintenance_system_backend.service.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponseDTO authenticate(LoginRequestDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var usuario = (Usuario) auth.getPrincipal();
        var token = tokenService.generateToken(usuario);
        UserDTO userDTO = new UserDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getRole().name());
        return new LoginResponseDTO(token, userDTO);
    }

    public void register(RegistrationRequestDTO data) {
        if (usuarioRepository.findByEmail(data.email()) != null) {
            throw new RuntimeException("Este email já está em uso.");
        }
        
        String encryptedPassword = passwordEncoder.encode(data.senha());
        Usuario newUser = new Usuario(data.nome(), data.email(), encryptedPassword, data.role());
        
        usuarioRepository.save(newUser);
    }
}