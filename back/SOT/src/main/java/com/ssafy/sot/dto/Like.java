package com.ssafy.sot.dto;

public class Like {
	
	int id;
	int userId;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	@Override
	public String toString() {
		return "Like [id=" + id + ", userId=" + userId + "]";
	}
	
	
	
	
}
