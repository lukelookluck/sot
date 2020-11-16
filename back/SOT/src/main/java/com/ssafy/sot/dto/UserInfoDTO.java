package com.ssafy.sot.dto;

public class UserInfoDTO {
	
	int id;
	String email;
	String nickname;
	int schoolId;
	String schoolName;
	
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
		return "UserInfo [id=" + id + ", email=" + email + ", nickname=" + nickname + ", schoolId=" + schoolId
				+ ", schoolName=" + schoolName + "]";
	}
	
	

}
