package com.ssafy.sot.dao;

import java.util.List;

import com.ssafy.sot.dto.BoardDTO;
import com.ssafy.sot.dto.BoardNewDTO;

public interface BoardDAO {
	
	List<BoardDTO> selectBoardsBySchoolId(int schoolId);
	int insertBoard(BoardNewDTO boardNewDTO);

}
