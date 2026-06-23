package com.class_project.backend_class.controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/usuarios")
@Tag(
    name = "Usuários",
    description = "Operações relacionadas a usuários"
)
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
    public ResponseEntity<UsuarioResponseDTO> cadastrar(
            @RequestBody @Valid UsuarioRequestDTO dto) {
        UsuarioResponseDTO response =
                usuarioService.cadastrar(dto);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Fazer login de um usuário")
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody @Valid LoginRequestDTO loginDTO,
            HttpServletRequest request,
            HttpServletResponse response) {
        String ip =
                request.getHeader("X-Forwarded-For");
        if(ip == null || ip.isBlank()) {
            ip =
                request.getRemoteAddr();
        } else {
            ip =
                ip.split(",")[0].trim();
        }

        if(usuarioService.ipEstaBloqueado(ip)) {
            return ResponseEntity
                    .status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(
                        Map.of(
                            "message",
                            "Usuario bloqueado. Tente novamente em 30 minutos."
                        )
                    );
        }
        try {
            String accessToken =
                    usuarioService.login(
                        loginDTO.getEmail(),
                        loginDTO.getSenha()
                    );
            Usuario usuario =
                    usuarioRepository
                    .findByEmail(
                        loginDTO.getEmail()
                    )
                    .orElseThrow();
            String refreshToken =
                    jwtUtil
                    .gerarRefreshToken(usuario);
            ResponseCookie cookie =
                    ResponseCookie
                    .from(
                        "refresh_token",
                        refreshToken
                    )
                    .httpOnly(true)
                    .secure(false)
                    .sameSite("Lax")
                    .path("/")
                    .maxAge(
                        60 * 60 * 6
                    )
                    .build();
            response.addHeader(
                    HttpHeaders.SET_COOKIE,
                    cookie.toString()
            );
            usuarioService.registrarLoginSucesso(ip);
            return ResponseEntity.ok(
                    Map.of(
                        "accessToken",
                        accessToken
                    )
            );
        } catch(Exception e) {
            usuarioService
            .registrarTentativaFalha(ip);
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                        Map.of(
                            "message",
                            e.getMessage()
                        )
                    );
        }
    }

    @Operation(
        summary = "Renovar access token",
        description =
        "Gera um novo access token usando o refresh token armazenado em cookie HttpOnly."
    )
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(
            HttpServletRequest request) {
        String refreshToken = null;
        Cookie[] cookies =
                request.getCookies();
                System.out.println("COOKIES RECEBIDOS:");
        if(cookies != null) {
            for(Cookie cookie : cookies) {
                if(
                    cookie.getName()
                    .equals("refresh_token")
                ) {
                    refreshToken =
                        cookie.getValue();
                }
            }
        }
        if(
            refreshToken == null ||
            !jwtUtil.validarRefreshToken(
                refreshToken
            )
        ) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                        Map.of(
                            "message",
                            "Refresh token inválido ou expirado"
                        )
                    );
        }
        String email =
                jwtUtil
                .extrairEmail(refreshToken);
        Usuario usuario =
                usuarioRepository
                .findByEmail(email)
                .orElseThrow();
        String novoToken =
                jwtUtil
                .gerarToken(usuario);
        return ResponseEntity.ok(
                Map.of(
                    "accessToken",
                    novoToken
                )
        );
    }

    @Operation(summary = "Editar dados de um usuário")
    @PutMapping("/editar")
    public ResponseEntity<?> editarUsuario(
            @RequestBody @Valid UsuarioRequestDTO dto,
            HttpServletRequest request) {
        try {
            String token =
                    request.getHeader(
                        "Authorization"
                    );
            if(
                token == null ||
                !token.startsWith("Bearer ")
            ) {
                return ResponseEntity
                        .status(
                            HttpStatus.UNAUTHORIZED
                        )
                        .body(
                            Map.of(
                              "message",
                              "Token não fornecido"
                            )
                        );
            }
            token =
                token.substring(7);
            Long usuarioId =
                    jwtUtil.extrairId(token);
            UsuarioResponseDTO response =
                    usuarioService
                    .editarUsuario(
                        usuarioId,
                        dto
                    );
            return ResponseEntity.ok(response);
        } catch(Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(
                        Map.of(
                            "message",
                            e.getMessage()
                        )
                    );
        }
    }

    @Operation(summary = "Deletar a conta de um usuário pelo id")
    @DeleteMapping("/deletar")
    public ResponseEntity<?> deletarUsuario(
            HttpServletRequest request) {
        try {
            String token =
                    request.getHeader(
                        "Authorization"
                    );
            token =
                token.substring(7);
            Long usuarioId =
                    jwtUtil.extrairId(token);
            usuarioService
                    .deletarUsuario(usuarioId);
            return ResponseEntity.ok(
                    Map.of(
                        "message",
                        "Usuário deletado com sucesso"
                    )
            );
        } catch(Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(
                        Map.of(
                            "message",
                            "Erro ao deletar usuário"
                        )
                    );
        }
    }

    @Operation(summary = "Recuperar senha de um usuário")
    @PostMapping("/recuperar-senha")
    public ResponseEntity<String> recuperarSenha(
            @Valid @RequestBody RecuperarSenhaDTO dto) {
        Optional<Usuario> optionalUsuario =
                usuarioRepository
                .findByEmail(dto.getEmail());
        if(optionalUsuario.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(
                        "Esse email não está cadastrado."
                    );
        }
        Usuario usuario =
                optionalUsuario.get();
        String token =
                jwtUtil
                .gerarTokenResetSenha(
                    usuario.getId()
                );
        String link =
                "https://class-scheduling.vercel.app/redefinir-senha?token="
                + token;
        emailService.enviarEmailRecuperarSenha(
                usuario.getEmail(),
                "Redefinição de senha",
                "Clique no link para redefinir sua senha: "
                + link
        );
        return ResponseEntity.ok(
                "Email enviado com sucesso."
        );
    }

    @Operation(summary = "Redefinir senha de um usuário")
    @PostMapping("/redefinir-senha")
    public ResponseEntity<?> redefinirSenha(
            @RequestBody RedefinirSenhaDTO dto) {
        try {
            Long usuarioId =
                    jwtUtil.validarTokenResetSenha(
                        dto.getToken()
                    );
            Usuario usuario =
                    usuarioRepository
                    .findById(usuarioId)
                    .orElseThrow();
            usuario.setSenha(
                new BCryptPasswordEncoder()
                .encode(
                    dto.getNovaSenha()
                )
            );
            usuarioRepository.save(usuario);
            return ResponseEntity.ok(
                    "Senha atualizada com sucesso."
            );
        } catch(Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(
                        "Token inválido ou expirado"
                    );
        }
    }
}