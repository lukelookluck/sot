package com.ssafy.sot.dto;

public class BoardNewDTO {
	
	String name;
	int schoolId;
	int userId;
	String description;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getSchoolId() {
		return schoolId;
	}
	public void setSchoolId(int schoolId) {
		this.schoolId = schoolId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@Override
	public String toString() {
		return "BoardNewDTO [name=" + name + ", schoolId=" + schoolId + ", userId=" + userId + ", description="
				+ description + "]";
	}
	
}
