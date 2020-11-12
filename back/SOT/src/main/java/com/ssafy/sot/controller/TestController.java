package com.ssafy.sot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sot.service.BoardService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/test")
public class TestController {
	
	@Autowired
	BoardService boardService;
	
	@ApiOperation(value = "게시판 삭제 (개발용)")
	@DeleteMapping("/board/{boardId}")
	public Object deleteBoard(@PathVariable("boardId") int boardId) {
		return new ResponseEntity<>(boardService.deleteBoard(boardId), HttpStatus.OK);
	}
}
