package com.ssafy.sot.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sot.dao.ArticleDAO;
import com.ssafy.sot.dao.ArticleLikeDAO;
import com.ssafy.sot.dao.BoardDAO;
import com.ssafy.sot.dao.CommentDAO;
import com.ssafy.sot.dao.CommentLikeDAO;
import com.ssafy.sot.dto.ArticleDTO;
import com.ssafy.sot.dto.ArticleFullInfo;
import com.ssafy.sot.dto.ArticleLikeDTO;
import com.ssafy.sot.dto.ArticleListWithFav;
import com.ssafy.sot.dto.ArticleWithComment;
import com.ssafy.sot.dto.BoardFavDTO;
import com.ssafy.sot.dto.CommentDTO;
import com.ssafy.sot.dto.CommentLikeDTO;
import com.ssafy.sot.dto.CommentWithReply;
import com.ssafy.sot.dto.IdWithIndexDTO;
import com.ssafy.sot.dto.Like;
import com.ssafy.sot.dto.SearchDTO;

@Service
public class ArticleServiceImpl implements ArticleService {

	@Autowired
	ArticleDAO articleDAO;
	
	@Autowired
	CommentDAO commentDAO;
	
	@Autowired
	CommentLikeDAO commentLikeDAO;
	
	@Autowired
	ArticleLikeDAO articleLikeDAO;
	
	@Autowired
	BoardDAO boardDAO;
	
	@Override
	public ArticleListWithFav showArticles(int boardId, int userId) {
		BoardFavDTO boardFavDTO = new BoardFavDTO();
		boardFavDTO.setBoardId(boardId);
		boardFavDTO.setUserId(userId);
		boolean isFaved = boardDAO.alreadyFaved(boardFavDTO);
		List<ArticleFullInfo> articles = articleDAO.selectArticlesByBoardId(boardId);
		return new ArticleListWithFav(articles, isFaved);
	}

//	@Override
//	public ArticleWithComment showArticle(int id) {
//		ArticleDTO article = articleDAO.selectArticleById(id);
//		List<CommentDTO> originalComments = commentDAO.selectCommentsByArticleId(id);
//		List<CommentWithReply> comments = new ArrayList<>();
//		
//		for(CommentDTO originalComment : originalComments){
//			List<Like> likes = commentLikeDAO.selectLikedUserList(originalComment.getId());
//			originalComment.setLikes(likes);
//			
//			List<CommentDTO> originalReplies = commentDAO.selectReplyCommentsByParentId(originalComment.getId());
//			List<CommentDTO> replies = new ArrayList<>();
//			for(CommentDTO originalReply : originalReplies) {
//				originalReply.setLikes(commentLikeDAO.selectLikedUserList(originalReply.getId()));
//				replies.add(originalReply);
//			}
//			
//			CommentWithReply comment = new CommentWithReply(originalComment, replies);
//			comments.add(comment);
//		}
//		if(article != null) {
//			ArticleWithComment AWC = new ArticleWithComment(article, comments);
//			AWC.setLikes(articleLikeDAO.selectLikedUserList(article.getId()));
//			return AWC;
//		}
//		return null;		
//	}
	
