package com.ssafy.sot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sot.dao.UserNoticeDAO;
import com.ssafy.sot.dto.UserNoticeDTO;

@Service
public class UserNoticeServiceImpl implements UserNoticeService {

	@Autowired
	UserNoticeDAO usernoticeDAO;
	
	@Override
	public List<UserNoticeDTO> showAll() {
		return usernoticeDAO.selectUserNotices();
	}

	@Override
	public UserNoticeDTO showUserNoticeByUserId(int userId) {
		return usernoticeDAO.selectUserNoticeByUserId(userId);
	}

	@Override
	public boolean createUserNotice(UserNoticeDTO usernotice) {
		return usernoticeDAO.insertUserNotice(usernotice)==1;
	}

	@Override
	public boolean updqteReadByUserId(int userId) {
		return usernoticeDAO.updateReadByUserId(userId)==1;
	}

	@Override
	public boolean deleteUserNotice(int id) {
		return usernoticeDAO.deleteUserNotice(id)==1;
	}

}
