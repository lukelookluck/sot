package com.ssafy.sot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sot.dao.CommentDAO;
import com.ssafy.sot.dto.CommentDTO;

@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	CommentDAO commentDAO;

	@Override
	public boolean createComment(CommentDTO commentDTO) {
		return commentDAO.insertComment(commentDTO) == 1;
	}

	@Override
	public boolean updateComment(CommentDTO commentDTO) {
		return commentDAO.updateComment(commentDTO) == 1;
	}

	@Override
	public boolean deleteComment(int id) {
		return commentDAO.deleteComment(id) == 1;
	}

	@Override
	public boolean createReplyComment(CommentDTO commentDTO) {
		return commentDAO.insertReplyComment(commentDTO) == 1;
	}

	@Override
	public CommentDTO showComment(int id) {
		return commentDAO.selectCommentById(id);
	}

}
