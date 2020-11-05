package com.ssafy.sot.dao;

import java.util.List;

import com.ssafy.sot.dto.UserDTO;
import com.ssafy.sot.dto.UserLoginDTO;

public interface UserDAO {
	
	// 유저 전체 조회
	List<UserDTO> selectUsers();
	// 유저 id로 상세 조회
	UserDTO selectUserById(int id);
	// 회원가입
	int insertUser(UserDTO user);
	// 회원정보 수정
	int updateUser(UserDTO user);
	// 로그인
	UserDTO login(UserLoginDTO loginDTO);
}
