package com.ssafy.sot.dao;

import java.util.List;

import com.ssafy.sot.dto.CommentDTO;

public interface CommentDAO {
	
	List<CommentDTO> selectCommentsByArticleId(int articleId);
	List<CommentDTO> selectReplyCommentsByParentId(int parentId);
	int insertComment(CommentDTO commentDTO);
	int insertReplyComment(CommentDTO commentDTO);
	int updateComment(CommentDTO commentDTO);
	int deleteComment(int id);
	
}
