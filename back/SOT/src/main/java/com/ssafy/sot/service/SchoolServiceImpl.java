package com.ssafy.sot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sot.dao.SchoolDAO;
import com.ssafy.sot.dto.SchoolDTO;

@Service
public class SchoolServiceImpl implements SchoolService {

	@Autowired
	SchoolDAO schoolDao;
	
	@Override
	public List<SchoolDTO> showSchoolList() {
		return schoolDao.searchAll();
	}

	@Override
	public List<SchoolDTO> searchSchool(String keyword) {
		return schoolDao.searchWithKeyword(keyword);
	}

}
