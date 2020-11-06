package com.ssafy.sot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sot.dao.BoardDAO;
import com.ssafy.sot.dto.BoardDTO;
import com.ssafy.sot.dto.BoardFavDTO;
import com.ssafy.sot.dto.BoardFavReturnDTO;
import com.ssafy.sot.dto.BoardNewDTO;

@Service
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	BoardDAO boardDAO;
	
	@Override
	public List<BoardDTO> showSchoolBoards(int schoolId) {
		return boardDAO.selectBoardsBySchoolId(schoolId);
	}

	@Override
	public boolean createNewBoard(BoardNewDTO boardNewDTO) {
		if(boardDAO.insertBoard(boardNewDTO) == 1) {
			return boardDAO.insertBoardCreator(boardNewDTO) == 1;
		}
		return false;
	}

	@Override
	public List<BoardFavReturnDTO> showFavBoards(int userId) {
		return boardDAO.selectFavListByUserId(userId);
	}

	@Override
	public boolean favBoard(int boardId, int userId) {
		BoardFavDTO dto = new BoardFavDTO();
		dto.setBoardId(boardId);
		dto.setUserId(userId);
		// 이미 즐겨찾기 한 경우 처리
		if(boardDAO.alreadyFaved(dto)) {
			return false;
		}
		return boardDAO.insertBoardFav(dto) == 1;
	}

	@Override
	public boolean unfavBoard(int boardId, int userId) {
		BoardFavDTO dto = new BoardFavDTO();
		dto.setBoardId(boardId);
		dto.setUserId(userId);
		return boardDAO.deleteBoardFav(dto) == 1;
	}

}
