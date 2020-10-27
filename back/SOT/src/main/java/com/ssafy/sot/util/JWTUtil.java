package com.ssafy.sot.util;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.ssafy.sot.dto.UserInfoDTO;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtil {
	
	private String secretString = "DksSud+SkDkRkvkEkrahsSkwl+sGhkAhtGo=DNpWlRka";
	private Key key;
	
	public String createEmailToken(String email) {
		Claims claims = Jwts.claims().setSubject(email);
		String jws = Jwts.builder()
				.setClaims(claims)
				.claim("email", email)
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 1))
				.signWith(key)
				.compact();
		return jws;
	}
	
	public String createToken(UserInfoDTO user) {
		Claims claims = Jwts.claims().setSubject(Integer.toString(user.getId()));
		String jws = Jwts.builder()
				.setClaims(claims)
				.claim("id", user.getId())
				.claim("name", user.getName())
				.claim("email", user.getEmail())
				.setExpiration(new Date(System.currentTimeMillis() + (1000 * 60 * 60 * 6))) // 6시간?
				.signWith(key)
				.compact();
		return jws;
	}
	
	public JWTUtil() {
		key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretString));
		System.out.println(Encoders.BASE64.encode(key.getEncoded()));
	}
	
	public Key getKey() {
		return this.key;
	}
	
	
	public int getUserPK(String token) {
		return Integer.parseInt(Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().getSubject());
	}
	
	public String getFindPwEmail(String token) {
		return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().getSubject();
	}

}
