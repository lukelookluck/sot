package com.ssafy.sot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sot.dao.ArticleLikeDAO;
import com.ssafy.sot.dao.CommentLikeDAO;
import com.ssafy.sot.dto.ArticleLikeDTO;
import com.ssafy.sot.dto.CommentLikeDTO;

@Service
public class LikeServiceImpl implements LikeService {

	@Autowired
	CommentLikeDAO commentLikeDAO;
	
	@Autowired
	ArticleLikeDAO articleLikeDAO;
	
	@Override
	public boolean likeComment(int commentId, int userId) {
		CommentLikeDTO commentLikeDTO = new CommentLikeDTO();
		commentLikeDTO.setCommentId(commentId);
		commentLikeDTO.setUserId(userId);
		if(!commentLikeDAO.alreadyLikedComment(commentLikeDTO)) {
			return commentLikeDAO.insertCommentLike(commentLikeDTO) == 1;
		}
		// 이미 좋아요 한 경우 좋아요 취소를 대신 함?
		return commentLikeDAO.deleteCommentLike(commentLikeDTO) == 1;		
	}

	@Override
	public boolean cancelLikeComment(int commentId, int userId) {
		CommentLikeDTO commentLikeDTO = new CommentLikeDTO();
		commentLikeDTO.setCommentId(commentId);
		commentLikeDTO.setUserId(userId);
		if(commentLikeDAO.alreadyLikedComment(commentLikeDTO)) {
			return commentLikeDAO.deleteCommentLike(commentLikeDTO) == 1;
		}
		return false;
	}

	@Override
	public boolean likeArticle(int articleId, int userId) {
		ArticleLikeDTO articleLikeDTO = new ArticleLikeDTO();
		articleLikeDTO.setArticleId(articleId);
		articleLikeDTO.setUserId(userId);
		if(!articleLikeDAO.alreadyLikedArticle(articleLikeDTO)) {
			return articleLikeDAO.insertArticleLike(articleLikeDTO) == 1;
		}
		return articleLikeDAO.deleteArticleLike(articleLikeDTO) == 1;
	}

	@Override
	public boolean cancelLikeArticle(int articleId, int userId) {
		ArticleLikeDTO articleLikeDTO = new ArticleLikeDTO();
		articleLikeDTO.setArticleId(articleId);
		articleLikeDTO.setUserId(userId);
		if(articleLikeDAO.alreadyLikedArticle(articleLikeDTO)) {
			return articleLikeDAO.deleteArticleLike(articleLikeDTO) == 1;			
		}
		return false;
	}

}
