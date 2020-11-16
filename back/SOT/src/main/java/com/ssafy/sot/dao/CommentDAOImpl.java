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

	@Override
	public int insertComment(CommentDTO commentDTO) {
		return sqlSession.insert("comment.insertComment", commentDTO);
	}

	@Override
	public int updateComment(CommentDTO commentDTO) {
		return sqlSession.update("comment.updateComment", commentDTO);
	}

	@Override
	public int deleteComment(int id) {
		return sqlSession.delete("comment.deleteComment", id);
	}

	@Override
	public int insertReplyComment(CommentDTO commentDTO) {
		return sqlSession.insert("comment.insertReplyComment", commentDTO);
	}

	@Override
	public List<CommentDTO> selectReplyCommentsByParentId(int parentId) {
		return sqlSession.selectList("comment.showReplyComments", parentId);
	}


}
