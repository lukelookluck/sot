package com.ssafy.sot.service;

import com.ssafy.sot.dto.CommentDTO;

public interface CommentService {
	
	public boolean createComment(CommentDTO commentDTO);
	public boolean updateComment(CommentDTO commentDTO);
	public boolean deleteComment(int id);
	public boolean createReplyComment(CommentDTO commentDTO);

}
