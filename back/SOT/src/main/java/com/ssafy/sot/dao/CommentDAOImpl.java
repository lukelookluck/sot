package com.ssafy.sot.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ssafy.sot.dto.CommentDTO;

@Repository
public class CommentDAOImpl implements CommentDAO {
	
	@Autowired
	SqlSession sqlSession;

	@Override
	public List<CommentDTO> selectCommentsByArticleId(int articleId) {
		return sqlSession.selectList("comment.showComments", articleId);
	}

}
