package com.ssafy.sot.dto;

import java.sql.Timestamp;
import java.util.List;

import io.swagger.annotations.ApiParam;

public class CommentDTO {
	
	@ApiParam(value = "댓글 id (PK), 댓글 작성시 미사용, 수정시 컨트롤러에서 입력해줌", required = false, hidden = true)
	int id;
	@ApiParam(value = "내용", required = true)
	String content;
	@ApiParam(value = "게시글 id (FK)", required = false, hidden = true)
	int articleId;
	@ApiParam(value = "유저 id (FK)", required = true)
	int userId;
	@ApiParam(value = "유저 닉네임", required = false, hidden = true)
	String nickname;
	@ApiParam(value = "작성 시간", required = false, hidden = true)
	Timestamp created_at;
	@ApiParam(value = "수정 시간", required = false, hidden = true)
	Timestamp updated_at;
	@ApiParam(value = "좋아요 수", required = false, hidden = true)
	int likesCnt;
	@ApiParam(value = "부모 댓글 아이디(자기자신 FK)", required = false, hidden = true)
	int parentId;
	@ApiParam(value = "좋아요한 유저 목록", required = false, hidden = true)
	boolean isLiked;
	
	
	
	public int getParentId() {
		return parentId;
	}
	public void setParentId(int parentId) {
		this.parentId = parentId;
	}
	public int getLikesCnt() {
		return likesCnt;
	}
	public void setLikesCnt(int likesCnt) {
		this.likesCnt = likesCnt;
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
	public boolean getIsLiked() {
		return isLiked;
	}
	public void setIsLiked(boolean isLiked) {
		this.isLiked = isLiked;
	}
	@Override
	public String toString() {
		return "CommentDTO [id=" + id + ", content=" + content + ", articleId=" + articleId + ", userId=" + userId
				+ ", nickname=" + nickname + ", created_at=" + created_at + ", updated_at=" + updated_at + ", likesCnt="
				+ likesCnt + ", parentId=" + parentId + ", isLiked=" + isLiked + "]";
	}
}
