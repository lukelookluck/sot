package com.ssafy.sot.service;

import java.util.List;

import com.ssafy.sot.dto.UserDTO;
import com.ssafy.sot.dto.UserInfoDTO;
import com.ssafy.sot.dto.UserLoginDTO;

public interface UserService {

	// 유저 전체 조회
	List<UserDTO> searchAll();
	// 유저 상세 조회
	UserDTO search(int id);
	// 회원가입
	boolean createUser(UserDTO user);
	// 회원 정보 수정
	boolean updateUser(UserDTO user);
	// 로그인
	UserInfoDTO login(UserLoginDTO loginDTO);
}
