package com.ssafy.sot.dto;

import io.swagger.annotations.ApiParam;

public class UserDTO {
	
	@ApiParam(value = "유저 id (PK), 회원가입시 미사용, 수정시 필수", required = false)
	int id;
	@ApiParam(value = "유저 닉네임", required = true)
	String nickname;
	@ApiParam(value = "유저 아이디", required = true)
	String email;
	@ApiParam(value = "유저 비밀번호", required = true)
	String password;
	@ApiParam(value = "학교 id (FK)", required = true)
	int schoolId;
	@ApiParam(value = "어드민 여부", required = false, hidden = true)
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
