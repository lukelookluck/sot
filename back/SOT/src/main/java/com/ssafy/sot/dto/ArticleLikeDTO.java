package com.ssafy.sot.dto;

public class ArticleLikeDTO {
	
	int articleId;
	int userId;
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
	@Override
	public String toString() {
		return "ArticleLikeDTO [articleId=" + articleId + ", userId=" + userId + "]";
	}
}
