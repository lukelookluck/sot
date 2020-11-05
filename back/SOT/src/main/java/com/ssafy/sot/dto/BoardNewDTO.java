package com.ssafy.sot.dto;

public class BoardNewDTO {
	
	String name;
	int schoolId;
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
	@Override
	public String toString() {
		return "BoardNewDTO [name=" + name + ", schoolId=" + schoolId + "]";
	}
}