	@Override
	public ArticleWithComment showArticle(int id, int userId) {
		ArticleDTO article = articleDAO.selectArticleById(id);
		List<CommentDTO> originalComments = commentDAO.selectCommentsByArticleId(id);
		List<CommentWithReply> comments = new ArrayList<>();
		
		for(CommentDTO originalComment : originalComments){
			CommentLikeDTO commentLikeDTO = new CommentLikeDTO();
			commentLikeDTO.setCommentId(originalComment.getId());
			commentLikeDTO.setUserId(userId);
			boolean commentIsLiked = commentLikeDAO.alreadyLikedComment(commentLikeDTO);
//			System.out.println(commentIsLiked);
			originalComment.setIsLiked(commentIsLiked);
			
			List<CommentDTO> originalReplies = commentDAO.selectReplyCommentsByParentId(originalComment.getId());
			List<CommentDTO> replies = new ArrayList<>();
			for(CommentDTO originalReply : originalReplies) {
				CommentLikeDTO replyLikeDTO = new CommentLikeDTO();
				replyLikeDTO.setCommentId(originalReply.getId());
				replyLikeDTO.setUserId(userId);
				boolean replyIsLiked = commentLikeDAO.alreadyLikedComment(replyLikeDTO);
				originalReply.setIsLiked(replyIsLiked);
				replies.add(originalReply);
			}
			
//			System.out.println(originalComment.getIsLiked());
			CommentWithReply comment = new CommentWithReply(originalComment, replies);
			comment.setIsLiked(commentIsLiked);
			comments.add(comment);
		}
		if(article != null) {
			ArticleWithComment AWC = new ArticleWithComment(article, comments);
			ArticleLikeDTO articleLikeDTO = new ArticleLikeDTO();
			articleLikeDTO.setArticleId(id);
			articleLikeDTO.setUserId(userId);
			AWC.setIsLiked(articleLikeDAO.alreadyLikedArticle(articleLikeDTO));
			
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

	@Override
	public List<ArticleFullInfo> showArticles(int boardId) {
		BoardFavDTO boardFavDTO = new BoardFavDTO();
		boardFavDTO.setBoardId(boardId);
		List<ArticleFullInfo> articles = articleDAO.selectArticlesByBoardId(boardId);
		return articles;
	}

	@Override
	public List<ArticleFullInfo> showArticles(int boardId, int startIdx, int amount) {
		IdWithIndexDTO idWithIndexDTO = new IdWithIndexDTO(boardId, startIdx, amount);
		return articleDAO.selectArticlesByBoardId(boardId, idWithIndexDTO);
	}

	@Override
	public List<ArticleFullInfo> showAllArticles(int schoolId, int startIdx, int amount) {
		IdWithIndexDTO idWithIndexDTO = new IdWithIndexDTO(schoolId, startIdx, amount);
		return articleDAO.selectArticlesBySchoolId(schoolId, idWithIndexDTO);
	}

	@Override
	public List<ArticleFullInfo> showAllBestArticles(int schoolId, int startIdx, int amount) {
		IdWithIndexDTO idWithIndexDTO = new IdWithIndexDTO(schoolId, startIdx, amount);
		return articleDAO.selectBestArticlesBySchoolId(schoolId, idWithIndexDTO);
	}

	@Override
	public List<ArticleFullInfo> showBestArticles(int boardId, int startIdx, int amount) {
		IdWithIndexDTO idWithIndexDTO = new IdWithIndexDTO(boardId, startIdx, amount);
		return articleDAO.selectBestArticlesByBoardId(boardId, idWithIndexDTO);
	}

	@Override
	public List<ArticleFullInfo> showMyArticles(int userId) {
		return articleDAO.selectMyArticles(userId);
	}

	@Override
	public List<ArticleFullInfo> showLikedArticles(int userId) {
		return articleDAO.selectLikedArticles(userId);
	}

	@Override
	public List<ArticleFullInfo> searchTitle(int schoolId, String keyword) {
		keyword = "%" + keyword + "%";
		SearchDTO dto = new SearchDTO(schoolId, keyword);
		return articleDAO.searchTitle(dto);
	}

	@Override
	public List<ArticleFullInfo> searchTitleOrContent(int schoolId, String keyword) {
		keyword = "%" + keyword + "%";
		SearchDTO dto = new SearchDTO(schoolId, keyword);
		return articleDAO.searchTitleOrContent(dto);
	}

	@Override
	public List<ArticleFullInfo> showMyArticles(int userId, int startIdx, int amount) {
		IdWithIndexDTO idWithIndexDTO = new IdWithIndexDTO(userId, startIdx, amount);
		return articleDAO.selectMyArticles(userId, idWithIndexDTO);
	}

	@Override
	public List<ArticleFullInfo> showLikedArticles(int userId, int startIdx, int amount) {
		IdWithIndexDTO idWithIndexDTO = new IdWithIndexDTO(userId, startIdx, amount);
		return articleDAO.selectLikedArticles(userId, idWithIndexDTO);
	}

}
