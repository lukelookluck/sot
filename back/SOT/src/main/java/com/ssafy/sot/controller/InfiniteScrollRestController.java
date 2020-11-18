package com.ssafy.sot.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sot.service.ArticleService;
import com.ssafy.sot.service.SchoolService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/scroll")
public class InfiniteScrollRestController {
	
	@Autowired
	SchoolService schoolService;
	
	@Autowired
	ArticleService articleService;
	
	@ApiOperation(value = "전체 게시글 가져오기")
	@GetMapping("/board/all")
	public Object allArticles(@RequestParam("schoolId") int schoolId, @RequestParam("startIdx") int startIdx,
			@RequestParam("anount") int amount) {
		try {
			return new ResponseEntity<>(articleService.showAllArticles(schoolId, startIdx, amount), HttpStatus.OK);			
		} catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ApiOperation(value = "전체 베스트 게시글 가져오기")
	@GetMapping("/board/all/best")
	public Object allBestArticles(@RequestParam("schoolId") int schoolId, @RequestParam("startIdx") int startIdx,
			@RequestParam("anount") int amount) {
		try {
			return new ResponseEntity<>(articleService.showAllBestArticles(schoolId, startIdx, amount), HttpStatus.OK);			
		} catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ApiOperation(value = "특정 게시판 베스트 게시글 가져오기")
	@GetMapping("/board/{boardId}/best")
	public Object boardBestArticles(@PathVariable("boardId") int boardId, @RequestParam("startIdx") int startIdx,
			@RequestParam("anount") int amount) {
		try {
			return new ResponseEntity<>(articleService.showBestArticles(boardId, startIdx, amount), HttpStatus.OK);			
		} catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
	
	@ApiOperation(value = "게시판의 게시글 리스트 읽기")
	@GetMapping("/board/{boardId}")
	public Object articleList(@PathVariable("boardId") int boardId, HttpServletRequest request,
			@RequestParam("startIdx") int startIdx, @RequestParam("anount") int amount) {
		try {
			return new ResponseEntity<>(articleService.showArticles(boardId, startIdx, amount), HttpStatus.OK);			
		} catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	/////////new
	@ApiOperation(value = "내가 쓴 글")
	@GetMapping("/myarticles")
	public Object articleList(@RequestParam("id") int userId,
			@RequestParam("startIdx") int startIdx, @RequestParam("anount") int amount) {
		try {
			return new ResponseEntity<>(articleService.showMyArticles(userId, startIdx, amount), HttpStatus.OK);			
		} catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ApiOperation(value = "좋아요 한 게시글 가져오기")
	@GetMapping("/likedarticles")
	public Object likedArticles(@RequestParam("id") int userId,
			@RequestParam("startIdx") int startIdx, @RequestParam("anount") int amount) {
		try {
			return new ResponseEntity<>(articleService.showLikedArticles(userId, startIdx, amount), HttpStatus.OK);			
		} catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
}
