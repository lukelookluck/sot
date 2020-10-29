package com.ssafy.sot.dto;

import io.swagger.annotations.ApiParam;

public class UserDTO {
	
	int id;
	String nickname;
	String email;
	String password;
	int schoolId;
	int isAdmin;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getSchoolId() {
		return schoolId;
	}
	public void setSchoolId(int schoolId) {
		this.schoolId = schoolId;
	}
	public int getIsAdmin() {
		return isAdmin;
	}
	public void setIsAdmin(int isAdmin) {
		this.isAdmin = isAdmin;
	}
	
	@Override
	public String toString() {
		return "UserDTO [id=" + id + ", nickname=" + nickname + ", email=" + email + ", password=" + password
				+ ", schoolId=" + schoolId + ", isAdmin=" + isAdmin + "]";
	}

}
