package com.ssafy.sot.service;

import java.util.List;

import com.ssafy.sot.dto.BoardDTO;
import com.ssafy.sot.dto.BoardFavReturnDTO;
import com.ssafy.sot.dto.BoardNewDTO;

public interface BoardService {
	
	List<BoardDTO> showSchoolBoards(int schoolId, int userId);
	boolean createNewBoard(BoardNewDTO boardNewDTO);
	List<BoardFavReturnDTO> showFavBoards(int userId);
	boolean favBoard(int boardId, int userId);
	boolean unfavBoard(int boardId, int userId);
	boolean isFaved(int boardId, int userId);
	boolean deleteBoard(int id);

}
