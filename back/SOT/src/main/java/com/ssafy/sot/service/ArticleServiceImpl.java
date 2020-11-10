package com.ssafy.sot.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sot.dao.ArticleDAO;
import com.ssafy.sot.dao.CommentDAO;
import com.ssafy.sot.dto.ArticleDTO;
import com.ssafy.sot.dto.ArticleFullInfo;
import com.ssafy.sot.dto.ArticleWithComment;
import com.ssafy.sot.dto.CommentDTO;
import com.ssafy.sot.dto.CommentWithReply;

@Service
public class ArticleServiceImpl implements ArticleService {

	@Autowired
	ArticleDAO articleDAO;
	
	@Autowired
	CommentDAO commentDAO;
	
	@Override
	public List<ArticleFullInfo> showArticles(int boardId) {
		return articleDAO.selectArticlesByBoardId(boardId);
	}

	@Override
	public ArticleWithComment showArticle(int id) {
		ArticleDTO article = articleDAO.selectArticleById(id);
		List<CommentDTO> originalComments = commentDAO.selectCommentsByArticleId(id);
		List<CommentWithReply> comments = new ArrayList<>();
		for(CommentDTO originalComment : originalComments){
			CommentWithReply comment = new CommentWithReply(originalComment, commentDAO.selectReplyCommentsByParentId(originalComment.getId()));
			comments.add(comment);
		}
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

	@Override
	public List<ArticleFullInfo> showAllArticles(int schoolId) {
		return articleDAO.selectArticlesBySchoolId(schoolId);
	}

	@Override
	public List<ArticleFullInfo> showAllBestArticles(int schoolId) {
		return articleDAO.selectBestArticlesBySchoolId(schoolId);
	}

	@Override
	public List<ArticleFullInfo> showBestArticles(int boardId) {
		return articleDAO.selectBestArticlesByBoardId(boardId);
	}

}
