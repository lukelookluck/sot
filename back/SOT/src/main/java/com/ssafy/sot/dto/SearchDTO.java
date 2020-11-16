package com.ssafy.sot.dto;

public class SearchDTO {
	
	int id;
	String keyword;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	@Override
	public String toString() {
		return "SearchDTO [id=" + id + ", keyword=" + keyword + "]";
	}
	public SearchDTO() {
	}
	public SearchDTO(int id, String keyword) {
		this.id = id;
		this.keyword = keyword;
	}

}
