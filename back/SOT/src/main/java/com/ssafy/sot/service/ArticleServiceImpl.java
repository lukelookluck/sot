package com.ssafy.sot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sot.dao.ArticleDAO;
import com.ssafy.sot.dao.CommentDAO;
import com.ssafy.sot.dto.ArticleDTO;
import com.ssafy.sot.dto.ArticleWithComment;
import com.ssafy.sot.dto.CommentDTO;

@Service
public class ArticleServiceImpl implements ArticleService {

	@Autowired
	ArticleDAO articleDAO;
	
	@Autowired
	CommentDAO commentDAO;
	
	@Override
	public List<ArticleDTO> showArticles(int boardId) {
		return articleDAO.selectArticlesByBoardId(boardId);
	}

	@Override
	public ArticleWithComment showArticle(int id) {
		ArticleDTO article = articleDAO.selectArticleById(id);
		List<CommentDTO> comments = commentDAO.selectCommentsByArticleId(id);
		if(article != null) {
			ArticleWithComment AWC = new ArticleWithComment(article, comments);
			return AWC;
		}
		return null;		
	}

	@Override
	public boolean createArticle(ArticleDTO articleDTO) {
		return articleDAO.insertArticle(articleDTO) == 1;
	}

	@Override
	public boolean updateArticle(ArticleDTO articleDTO) {
		return articleDAO.updateArticle(articleDTO) == 1;
	}

	@Override
	public boolean deleteArticle(int id) {
		return articleDAO.deleteArticle(id) == 1;
	}

}
