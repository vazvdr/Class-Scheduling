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
	private static final long ACCESS_TOKEN_EXPIRATION = 1000 * 60 * 15; // 15 minutos
	private static final long REFRESH_TOKEN_EXPIRATION = 1000 * 60 * 60 * 6; // 6 horas

	public JwtUtil(
			@Value("${jwt.secret}") String secret) {
		this.chaveSecreta = Keys.hmacShaKeyFor(
				secret.getBytes(
						StandardCharsets.UTF_8));
	}

	public String gerarToken(
			Usuario usuario) {
		return Jwts.builder()
				.setSubject(
						usuario.getEmail())
				.claim(
						"id",
						usuario.getId())
				.claim(
						"nome",
						usuario.getNome())
				.claim(
						"type",
						"ACCESS")
				.setIssuedAt(
						new Date())
				.setExpiration(
						new Date(
								System.currentTimeMillis()
										+ ACCESS_TOKEN_EXPIRATION))
				.signWith(
						chaveSecreta,
						SignatureAlgorithm.HS256)
				.compact();
	}

	public String gerarRefreshToken(
			Usuario usuario) {
		return Jwts.builder()
				.setSubject(
						usuario.getEmail())
				.claim(
						"type",
						"REFRESH")
				.setIssuedAt(
						new Date())
				.setExpiration(
						new Date(
								System.currentTimeMillis()
										+ REFRESH_TOKEN_EXPIRATION))
				.signWith(
						chaveSecreta,
						SignatureAlgorithm.HS256)
				.compact();
	}

	public String gerarTokenResetSenha(
			Long usuarioId) {
		return Jwts.builder()
				.setSubject(
						usuarioId.toString())
				.claim(
						"type",
						"PASSWORD_RESET")
				.setIssuedAt(
						new Date())
				.setExpiration(
						new Date(
								System.currentTimeMillis()
										+ PASSWORD_RESET_EXPIRATION))
				.signWith(
						chaveSecreta,
						SignatureAlgorithm.HS256)
				.compact();
	}

	public boolean validarRefreshToken(
			String token) {
		try {
			Claims claims = extractAllClaims(token);
			String type = claims.get(
					"type",
					String.class);
			return "REFRESH".equals(type);
		} catch (Exception e) {
			return false;
		}
	}

	public boolean validarToken(
			String token,
			UserDetails usuario) {
		try {
			Claims claims = extractAllClaims(token);
			String type = claims.get(
					"type",
					String.class);
			if (type != null &&
					!"ACCESS".equals(type)) {
				return false;
			}
			return claims.getSubject()
					.equals(
							usuario.getUsername());
		} catch (Exception e) {
			return false;
		}
	}

	public Long validarTokenResetSenha(
			String token) {
		Claims claims = Jwts.parserBuilder()
				.setSigningKey(
						chaveSecreta)
				.build()
				.parseClaimsJws(token)
				.getBody();

		String type = claims.get(
				"type",
				String.class);
		if (!"PASSWORD_RESET".equals(type)) {
			throw new RuntimeException(
					"Token inválido para redefinição de senha");
		}
		return Long.parseLong(
				claims.getSubject());
	}

	public String extrairEmail(
			String token) {
		return extractAllClaims(token)
				.getSubject();
	}

	public Long extrairId(
			String token) {
		try {
			Claims claims = extractAllClaims(token);
			Object idClaim = claims.get("id");
			if (idClaim instanceof Integer) {
				return ((Integer) idClaim)
						.longValue();
			} else if (idClaim instanceof Long) {
				return (Long) idClaim;
			} else if (idClaim instanceof String) {
				return Long.parseLong(
						(String) idClaim);
			}
			throw new RuntimeException(
					"Formato de ID inválido");
		} catch (Exception e) {
			throw new RuntimeException(
					"Erro ao extrair ID do token",
					e);
		}
	}

	private Claims extractAllClaims(
			String token) {
		return Jwts.parserBuilder()
				.setSigningKey(
						chaveSecreta)
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
	public String limparPrefixoBearer(
			String token) {
		if (token != null &&
				token.startsWith("Bearer ")) {
			return token.substring(7);
		}
		return token;
	}
}