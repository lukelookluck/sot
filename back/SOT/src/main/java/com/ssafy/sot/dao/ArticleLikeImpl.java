package com.ssafy.sot.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ssafy.sot.dto.ArticleLikeDTO;

@Repository
public class ArticleLikeImpl implements ArticleLikeDAO {

	@Autowired
	SqlSession sqlSession;
	
	@Override
	public int insertArticleLike(ArticleLikeDTO articleLikeDTO) {
		return sqlSession.insert("like.likeArticle", articleLikeDTO);
	}

	@Override
	public int deleteArticleLike(ArticleLikeDTO articleLikeDTO) {
		return sqlSession.delete("like.deleteArticleLike", articleLikeDTO);
	}

}
