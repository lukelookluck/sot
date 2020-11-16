package com.ssafy.sot.dto;

public class UserInfoWithToken {
	
	int id;
	String email;
	String nickname;
	int schoolId;
	String schoolName;
	String token;
	
	public UserInfoWithToken(UserInfoDTO userInfoDTO, String token) {
		this.id = userInfoDTO.getId();
		this.email = userInfoDTO.getEmail();
		this.nickname = userInfoDTO.getNickname();
		this.schoolId = userInfoDTO.getSchoolId();
		this.schoolName = userInfoDTO.getSchoolName();
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
	
	public int getSchoolId() {
		return schoolId;
	}

	public void setSchoolId(int schoolId) {
		this.schoolId = schoolId;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	@Override
	public String toString() {
		return "UserInfoWithToken [id=" + id + ", email=" + email + ", nickname=" + nickname + ", schoolId=" + schoolId
				+ ", schoolName=" + schoolName + ", token=" + token + "]";
	}
	
	
}
