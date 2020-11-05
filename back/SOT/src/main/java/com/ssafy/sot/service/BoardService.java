package com.ssafy.sot.service;

import java.util.List;

import com.ssafy.sot.dto.BoardDTO;
import com.ssafy.sot.dto.BoardNewDTO;

public interface BoardService {
	
	List<BoardDTO> showSchoolBoards(int schoolId);
	boolean createNewBoard(BoardNewDTO boardNewDTO);

}
