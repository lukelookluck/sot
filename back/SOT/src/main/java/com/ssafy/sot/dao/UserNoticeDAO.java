package com.ssafy.sot.dao;

import java.util.List;

import com.ssafy.sot.dto.UserNoticeDTO;

public interface UserNoticeDAO {
	List<UserNoticeDTO> selectUserNotices();
	UserNoticeDTO selectUserNoticeByUserId(int userId);
	int insertUserNotice (UserNoticeDTO usernotice);
	int updateReadByUserId(int userId);
	int deleteUserNotice(int id);
}
