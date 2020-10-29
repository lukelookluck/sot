package com.ssafy.sot.dao;

import java.util.List;

import com.ssafy.sot.dto.BoardDTO;

public interface BoardDAO {
	
	List<BoardDTO> selectBoardsBySchoolId(int schoolId);

}
