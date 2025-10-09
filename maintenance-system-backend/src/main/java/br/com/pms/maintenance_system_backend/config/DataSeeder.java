package br.com.pms.maintenance_system_backend.config;

import br.com.pms.maintenance_system_backend.domain.Usuario;
import br.com.pms.maintenance_system_backend.enums.UserRole;
import br.com.pms.maintenance_system_backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Verifica se já existem utilizadores para não inserir duplicados
        if (usuarioRepository.count() == 0) {
            // Criar Admin
            Usuario admin = new Usuario(
                "Admin Master",
                "admin@pms.com",
                passwordEncoder.encode("admin123"), // Senha encriptada
                UserRole.ADMIN
            );

            // Criar Cliente
            Usuario cliente = new Usuario(
                "Cliente Exemplo",
                "cliente@pms.com",
                passwordEncoder.encode("cliente123"),
                UserRole.CLIENTE
            );

            // Criar Técnico
            Usuario tecnico = new Usuario(
                "Técnica Maria",
                "tecnico@pms.com",
                passwordEncoder.encode("tecnico123"),
                UserRole.TECNICO
            );
            
            usuarioRepository.save(admin);
            usuarioRepository.save(cliente);
            usuarioRepository.save(tecnico);
            
            System.out.println(">>> Utilizadores de teste inseridos no banco de dados.");
        }
    }
}
