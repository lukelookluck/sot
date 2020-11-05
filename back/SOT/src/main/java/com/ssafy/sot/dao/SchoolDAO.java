package com.ssafy.sot.dao;

import java.util.List;

import com.ssafy.sot.dto.SchoolDTO;

public interface SchoolDAO {
	
	List<SchoolDTO> searchAll();
	List<SchoolDTO> searchWithKeyword(String keyword);
	List<String> selectSidos();

}
