package com.ssafy.sot.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ssafy.sot.dto.UserDTO;
import com.ssafy.sot.dto.UserInfoDTO;
import com.ssafy.sot.dto.UserLoginDTO;

@Repository
public class UserDAOImpl implements UserDAO {

	@Autowired
	SqlSession sqlsession;
	
	@Override
	public List<UserDTO> selectUsers() {
		return sqlsession.selectList("user.selectUsers");
	}

	@Override
	public UserDTO selectUserById(int id) {
		return sqlsession.selectOne("user.selectUserById", id);
	}

	@Override
	public int insertUser(UserDTO user) {
		return sqlsession.insert("user.insertUser", user);
	}

	@Override
	public int updateUser(UserDTO user) {
		return sqlsession.update("user.updateUser", user);
	}

	@Override
	public UserInfoDTO login(UserLoginDTO loginDTO) {
		return sqlsession.selectOne("user.login", loginDTO);
	}

}
