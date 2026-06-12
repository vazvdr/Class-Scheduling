package com.class_project.backend_class.utils;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.class_project.backend_class.classes.Usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final SecretKey chaveSecreta;

	private static final long PASSWORD_RESET_EXPIRATION = 1000 * 60 * 10; // 10 minutos

	public JwtUtil(@Value("${jwt.secret}") String secret) {
		this.chaveSecreta = Keys.hmacShaKeyFor(
				secret.getBytes(StandardCharsets.UTF_8));
	}

	public String gerarToken(Usuario usuario) {
		return Jwts.builder()
				.setSubject(usuario.getEmail())
				.claim("id", usuario.getId())
				.claim("nome", usuario.getNome())
				.setIssuedAt(new Date())
				.signWith(
						chaveSecreta,
						SignatureAlgorithm.HS256)
				.compact();
	}

	public String gerarTokenResetSenha(
			Long usuarioId) {
		return Jwts.builder()
				.setSubject(usuarioId.toString())
				.claim("type", "PASSWORD_RESET")
				.setIssuedAt(new Date())
				.setExpiration(
						new Date(
								System.currentTimeMillis()
										+ PASSWORD_RESET_EXPIRATION))
				.signWith(
						chaveSecreta,
						SignatureAlgorithm.HS256)
				.compact();
	}

	/**
	 * Valida token de recuperação e retorna o ID do usuário
	 */
	public Long validarTokenResetSenha(
			String token) {
		Claims claims = Jwts.parserBuilder()
				.setSigningKey(chaveSecreta)
				.build()
				.parseClaimsJws(token)
				.getBody();

		String type = claims.get("type", String.class);

		if (!"PASSWORD_RESET".equals(type)) {
			throw new RuntimeException(
					"Token inválido para redefinição de senha");
		}

		return Long.parseLong(
				claims.getSubject());
	}

	public String extrairEmail(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(chaveSecreta)
				.build()
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
	}

	public Long extrairId(String token) {
		try {
			Claims claims = extractAllClaims(token);

			Object idClaim = claims.get("id");

			if (idClaim == null) {
				throw new RuntimeException(
						"Token não contém o ID");
			}

			if (idClaim instanceof Integer) {
				return ((Integer) idClaim)
						.longValue();
			} else if (idClaim instanceof Long) {
				return (Long) idClaim;
			} else if (idClaim instanceof String) {
				return Long.parseLong(
						(String) idClaim);
			} else {
				throw new RuntimeException(
						"Formato de ID inválido no token");
			}
		} catch (Exception e) {
			throw new RuntimeException(
					"Erro ao extrair ID do token: "
							+ e.getMessage(),
					e);
		}
	}

	private Claims extractAllClaims(
			String token) {
		return Jwts.parserBuilder()
				.setSigningKey(chaveSecreta)
				.build()
				.parseClaimsJws(token)
				.getBody();
	}

	public boolean validarToken(
			String token,
			UserDetails usuario) {
		try {
			Jwts.parserBuilder()
					.setSigningKey(chaveSecreta)
					.build()
					.parseClaimsJws(token);

			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public String limparPrefixoBearer(
			String token) {
		if (token != null
				&& token.startsWith("Bearer ")) {
			return token.substring(7);
		}

		return token;
	}
}