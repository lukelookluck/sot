package com.ssafy.sot.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ssafy.sot.dto.BoardDTO;
import com.ssafy.sot.dto.BoardNewDTO;

@Repository
public class BoardDAOImpl implements BoardDAO {

	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<BoardDTO> selectBoardsBySchoolId(int schoolId) {
		return sqlSession.selectList("board.selectBoardsBySchoolId", schoolId);
	}

	@Override
	public int insertBoard(BoardNewDTO boardNewDTO) {
		return sqlSession.insert("board.insertNewBoard", boardNewDTO);
	}

}
