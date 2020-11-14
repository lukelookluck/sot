package com.ssafy.sot.dto;

public class SchoolDTO {
	
	int id;
	String sido;
	String name;
	
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
	
	public String getSido() {
		return sido;
	}
	public void setSido(String sido) {
		this.sido = sido;
	}
	@Override
	public String toString() {
		return "SchoolDTO [id=" + id + ", sido=" + sido + ", name=" + name + "]";
	}
}
