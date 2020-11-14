package com.ssafy.sot.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ssafy.sot.dto.UserNoticeDTO;

@Repository
public class UserNoticeDAOImpl implements UserNoticeDAO {

	@Autowired
	SqlSession sqlsession;
	
	@Override
	public List<UserNoticeDTO> selectUserNotices() {
		return sqlsession.selectList("usernotice.selectUserNotices");
	}

	@Override
	public UserNoticeDTO selectUserNoticeByUserId(int userId) {
		return sqlsession.selectOne("usernotice.selectUserNoticeByUserId", userId);
	}

	@Override
	public int insertUserNotice(UserNoticeDTO usernotice) {
		return sqlsession.insert("usernotice.insertUserNotice", usernotice);
	}

	@Override
	public int updateReadByUserId(int userId) {
		return sqlsession.update("usernotice.updateReadById", userId);
	}

	@Override
	public int deleteUserNotice(int id) {
		return sqlsession.delete("usernotice.deleteUserNotice", id);
	}

}
