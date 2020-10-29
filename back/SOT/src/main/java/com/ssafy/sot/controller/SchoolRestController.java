package com.ssafy.sot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sot.dto.ReturnMsg;
import com.ssafy.sot.service.SchoolService;

import io.swagger.annotations.ApiOperation;

@RestController
public class SchoolRestController {
	
	@Autowired
	SchoolService schoolService;
	
	@ApiOperation(value = "학교 검색, keyword 파라미터에 넣어서 보내면 검색함")
	public Object searchSchool(@RequestParam(value="keyword") String keyword) {
		return new ResponseEntity<>(schoolService.searchSchool(keyword), HttpStatus.OK);
	}
}
