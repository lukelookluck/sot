package com.ssafy.sot.dao;

import java.util.List;

import com.ssafy.sot.dto.BoardDTO;
import com.ssafy.sot.dto.BoardFavDTO;
import com.ssafy.sot.dto.BoardFavReturnDTO;
import com.ssafy.sot.dto.BoardNewDTO;

public interface BoardDAO {
	
	List<BoardDTO> selectBoardsBySchoolId(int schoolId);
	int insertBoard(BoardNewDTO boardNewDTO);
	List<BoardFavReturnDTO> selectFavListByUserId(int userId);
	int insertBoardFav(BoardFavDTO boardFavDTO);
	int deleteBoardFav(BoardFavDTO boardFavDTO);
	boolean alreadyFaved(BoardFavDTO boardFavDTO);
	int insertBoardCreator(BoardNewDTO boardNewDTO);
	int deleteBaord(int id);

}
