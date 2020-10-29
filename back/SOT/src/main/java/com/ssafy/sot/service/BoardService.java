package com.ssafy.sot.service;

import java.util.List;

import com.ssafy.sot.dto.BoardDTO;

public interface BoardService {
	
	List<BoardDTO> showSchoolBoards(int schoolId);

}
