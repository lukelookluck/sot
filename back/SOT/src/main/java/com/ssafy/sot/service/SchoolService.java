package com.ssafy.sot.service;

import java.util.List;

import com.ssafy.sot.dto.SchoolDTO;

public interface SchoolService {
	
	List<SchoolDTO> showSchoolList();
	List<SchoolDTO> searchSchool(String keyword);
	List<String> showSidoList();
	
}
