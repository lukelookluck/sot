package com.ssafy.sot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sot.dao.BoardDAO;
import com.ssafy.sot.dto.BoardDTO;

@Service
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	BoardDAO boardDAO;

	@Override
	public List<BoardDTO> showSchoolBoards(int schoolId) {
		return boardDAO.selectBoardsBySchoolId(schoolId);
	}

}
