package com.ssafy.sot.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ssafy.sot.dto.SchoolDTO;

@Repository
public class SchoolDAOImpl implements SchoolDAO {

	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<SchoolDTO> searchAll() {
		return sqlSession.selectList("school.selectList");
	}

	@Override
	public List<SchoolDTO> searchWithKeyword(String keyword) {
		keyword = "%" + keyword + "%";
		return sqlSession.selectList("school.searchWithKeyword", keyword);
	}

	@Override
	public List<String> selectSidos() {
		return sqlSession.selectList("school.selectSidoList");
	}

	@Override
	public int insertNewSchool(SchoolDTO schoolDTO) {
		return sqlSession.insert("school.addNewSchool", schoolDTO);
	}

}
