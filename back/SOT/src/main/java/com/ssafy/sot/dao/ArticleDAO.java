package com.ssafy.sot.dao;

import java.util.List;

import com.ssafy.sot.dto.ArticleDTO;

public interface ArticleDAO {
	
	List<ArticleDTO> selectArticlesByBoardId(int boardId);
	ArticleDTO selectArticleById(int id);
	int insertArticle(ArticleDTO articleDTO);
	int updateArticle(ArticleDTO articleDTO);
	int deleteArticle(int id);

}
