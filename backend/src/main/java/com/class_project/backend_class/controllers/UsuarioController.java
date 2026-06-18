package com.class_project.backend_class.controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.class_project.backend_class.classes.Usuario;
import com.class_project.backend_class.dto.usuario.LoginRequestDTO;
import com.class_project.backend_class.dto.usuario.RecuperarSenhaDTO;
import com.class_project.backend_class.dto.usuario.RedefinirSenhaDTO;
import com.class_project.backend_class.dto.usuario.UsuarioRequestDTO;
import com.class_project.backend_class.dto.usuario.UsuarioResponseDTO;
import com.class_project.backend_class.repositories.UsuarioRepository;
import com.class_project.backend_class.services.EmailService;
import com.class_project.backend_class.services.UsuarioService;
import com.class_project.backend_class.utils.JwtUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuários", description = "Operações relacionadas a usuários")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtUtil jwtUtil;

    @Operation(summary = "Cadastrar um novo usuário")
    @PostMapping("/cadastrar")
    public ResponseEntity<UsuarioResponseDTO> cadastrar(@RequestBody @Valid UsuarioRequestDTO dto) {
        UsuarioResponseDTO response = usuarioService.cadastrar(dto);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Fazer login de um usuário")
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody @Valid LoginRequestDTO loginDTO,
            HttpServletRequest request) {

        String ip = request.getHeader("X-Forwarded-For");

        if (ip == null || ip.isBlank()) {
            ip = request.getRemoteAddr();
        } else {
            ip = ip.split(",")[0].trim();
        }

        if (usuarioService.ipEstaBloqueado(ip)) {

            return ResponseEntity
                    .status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of(
                            "message",
                            "Usuario bloqueado. Tente novamente em 30 minutos."));
        }

        try {

            String token = usuarioService.login(
                    loginDTO.getEmail(),
                    loginDTO.getSenha());

            usuarioService.registrarLoginSucesso(ip);

            return ResponseEntity.ok(
                    Map.of("token", token));

        } catch (Exception e) {

            usuarioService.registrarTentativaFalha(ip);

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "message",
                            e.getMessage()));
        }
    }

    @Operation(summary = "Editar dados de um usuário")
    @PutMapping("/editar")
    public ResponseEntity<?> editarUsuario(@RequestBody @Valid UsuarioRequestDTO dto, HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization");
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Token não fornecido"));
            }

            token = token.substring(7);
            Long usuarioId = jwtUtil.extrairId(token);

            UsuarioResponseDTO response = usuarioService.editarUsuario(usuarioId, dto);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }

    @Operation(summary = "Deletar a conta de um usuário pelo id")
    @DeleteMapping("/deletar")
    public ResponseEntity<?> deletarUsuario(HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization");
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Token não fornecido"));
            }

            token = token.substring(7);
            Long usuarioId = jwtUtil.extrairId(token);
            usuarioService.deletarUsuario(usuarioId);

            return ResponseEntity.ok(Map.of("message", "Usuário deletado com sucesso"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Erro ao deletar usuário"));
        }
    }

    @Operation(summary = "Recuperar senha de um usuário")
    @PostMapping("/recuperar-senha")
    public ResponseEntity<String> recuperarSenha(
            @Valid @RequestBody RecuperarSenhaDTO dto) {

        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(dto.getEmail());

        if (optionalUsuario.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body("Esse email não está cadastrado.");
        }

        Usuario usuario = optionalUsuario.get();

        String token = jwtUtil.gerarTokenResetSenha(usuario.getId());

        String link = "https://class-scheduling.vercel.app/redefinir-senha?token="
                + token;

        emailService.enviarEmailRecuperarSenha(
                usuario.getEmail(),
                "Redefinição de senha",
                "Clique no link para redefinir sua senha: "
                        + link);

        System.out.println(
                "✅ Email enviado com sucesso para: "
                        + usuario.getEmail());

        return ResponseEntity.ok(
                "Email enviado com sucesso.");
    }

    @Operation(summary = "Redefinir senha de um usuário")
    @PostMapping("/redefinir-senha")
    public ResponseEntity<?> redefinirSenha(
            @RequestBody RedefinirSenhaDTO dto) {

        try {

            Long usuarioId = jwtUtil.validarTokenResetSenha(
                    dto.getToken());

            Usuario usuario = usuarioRepository.findById(usuarioId)
                    .orElseThrow(() -> new RuntimeException(
                            "Usuário não encontrado"));

            usuario.setSenha(
                    new BCryptPasswordEncoder()
                            .encode(dto.getNovaSenha()));

            usuarioRepository.save(usuario);

            return ResponseEntity.ok(
                    "Senha atualizada com sucesso.");

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("Token inválido ou expirado");
        }
    }
}
