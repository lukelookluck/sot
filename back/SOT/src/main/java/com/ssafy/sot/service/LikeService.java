package com.ssafy.sot.service;

public interface LikeService {
	
	public boolean likeComment(int commentId, int userId);
	public boolean cancelLikeComment(int commentId, int userId);

}
