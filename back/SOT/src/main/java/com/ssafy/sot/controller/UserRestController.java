package com.ssafy.sot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sot.dto.ReturnMsg;
import com.ssafy.sot.dto.UserDTO;
import com.ssafy.sot.service.UserService;

@RestController
@RequestMapping("/user")
public class UserRestController {

	@Autowired
	UserService userService;

	public Object register(UserDTO user) {
		System.out.println("회원가입 시작");
		try {
			if (userService.createUser(user)) {
				System.out.println("회원가입 성공!!!");
				return new ResponseEntity<>(user, HttpStatus.OK);
			} else {
				System.out.println("회원가입 실패...");
				return new ResponseEntity<>(new ReturnMsg("회원가입에 실패했습니다. 입력한 정보를 확인해주세요."),
						HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch (Exception e) {
			System.out.println("***서버 에러***");
			return new ResponseEntity<>(new ReturnMsg("회원가입에 실패했습니다. 시스템 관리자에게 문의해주세요."),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	@GetMapping("/")
	public Object searchAll() {
		System.out.println("유저정보 전체 조회");
		Object dto;
		dto = userService.searchAll();
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public Object searchById(@PathVariable("id") int id) {
		System.out.println(id + "번의 유저정보 상세 조회");
		UserDTO dto = userService.search(id);
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PutMapping("/")
	public Object update(UserDTO user) {
		System.out.println("유저 정보 수정");
		
		try {
			if(userService.updateUser(user)) {
				System.out.println("유저정보 수정 성공!!!");
				return new ResponseEntity<>(user, HttpStatus.OK);
			} else {
				System.out.println("유저정보 수정 실패...");
				return new ResponseEntity<>(new ReturnMsg("회원가입에 실패했습니다. 입력한 정보를 확인해주세요."),
						HttpStatus.INTERNAL_SERVER_ERROR);
			}			
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new ReturnMsg("회원가입에 실패했습니다. 시스템 관리자에게 문의해주세요."),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
			
	}
}
