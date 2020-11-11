package com.ssafy.sot.dao;

import java.util.List;

import com.ssafy.sot.dto.ArticleLikeDTO;
import com.ssafy.sot.dto.CommentLikeDTO;
import com.ssafy.sot.dto.Like;

public interface CommentLikeDAO {
	
	int insertCommentLike(CommentLikeDTO commentLikeDTO);
	int deleteCommentLike(CommentLikeDTO commentLikeDTO);
	boolean alreadyLikedComment(CommentLikeDTO commentLikeDTO);
	List<Like> selectLikedUserList(int commentId);
}
