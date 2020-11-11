package com.ssafy.sot.dao;

import java.util.List;

import com.ssafy.sot.dto.ArticleLikeDTO;
import com.ssafy.sot.dto.Like;

public interface ArticleLikeDAO {
	
	int insertArticleLike(ArticleLikeDTO articleLikeDTO);
	int deleteArticleLike(ArticleLikeDTO articleLikeDTO);
	boolean alreadyLikedArticle(ArticleLikeDTO articleLikeDTO);
	List<Like> selectLikedUserList(int articleId);
}
