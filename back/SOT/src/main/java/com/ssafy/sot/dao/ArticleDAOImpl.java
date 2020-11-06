package com.ssafy.sot.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ssafy.sot.dto.ArticleDTO;

@Repository
public class ArticleDAOImpl implements ArticleDAO {

	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<ArticleDTO> selectArticlesByBoardId(int boardId) {
		return sqlSession.selectList("article.selectArticlesByBoardId", boardId);
	}

	@Override
	public ArticleDTO selectArticleById(int id) {
		return sqlSession.selectOne("article.selectArticleById", id);
	}

	@Override
	public int insertArticle(ArticleDTO articleDTO) {
		return sqlSession.insert("article.insertArticle", articleDTO);
	}

	@Override
	public int updateArticle(ArticleDTO articleDTO) {
		return sqlSession.update("article.updateArticle", articleDTO);
	}

	@Override
	public int deleteArticle(int id) {
		return sqlSession.delete("article.deleteArticle", id);
	}

}
