package com.ssafy.sot.service;

import java.util.List;

import com.ssafy.sot.dto.UserNoticeDTO;

public interface UserNoticeService {

	List<UserNoticeDTO> showAll();
	UserNoticeDTO showUserNoticeByUserId(int userId);
	boolean createUserNotice(UserNoticeDTO usernotice);
	boolean updqteReadByUserId(int userId);
	boolean deleteUserNotice(int id);
}
