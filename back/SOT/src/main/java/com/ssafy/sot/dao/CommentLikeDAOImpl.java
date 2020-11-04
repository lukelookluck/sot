package com.ssafy.sot.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ssafy.sot.dto.CommentLikeDTO;

@Repository
public class CommentLikeDAOImpl implements CommentLikeDAO {

	@Autowired
	SqlSession sqlSession;
	
	@Override
	public int insertCommentLike(CommentLikeDTO commentLikeDTO) {
		return sqlSession.insert("like.likeComment", commentLikeDTO);
	}

	@Override
	public int deleteCommentLike(CommentLikeDTO commentLikeDTO) {
		return sqlSession.delete("like.deleteCommentLike", commentLikeDTO);
	}

}
