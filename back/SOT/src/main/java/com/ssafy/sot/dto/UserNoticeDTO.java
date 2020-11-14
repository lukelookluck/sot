package com.ssafy.sot.dto;

import java.sql.Timestamp;

public class UserNoticeDTO {
	int id;
	int userId;
	String msg;
	int articleId;
	Timestamp created_at;
	boolean read;
	
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
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public int getArticleId() {
		return articleId;
	}
	public void setArticleId(int articleId) {
		this.articleId = articleId;
	}
	public Timestamp getCreated_at() {
		return created_at;
	}
	public void setCreated_at(Timestamp created_at) {
		this.created_at = created_at;
	}
	public boolean isRead() {
		return read;
	}
	public void setRead(boolean read) {
		this.read = read;
	}
	@Override
	public String toString() {
		return "UserNoticeDTO [id=" + id + ", userId=" + userId + ", msg=" + msg + ", articleId=" + articleId
				+ ", created_at=" + created_at + ", read=" + read + "]";
	}
	
	

}
