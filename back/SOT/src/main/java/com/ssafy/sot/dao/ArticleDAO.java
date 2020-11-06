package com.ssafy.sot.dao;

import java.util.List;

import com.ssafy.sot.dto.ArticleDTO;
import com.ssafy.sot.dto.ArticleFullInfo;

public interface ArticleDAO {
	
	List<ArticleDTO> selectArticlesByBoardId(int boardId);
	ArticleDTO selectArticleById(int id);
	int insertArticle(ArticleDTO articleDTO);
	int updateArticle(ArticleDTO articleDTO);
	int deleteArticle(int id);
	List<ArticleFullInfo> selectArticlesBySchoolId(int schoolId);
	List<ArticleFullInfo> selectBestArticlesBySchoolId(int schoolId);
	List<ArticleDTO> selectBestArticlesByBoardId(int boardId);

}
