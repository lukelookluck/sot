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
	
	public List<ArticleFullInfo> showArticles(int boardId, int startIdx, int amount);
	public List<ArticleFullInfo> showAllArticles(int schoolId, int startIdx, int amount);
	public List<ArticleFullInfo> showAllBestArticles(int schoolId, int startIdx, int amount);
	public List<ArticleFullInfo> showBestArticles(int boardId, int startIdx, int amount);
	public List<ArticleFullInfo> showMyArticles(int userId, int startIdx, int amount);
	public List<ArticleFullInfo> showLikedArticles(int userId, int startIdx, int amount);
	
	public List<ArticleFullInfo> showMyArticles(int userId);
	public List<ArticleFullInfo> showLikedArticles(int userId);
	public List<ArticleFullInfo> searchTitle(int schoolId, String keyword);
	public List<ArticleFullInfo> searchTitleOrContent(int schoolId, String keyword);
}
