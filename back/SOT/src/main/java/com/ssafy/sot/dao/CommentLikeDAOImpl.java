package com.ssafy.sot.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ssafy.sot.dto.CommentLikeDTO;
import com.ssafy.sot.dto.Like;

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

	@Override
	public boolean alreadyLikedComment(CommentLikeDTO commentLikeDTO) {
		CommentLikeDTO dto = sqlSession.selectOne("like.commentLikeCheck", commentLikeDTO);
		return dto != null;
	}

	@Override
	public List<Like> selectLikedUserList(int commentId) {
		return sqlSession.selectList("like.selectLikesByCommentId", commentId);
	}

}
