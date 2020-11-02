package com.ssafy.sot.dto;

import java.sql.Timestamp;
import java.util.List;

public class ArticleWithComment {
	
	int id;
	String title;
	String content;
	int boardId;
	int userId;
	String nickname;
	Timestamp created_at;
	Timestamp updated_at;
	List<CommentDTO> comments;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
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
	public List<CommentDTO> getComments() {
		return comments;
	}
	public void setComments(List<CommentDTO> comments) {
		this.comments = comments;
	}
	@Override
	public String toString() {
		return "ArticleWithComment [id=" + id + ", title=" + title + ", content=" + content + ", boardId=" + boardId
				+ ", userId=" + userId + ", nickname=" + nickname + ", created_at=" + created_at + ", updated_at="
				+ updated_at + ", comments=" + comments + "]";
	}
	public ArticleWithComment(ArticleDTO article, List<CommentDTO> comments) {
		this.id = article.getId();
		this.title = article.getTitle();
		this.content = article.getContent();
		this.boardId = article.getBoardId();
		this.userId = article.getUserId();
		this.nickname = article.getNickname();
		this.created_at = article.getCreated_at();
		this.updated_at = article.getUpdated_at();
		this.comments = comments;
	}
	
	

}
