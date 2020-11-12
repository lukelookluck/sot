package com.ssafy.sot.service;

import java.util.List;

import com.ssafy.sot.dto.ArticleDTO;
import com.ssafy.sot.dto.ArticleFullInfo;
import com.ssafy.sot.dto.ArticleListWithFav;
import com.ssafy.sot.dto.ArticleWithComment;

public interface ArticleService {
	
	public ArticleListWithFav showArticles(int boardId, int userId);
	public List<ArticleFullInfo> showArticles(int boardId);
	public ArticleWithComment showArticle(int id, int userId);
//	public ArticleWithComment showArticle(int id);
	public boolean createArticle(ArticleDTO articleDTO);
	public boolean updateArticle(ArticleDTO articleDTO);
	public boolean deleteArticle(int id);
	public List<ArticleFullInfo> showAllArticles(int schoolId);
	public List<ArticleFullInfo> showAllBestArticles(int schoolId);
	public List<ArticleFullInfo> showBestArticles(int boardId);

}
