package com.ssafy.sot.dao;

import java.util.List;

import com.ssafy.sot.dto.SchoolDTO;

public interface SchoolDAO {
	
	List<SchoolDTO> searchAll();
	List<SchoolDTO> searchWithKeyword(String keyword);
	int insertNewSchool(SchoolDTO schoolDTO);
	List<String> selectSidos();

}
