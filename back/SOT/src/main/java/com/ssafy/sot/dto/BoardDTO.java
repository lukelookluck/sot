package com.ssafy.sot.dto;

public class BoardDTO {
	
	int id;
	String name;
	int community_id;
	
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

	public int getCommunity_id() {
		return community_id;
	}

	public void setCommunity_id(int community_id) {
		this.community_id = community_id;
	}

	@Override
	public String toString() {
		return "BoardDTO [id=" + id + ", name=" + name + ", community_id=" + community_id + "]";
	}

}
