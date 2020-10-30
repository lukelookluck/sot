package com.ssafy.sot.dto;

public class UserWithToken {
	
	int id;
	String email;
	String nickname;
	String token;
	
	public UserWithToken(UserDTO userDTO, String token) {
		this.id = userDTO.getId();
		this.email = userDTO.getEmail();
		this.nickname = userDTO.getNickname();
		this.token = token;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	@Override
	public String toString() {
		return "UserWithToken [id=" + id + ", email=" + email + ", nickname=" + nickname + ", token=" + token + "]";
	}
}
