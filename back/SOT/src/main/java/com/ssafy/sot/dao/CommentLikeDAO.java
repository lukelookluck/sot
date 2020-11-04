package com.ssafy.sot.dao;

import com.ssafy.sot.dto.CommentLikeDTO;

public interface CommentLikeDAO {
	
	int insertCommentLike(CommentLikeDTO commentLikeDTO);
	int deleteCommentLike(CommentLikeDTO commentLikeDTO);

}
