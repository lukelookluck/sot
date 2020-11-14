package com.ssafy.sot.dto;

public class UserIdDTO {
	
	int userId;

	@Override
	public String toString() {
		return "UserIdDTO [userId=" + userId + "]";
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

}
