package com.ssafy.sot.dao;

import java.util.List;

import com.ssafy.sot.dto.ArticleDTO;
import com.ssafy.sot.dto.ArticleFullInfo;
import com.ssafy.sot.dto.IdWithIndexDTO;
import com.ssafy.sot.dto.SearchDTO;

public interface ArticleDAO {
	
	List<ArticleFullInfo> selectArticlesByBoardId(int boardId);
	ArticleDTO selectArticleById(int id);
	int insertArticle(ArticleDTO articleDTO);
	int updateArticle(ArticleDTO articleDTO);
	int deleteArticle(int id);
	List<ArticleFullInfo> selectArticlesBySchoolId(int schoolId);
	List<ArticleFullInfo> selectBestArticlesBySchoolId(int schoolId);
	List<ArticleFullInfo> selectBestArticlesByBoardId(int boardId);
	
	List<ArticleFullInfo> selectArticlesBySchoolId(int schoolId, IdWithIndexDTO idWithIndexDTO);
	List<ArticleFullInfo> selectBestArticlesBySchoolId(int schoolId, IdWithIndexDTO idWithIndexDTO);
	List<ArticleFullInfo> selectBestArticlesByBoardId(int boardId, IdWithIndexDTO idWithIndexDTO);
	List<ArticleFullInfo> selectArticlesByBoardId(int boardId, IdWithIndexDTO idWithIndexDTO);
	List<ArticleFullInfo> selectMyArticles(int userId, IdWithIndexDTO idWithIndexDTO);
	List<ArticleFullInfo> selectLikedArticles(int userId, IdWithIndexDTO idWithIndexDTO);
	
	List<ArticleFullInfo> selectMyArticles(int userId);
	List<ArticleFullInfo> selectLikedArticles(int userId);
	List<ArticleFullInfo> searchTitle(SearchDTO searchDTO);
	List<ArticleFullInfo> searchTitleOrContent(SearchDTO searchDTO);
}
