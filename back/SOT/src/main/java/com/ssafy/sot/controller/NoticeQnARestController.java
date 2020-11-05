package com.ssafy.sot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sot.dto.ArticleDTO;
import com.ssafy.sot.service.ArticleService;
import com.ssafy.sot.service.CommentService;

import io.swagger.annotations.ApiOperation;

@RestController
public class NoticeQnARestController {
	
	@Autowired
	ArticleService articleService;
	
	@Autowired
	CommentService commentService;
	
	@ApiOperation(value = "공지사항 리스트 가져오기")
	@GetMapping("/notice")
	public Object showNoticeList() {
		return new ResponseEntity<>(articleService.showArticles(1), HttpStatus.OK);
	}
	
	@ApiOperation(value = "공지사항 글 하나 읽기")
	@GetMapping("/notice/{articleId}")
	public Object readNotice(@PathVariable("articleId") int articleId) {
		return new ResponseEntity<>(articleService.showArticle(articleId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "공지사항 글 작성")
	@PostMapping("/notice")
	public Object writeNotice(@RequestBody ArticleDTO articleDTO) {
		articleDTO.setBoardId(1);
		return new ResponseEntity<>(articleService.createArticle(articleDTO), HttpStatus.OK);
	}
	
	@ApiOperation(value = "공지사항 글 수정")
	@PutMapping("/notice/{articleId}")
	public Object modifyNotice(@PathVariable("articleId") int articleId,
								@RequestBody ArticleDTO articleDTO) {
		articleDTO.setBoardId(1);
		articleDTO.setId(articleId);
		return new ResponseEntity<>(articleService.updateArticle(articleDTO), HttpStatus.OK);
	}
	
	@ApiOperation(value = "공지사항 글 삭제")
	@DeleteMapping("/notice/{articleId}")
	public Object deleteNotice(@PathVariable("articleId") int articleId) {
		return new ResponseEntity<>(articleService.deleteArticle(articleId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "QnA 글 리스트 가져오기")
	@GetMapping("/qna")
	public Object showQnAList() {
		return new ResponseEntity<>(articleService.showArticles(2), HttpStatus.OK);
	}
	
	@ApiOperation(value = "QnA 글 하나 읽기")
	@GetMapping("/qna/{articleId}")
	public Object readOneQnA(@PathVariable("articleId") int articleId) {
		return new ResponseEntity<>(articleService.showArticle(articleId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "QnA 글 작성")
	@PostMapping("/qna")
	public Object createQnA(@RequestBody ArticleDTO articleDTO) {
		articleDTO.setBoardId(2);
		return new ResponseEntity<>(articleService.createArticle(articleDTO), HttpStatus.OK);
	}
	
	@ApiOperation(value = "QnA 글 수정")
	@PutMapping("/qna/{articleId}")
	public Object modifyQnA(@PathVariable("articleId") int articleId,
							@RequestBody ArticleDTO articleDTO) {
		articleDTO.setBoardId(2);
		articleDTO.setId(articleId);
		return new ResponseEntity<>(articleService.updateArticle(articleDTO), HttpStatus.OK);
	}
	
	@ApiOperation(value = "QnA 글 삭제")
	@DeleteMapping("/qna/{articleId}")
	public Object deleteQnA(@PathVariable("articleId") int articleId) {
		return new ResponseEntity<>(articleService.deleteArticle(articleId), HttpStatus.OK);
	}
}
