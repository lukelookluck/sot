package com.ssafy.sot.dto;

public class BoardDTO {
	
	int id;
	String name;
	int schoolId;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

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
		return "BoardDTO [id=" + id + ", name=" + name + ", schoolId=" + schoolId + "]";
	}


}
