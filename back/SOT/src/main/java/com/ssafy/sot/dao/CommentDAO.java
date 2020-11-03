package com.ssafy.sot.dao;

import java.util.List;

import com.ssafy.sot.dto.CommentDTO;

public interface CommentDAO {
	
	List<CommentDTO> selectCommentsByArticleId(int articleId);
	int insertComment(CommentDTO commentDTO);
	int updateComment(CommentDTO commentDTO);
	int deleteComment(int id);
	
}
