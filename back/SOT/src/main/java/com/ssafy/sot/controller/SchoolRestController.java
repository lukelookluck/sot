package com.ssafy.sot.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sot.dto.ArticleDTO;
import com.ssafy.sot.dto.CommentDTO;
import com.ssafy.sot.dto.ReturnMsg;
import com.ssafy.sot.service.ArticleService;
import com.ssafy.sot.service.BoardService;
import com.ssafy.sot.service.CommentService;
import com.ssafy.sot.service.SchoolService;

import io.swagger.annotations.ApiOperation;
import io.swagger.models.Model;

@RestController
public class SchoolRestController {
	
	@Autowired
	SchoolService schoolService;
	
	@Autowired
	BoardService boardService;
	
	@Autowired
	ArticleService articleService;
	
	@Autowired
	CommentService commentService;
	
	@ApiOperation(value = "학교 검색, keyword 파라미터에 넣어서 보내면 검색함")
	@GetMapping("/search")
	public Object searchSchool(@RequestParam(value="keyword") String keyword) {
		return new ResponseEntity<>(schoolService.searchSchool(keyword), HttpStatus.OK);
	}
	
	@ApiOperation(value = "학교id로 게시판 목록 가져오기")
	@GetMapping("/boards")
	public Object boardList(@RequestParam(value="id") int id) {
		return new ResponseEntity<>(boardService.showSchoolBoards(id), HttpStatus.OK);
	}
	
	@ApiOperation(value = "게시판의 게시글 리스트 읽기")
	@GetMapping("/board/{boardId}")
	public Object articleList(@PathVariable("boardId") int boardId) {
		return new ResponseEntity<>(articleService.showArticles(boardId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "게시글 하나 읽기 (댓글 리스트도 가져옴)")
	@GetMapping("/board/{boardId}/{articleId}")
	public Object showArticle(@PathVariable("boardId") int boardId,
								@PathVariable("articleId") int articleId) {
		return new ResponseEntity<>(articleService.showArticle(articleId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "게시글 생성, created_at, updated_at 같은 것들은 무시하고 필수값만 넣으면 됨")
	@PostMapping("/board/{boardId}")
	public Object writeArticle(@PathVariable("boardId") int boardId, ArticleDTO articleDTO) {
		articleDTO.setBoardId(boardId);
		return new ResponseEntity<>(articleService.createArticle(articleDTO), HttpStatus.CREATED);
	}
	
	@ApiOperation(value = "게시글 수정, (created_at, updated_at 같은 것들은 무시하고 필수값만 넣으면 됨)")
	@PutMapping("/board/{boardId}/{articleId}")
	public Object modifyArticle(@PathVariable("boardId") int boardId,
								@PathVariable("articleId") int articleId, ArticleDTO articleDTO) {
		articleDTO.setBoardId(boardId);
		articleDTO.setId(articleId);
		return new ResponseEntity<>(articleService.updateArticle(articleDTO), HttpStatus.CREATED);
	}
	
	@ApiOperation(value = "게시글 삭제")
	@DeleteMapping("/board/{boardId}/{articleId}")
	public Object deleteArticle(@PathVariable("boardId") int boardId,
								@PathVariable("articleId") int articleId) {
		return new ResponseEntity<>(articleService.deleteArticle(articleId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "댓글 작성, (created_at, updated_at 같은 것들은 무시하고 필수값만 넣으면 됨)")
	public Object createComment(@PathVariable("boardId") int boardId,
								@PathVariable("articleId") int articleId, CommentDTO commentDTO) {
		commentDTO.setArticleId(articleId);
		return new ResponseEntity<>(commentService.createComment(commentDTO), HttpStatus.OK);
	}
	
	@ApiOperation(value = "댓글 수정, (created_at, updated_at 같은 것들은 무시하고 필수값만 넣으면 됨)")
	@PutMapping("/board/{boardId}/{articleId}/{commentId}")
	public Object updateComment(@PathVariable("boardId") int boardId,
								@PathVariable("articleId") int articleId,
								@PathVariable("commentId") int commentId, CommentDTO commentDTO) {
		commentDTO.setArticleId(articleId);
		commentDTO.setId(commentId);
		return new ResponseEntity<>(commentService.updateComment(commentDTO), HttpStatus.OK);
	}
	
	@ApiOperation(value = "댓글 삭제")
	@DeleteMapping("/board/{boardId}/{articleId}/{commentId}")
	public Object deleteComment(@PathVariable("boardId") int boardId,
								@PathVariable("articleId") int articleId,
								@PathVariable("commentId") int commentId) {
		return new ResponseEntity<>(commentService.deleteComment(commentId), HttpStatus.OK);
	}
	
}
