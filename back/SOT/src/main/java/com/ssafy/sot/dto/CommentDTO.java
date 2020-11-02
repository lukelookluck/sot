package com.ssafy.sot.dto;

import java.sql.Timestamp;

public class CommentDTO {
	
	int id;
	String content;
	int articleId;
	int userId;
	String nickname;
	Timestamp created_at;
	Timestamp updated_at;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getArticleId() {
		return articleId;
	}
	public void setArticleId(int articleId) {
		this.articleId = articleId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public Timestamp getCreated_at() {
		return created_at;
	}
	public void setCreated_at(Timestamp created_at) {
		this.created_at = created_at;
	}
	public Timestamp getUpdated_at() {
		return updated_at;
	}
	public void setUpdated_at(Timestamp updated_at) {
		this.updated_at = updated_at;
	}
	@Override
	public String toString() {
		return "CommentDTO [id=" + id + ", content=" + content + ", articleId=" + articleId + ", userId=" + userId
				+ ", nickname=" + nickname + ", created_at=" + created_at + ", updated_at=" + updated_at + "]";
	}

	
	
}
