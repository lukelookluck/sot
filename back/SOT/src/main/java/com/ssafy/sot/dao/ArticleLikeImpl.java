package com.ssafy.sot.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ssafy.sot.dto.ArticleLikeDTO;
import com.ssafy.sot.dto.Like;

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

	@Override
	public boolean alreadyLikedArticle(ArticleLikeDTO articleLikeDTO) {
		ArticleLikeDTO dto = sqlSession.selectOne("like.articleLikeCheck", articleLikeDTO);
		return dto != null;
	}

	@Override
	public List<Like> selectLikedUserList(int articleId) {
		return sqlSession.selectList("like.selectLikesByArticleId", articleId);
	}

}
