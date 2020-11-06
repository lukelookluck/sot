package com.ssafy.sot.dto;

public class BoardFavDTO {
	
	int id;
	int boardId;
	int userId;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getBoardId() {
		return boardId;
	}
	public void setBoardId(int boardId) {
		this.boardId = boardId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	@Override
	public String toString() {
		return "BoardFavDTO [id=" + id + ", boardId=" + boardId + ", userId=" + userId + "]";
	}
	
	
}
