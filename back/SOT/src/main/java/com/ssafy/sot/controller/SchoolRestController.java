package com.ssafy.sot.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sot.dto.ReturnMsg;
import com.ssafy.sot.service.BoardService;
import com.ssafy.sot.service.SchoolService;

import io.swagger.annotations.ApiOperation;
import io.swagger.models.Model;

@RestController
public class SchoolRestController {
	
	@Autowired
	SchoolService schoolService;
	
	@Autowired
	BoardService boardService;
	
	@ApiOperation(value = "학교 검색, keyword 파라미터에 넣어서 보내면 검색함")
	@GetMapping("/search")
	public Object searchSchool(@RequestParam(value="keyword") String keyword) {
		return new ResponseEntity<>(schoolService.searchSchool(keyword), HttpStatus.OK);
	}
	
	@GetMapping("/boards")
	public Object boardList(@RequestParam(value="id") int id) {
		return new ResponseEntity<>(boardService.showSchoolBoards(id), HttpStatus.OK);
	}
	
}
