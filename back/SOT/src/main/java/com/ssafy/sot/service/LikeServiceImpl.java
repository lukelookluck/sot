package com.ssafy.sot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sot.dao.CommentLikeDAO;
import com.ssafy.sot.dto.CommentLikeDTO;

@Service
public class LikeServiceImpl implements LikeService {

	@Autowired
	CommentLikeDAO commentLikeDAO;
	
	@Override
	public boolean likeComment(int commentId, int userId) {
		CommentLikeDTO commentLikeDTO = new CommentLikeDTO();
		commentLikeDTO.setCommentId(commentId);
		commentLikeDTO.setUserId(userId);
		return commentLikeDAO.insertCommentLike(commentLikeDTO) == 1;
	}

	@Override
	public boolean cancelLikeComment(int commentId, int userId) {
		CommentLikeDTO commentLikeDTO = new CommentLikeDTO();
		commentLikeDTO.setCommentId(commentId);
		commentLikeDTO.setUserId(userId);
		return commentLikeDAO.deleteCommentLike(commentLikeDTO) == 1;
	}

}
