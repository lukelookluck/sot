package com.ssafy.sot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sot.dao.UserDAO;
import com.ssafy.sot.dto.UserDTO;
import com.ssafy.sot.dto.UserLoginDTO;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserDAO userDAO;
	
	@Override
	public List<UserDTO> searchAll() {
		return userDAO.selectUsers();
	}

	@Override
	public UserDTO search(int id) {
		return userDAO.selectUserById(id);
	}

	@Override
	public boolean createUser(UserDTO user) {
		return userDAO.insertUser(user)==1;
	}

	@Override
	public boolean updateUser(UserDTO user) {
		return userDAO.updateUser(user)==1;
	}

	@Override
	public UserDTO login(UserLoginDTO loginDTO) {
		return userDAO.login(loginDTO);
	}

}
