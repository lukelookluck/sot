package com.ssafy.sot.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ssafy.sot.dto.ArticleDTO;
import com.ssafy.sot.dto.ArticleFullInfo;
import com.ssafy.sot.dto.IdWithIndexDTO;
import com.ssafy.sot.dto.SearchDTO;

@Repository
public class ArticleDAOImpl implements ArticleDAO {

	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<ArticleFullInfo> selectArticlesByBoardId(int boardId) {
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

	@Override
	public List<ArticleFullInfo> selectArticlesBySchoolId(int schoolId) {
		return sqlSession.selectList("article.selectArticlesBySchoolId", schoolId);
	}

	@Override
	public List<ArticleFullInfo> selectBestArticlesBySchoolId(int schoolId) {
		return sqlSession.selectList("article.selectBestArticlesBySchoolId", schoolId);
	}

	@Override
	public List<ArticleFullInfo> selectBestArticlesByBoardId(int boardId) {
		return sqlSession.selectList("article.selectBestArticlesByBoardId", boardId);
	}

	@Override
	public List<ArticleFullInfo> selectArticlesBySchoolId(int schoolId, IdWithIndexDTO idWithIndexDTO) {
		return sqlSession.selectList("article.selectArticlesBySchoolIdWithLimit", idWithIndexDTO);
	}

	@Override
	public List<ArticleFullInfo> selectBestArticlesBySchoolId(int schoolId, IdWithIndexDTO idWithIndexDTO) {
		return sqlSession.selectList("article.selectBestArticlesBySchoolIdWithLimit", idWithIndexDTO);
	}

	@Override
	public List<ArticleFullInfo> selectBestArticlesByBoardId(int boardId, IdWithIndexDTO idWithIndexDTO) {
		return sqlSession.selectList("article.selectBestArticlesByBoardIdWithLimit", idWithIndexDTO);
	}

	@Override
	public List<ArticleFullInfo> selectArticlesByBoardId(int boardId, IdWithIndexDTO idWithIndexDTO) {
		return sqlSession.selectList("article.selectArticlesByBoardIdWithLimit", idWithIndexDTO);
	}

	@Override
	public List<ArticleFullInfo> selectMyArticles(int userId) {
		return sqlSession.selectList("article.selectMyArticles", userId);
	}

	@Override
	public List<ArticleFullInfo> selectLikedArticles(int userId) {
		return sqlSession.selectList("article.selectLikedArticles", userId);
	}

	@Override
	public List<ArticleFullInfo> searchTitle(SearchDTO searchDTO) {
		return sqlSession.selectList("article.searchTitle", searchDTO);
	}

	@Override
	public List<ArticleFullInfo> searchTitleOrContent(SearchDTO searchDTO) {
		return sqlSession.selectList("article.searchTitleOrContent", searchDTO);
	}

}
