package com.ssafy.sot.dto;

import java.sql.Timestamp;

import io.swagger.annotations.ApiParam;

public class ArticleDTO {
	@ApiParam(value = "게시글 id (PK), 게시글 작성시 미사용, 수정시 컨트롤러에서 입력해줌", required = false, hidden = true)
	int id;
	@ApiParam(value = "제목", required = true)
	String title;
	@ApiParam(value = "내용", required = true)
	String content;
	@ApiParam(value = "게시판 id (FK)", required = false, hidden = true)
	int boardId;
	@ApiParam(value = "유저 id (FK)", required = true)
	int userId;
	@ApiParam(value = "유저 닉네임", required = false, hidden = true)
	String nickname;
	@ApiParam(value = "작성 시간", required = false, hidden = true)
	Timestamp created_at;
	@ApiParam(value = "수정 시간", required = false, hidden = true)
	Timestamp updated_at;
	@ApiParam(value = "댓글 수", required = false, hidden = true)
	int commentsCnt;
	
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
	
	public int getCommentsCnt() {
		return commentsCnt;
	}
	
	public void setCommentsCnt(int commentsCnt) {
		this.commentsCnt = commentsCnt;
	}
	
	@Override
	public String toString() {
		return "ArticleDTO [id=" + id + ", title=" + title + ", content=" + content + ", boardId=" + boardId
				+ ", userId=" + userId + ", nickname=" + nickname + ", created_at=" + created_at + ", updated_at="
				+ updated_at + ", commentsCnt=" + commentsCnt + "]";
	}
}
