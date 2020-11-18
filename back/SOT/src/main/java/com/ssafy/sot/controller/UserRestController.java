package com.ssafy.sot.controller;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sot.dto.ReturnMsg;
import com.ssafy.sot.dto.UserDTO;
import com.ssafy.sot.dto.UserInfoDTO;
import com.ssafy.sot.dto.UserLoginDTO;
import com.ssafy.sot.dto.UserInfoWithToken;
import com.ssafy.sot.service.UserService;
import com.ssafy.sot.util.JWTUtil;

@RestController
@RequestMapping("/user")
public class UserRestController {

	@Autowired
	UserService userService;
	
	@Autowired
	JWTUtil jwtUtil;

	@PostMapping("/")
	public Object register(@RequestBody UserDTO user) {
		System.out.println("회원가입 시작");
		try {
			System.out.println(user);
			if (userService.createUser(user)) {
				System.out.println("회원가입 성공!!!");
				// 회원가입 성공하면 바로 로그인 시도     
				UserLoginDTO loginDTO = new UserLoginDTO(user.getEmail(), user.getPassword());
				UserInfoDTO uservo = userService.login(loginDTO);
				if(uservo != null) {
					String token = jwtUtil.createToken(uservo);
					System.out.println(uservo.getNickname() + " 유저 토큰 발행 : " + token);
					UserInfoWithToken userWithToken = new UserInfoWithToken(uservo, token);
					return new ResponseEntity<>(userWithToken, HttpStatus.OK);
				} else {
					return new ResponseEntity<>(new ReturnMsg("아이디 또는 비밀번호가 일치하지 않습니다. 다시 한번 확인해주세요."), HttpStatus.I_AM_A_TEAPOT);
				}
			} else {
				System.out.println("회원가입 실패...");
				return new ResponseEntity<>(new ReturnMsg("회원가입에 실패했습니다. 입력한 정보를 확인해주세요."),
						HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch (Exception e) {
			e.printStackTrace();
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
	
	@GetMapping("login")
	public Object login(@RequestParam String email, @RequestParam String password) {
		try {
			System.out.println("email: " + email);
			Timestamp timestamp = new Timestamp(System.currentTimeMillis());
			System.out.println("currentTimeStamp: " + timestamp);
			UserLoginDTO loginDTO = new UserLoginDTO(email, password);
			UserInfoDTO uservo = userService.login(loginDTO);
			if(uservo != null) {
				String token = jwtUtil.createToken(uservo);
				System.out.println(uservo.getNickname() + " 유저 토큰 발행 : " + token);
				UserInfoWithToken userWithToken = new UserInfoWithToken(uservo, token);
				return new ResponseEntity<>(userWithToken, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(new ReturnMsg("아이디 또는 비밀번호가 일치하지 않습니다. 다시 한번 확인해주세요."), HttpStatus.I_AM_A_TEAPOT);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ReturnMsg("입력하신 정보를 다시 한번 확인해주세요."), HttpStatus.BAD_REQUEST);
	}
}