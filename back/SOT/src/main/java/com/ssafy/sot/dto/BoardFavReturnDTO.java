package com.ssafy.sot.dto;

public class BoardFavReturnDTO {
	
	int id;
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
	@Override
	public String toString() {
		return "BoardFavReturnDTO [id=" + id + ", name=" + name + "]";
	}
	
	
}
