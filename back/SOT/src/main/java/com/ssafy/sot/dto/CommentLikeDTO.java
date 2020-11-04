package com.ssafy.sot.dto;

public class CommentLikeDTO {
	
	int commentId;
	int userId;
	public int getCommentId() {
		return commentId;
	}
	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	@Override
	public String toString() {
		return "CommentLikeDTO [commentId=" + commentId + ", userId=" + userId + "]";
	}
}
