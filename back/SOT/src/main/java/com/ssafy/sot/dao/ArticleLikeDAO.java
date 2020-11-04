package com.ssafy.sot.dao;

import com.ssafy.sot.dto.ArticleLikeDTO;

public interface ArticleLikeDAO {
	
	int insertArticleLike(ArticleLikeDTO articleLikeDTO);
	int deleteArticleLike(ArticleLikeDTO articleLikeDTO);

}
