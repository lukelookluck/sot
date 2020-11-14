package com.ssafy.sot.dto;

import java.util.List;

public class ArticleListWithFav {
	
	List<ArticleFullInfo> articles;
	boolean isFaved;
	
	public List<ArticleFullInfo> getArticles() {
		return articles;
	}
	public void setArticles(List<ArticleFullInfo> articles) {
		this.articles = articles;
	}
	public boolean isFaved() {
		return isFaved;
	}
	public void setFaved(boolean isFaved) {
		this.isFaved = isFaved;
	}
	@Override
	public String toString() {
		return "ArticleListWithFav [articles=" + articles + ", isFaved=" + isFaved + "]";
	}
	public ArticleListWithFav(List<ArticleFullInfo> articles, boolean isFaved) {
		this.articles = articles;
		this.isFaved = isFaved;
	}
	
	

}
