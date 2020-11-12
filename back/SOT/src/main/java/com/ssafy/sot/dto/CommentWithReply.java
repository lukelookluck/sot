package com.ssafy.sot.dto;

import java.sql.Timestamp;
import java.util.List;

public class CommentWithReply {
	
	int id;
	String content;
	int articleId;
	int userId;
	String nickname;
	Timestamp created_at;
	Timestamp updated_at;
	int likesCnt;
	int parentId;
	List<CommentDTO> replies;
	boolean isLiked;

	public CommentWithReply() {
		super();
	}

	public boolean getIsLiked() {
		return isLiked;
	}

	public void setIsLiked(boolean isLiked) {
		this.isLiked = isLiked;
	}

	public CommentWithReply(CommentDTO commentDTO, List<CommentDTO> replies) {
		this.id = commentDTO.getId();
		this.content = commentDTO.getContent();
		this.articleId = commentDTO.getArticleId();
		this.userId = commentDTO.getUserId();
		this.nickname = commentDTO.getNickname();
		this.created_at = commentDTO.getCreated_at();
		this.updated_at = commentDTO.getUpdated_at();
		this.likesCnt = commentDTO.getLikesCnt();
		this.parentId = commentDTO.getParentId();
		this.replies = replies;
	}
	
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
	public int getLikesCnt() {
		return likesCnt;
	}
	public void setLikesCnt(int likesCnt) {
		this.likesCnt = likesCnt;
	}
	public int getParentId() {
		return parentId;
	}
	public void setParentId(int parentId) {
		this.parentId = parentId;
	}
	public List<CommentDTO> getReplies() {
		return replies;
	}
	public void setReplies(List<CommentDTO> replies) {
		this.replies = replies;
	}

	@Override
	public String toString() {
		return "CommentWithReply [id=" + id + ", content=" + content + ", articleId=" + articleId + ", userId=" + userId
				+ ", nickname=" + nickname + ", created_at=" + created_at + ", updated_at=" + updated_at + ", likesCnt="
				+ likesCnt + ", parentId=" + parentId + ", replies=" + replies + ", isLiked=" + isLiked + "]";
	}
	
}
