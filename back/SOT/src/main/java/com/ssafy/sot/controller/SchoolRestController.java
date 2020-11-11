package com.ssafy.sot.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sot.dto.ArticleDTO;
import com.ssafy.sot.dto.BoardNewDTO;
import com.ssafy.sot.dto.CommentDTO;
import com.ssafy.sot.dto.ReturnMsg;
import com.ssafy.sot.dto.SchoolDTO;
import com.ssafy.sot.dto.UserIdDTO;
import com.ssafy.sot.service.ArticleService;
import com.ssafy.sot.service.BoardService;
import com.ssafy.sot.service.CommentService;
import com.ssafy.sot.service.LikeService;
import com.ssafy.sot.service.SchoolService;
import com.ssafy.sot.util.JWTUtil;

import io.swagger.annotations.ApiOperation;
import io.swagger.models.Model;

@RestController
public class SchoolRestController {
	
	@Autowired
	SchoolService schoolService;
	
	@Autowired
	BoardService boardService;
	
	@Autowired
	ArticleService articleService;
	
	@Autowired
	CommentService commentService;
	
	@Autowired
	LikeService likeService;
	
	@Autowired
	JWTUtil jwtUtil;
	
	
	@ApiOperation(value = "시도 리스트 (없는 학교 신청시 시도 선택용)")
	@GetMapping("/sido")
	public Object sidoList() {
		return new ResponseEntity<>(schoolService.showSidoList(), HttpStatus.OK);
	}
	
	@ApiOperation(value = "새로운 학교 추가")
	@PostMapping("/school")
	public Object newSchool(@RequestBody SchoolDTO schoolDTO) {
		return new ResponseEntity<>(schoolService.addNewSchool(schoolDTO), HttpStatus.OK);
	}
	
	@ApiOperation(value = "학교 검색, keyword 파라미터에 넣어서 보내면 검색함")
	@GetMapping("/search")
	public Object searchSchool(@RequestParam(value="keyword") String keyword) {
		if(keyword == null || keyword == "") {
			return new ResponseEntity<>(null, HttpStatus.OK);
		}
		return new ResponseEntity<>(schoolService.searchSchool(keyword), HttpStatus.OK);
	}

	@ApiOperation(value = "학교id로 게시판 목록 가져오기")
	@GetMapping("/boards")
	public Object boardList(@RequestParam(value="id") int id) {
		return new ResponseEntity<>(boardService.showSchoolBoards(id), HttpStatus.OK);
	}
	
	@ApiOperation(value = "새로운 게시판 생성")
	@PostMapping("/board")
	public Object createNewBoard(@RequestBody BoardNewDTO boardNewDTO) {
		// 일단 관리자 동의 없이 새 게시판 생성
		return new ResponseEntity<>(boardService.createNewBoard(boardNewDTO), HttpStatus.OK);
	}
	
	@ApiOperation(value = "즐겨찾기한 게시판 목록 가져오기")
	@GetMapping("/board/fav")
	public Object showBoardFavs(@RequestParam int userId) {
		return new ResponseEntity<>(boardService.showFavBoards(userId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "전체 게시글 가져오기")
	@GetMapping("/board/all")
	public Object allArticles(@RequestParam("schoolId") int schoolId) {
		return new ResponseEntity<>(articleService.showAllArticles(schoolId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "전체 베스트 게시글 가져오기")
	@GetMapping("/board/all/best")
	public Object allBestArticles(@RequestParam("schoolId") int schoolId) {
		return new ResponseEntity<>(articleService.showAllBestArticles(schoolId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "특정 게시판 베스트 게시글 가져오기")
	@GetMapping("/board/{boardId}/best")
	public Object boardBestArticles(@PathVariable("boardId") int boardId) {
		return new ResponseEntity<>(articleService.showBestArticles(boardId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "게시판 즐겨찾기")
	@PostMapping("/board/{boardId}/fav")
	public Object favBoard(@PathVariable("boardId") int boardId, @RequestBody UserIdDTO userId) {
		int id = userId.getUserId();
		System.out.println("보드: " + boardId);
		System.out.println("유저아이디:" + userId);
		System.out.println(id);
		return new ResponseEntity<>(boardService.favBoard(boardId, id), HttpStatus.OK);
	}
	
	@ApiOperation(value = "게시판 즐겨찾기 취소")
	@DeleteMapping("/board/{boardId}/fav")
	public Object unfavBoard(@PathVariable("boardId") int boardId, @RequestBody UserIdDTO userId) {
		int id = userId.getUserId();
		System.out.println("보드: " + boardId);
		System.out.println("유저아이디:" + userId);
		System.out.println(id);
		return new ResponseEntity<>(boardService.unfavBoard(boardId, id), HttpStatus.OK);
	}
	
	@ApiOperation(value = "게시판의 게시글 리스트 읽기")
	@GetMapping("/board/{boardId}")
	public Object articleList(@PathVariable("boardId") int boardId, HttpServletRequest request) {
		return new ResponseEntity<>(articleService.showArticles(boardId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "게시글 하나 읽기 (댓글 리스트도 가져옴)")
	@GetMapping("/board/{boardId}/{articleId}")
	public Object showArticle(@PathVariable("boardId") int boardId,
								@PathVariable("articleId") int articleId) {
		return new ResponseEntity<>(articleService.showArticle(articleId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "게시글 생성, 필요값: title, content, boardId,")
	@PostMapping("/board/{boardId}")
	public Object writeArticle(@PathVariable("boardId") int boardId, @RequestBody ArticleDTO articleDTO) {
		articleDTO.setBoardId(boardId);
		return new ResponseEntity<>(articleService.createArticle(articleDTO), HttpStatus.CREATED);
	}
	
	@ApiOperation(value = "게시글 수정, (created_at, updated_at 같은 것들은 무시하고 필수값만 넣으면 됨)")
	@PutMapping("/board/{boardId}/{articleId}")
	public Object modifyArticle(@PathVariable("boardId") int boardId,
								@PathVariable("articleId") int articleId, @RequestBody ArticleDTO articleDTO) {
		articleDTO.setBoardId(boardId);
		articleDTO.setId(articleId);
		return new ResponseEntity<>(articleService.updateArticle(articleDTO), HttpStatus.CREATED);
	}
	
	@ApiOperation(value = "게시글 삭제")
	@DeleteMapping("/board/{boardId}/{articleId}")
	public Object deleteArticle(@PathVariable("boardId") int boardId,
								@PathVariable("articleId") int articleId) {
		return new ResponseEntity<>(articleService.deleteArticle(articleId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "댓글 작성, (created_at, updated_at 같은 것들은 무시하고 필수값만 넣으면 됨)")
	@PostMapping("/board/{boardId}/{articleId}")
	public Object createComment(@PathVariable("boardId") int boardId,
								@PathVariable("articleId") int articleId, CommentDTO commentDTO) {
		commentDTO.setArticleId(articleId);
		return new ResponseEntity<>(commentService.createComment(commentDTO), HttpStatus.OK);
	}
	
	@ApiOperation(value = "답댓글 작성, (created_at, updated_at 같은 것들은 무시하고 필수값만 넣으면 됨)")
	@PostMapping("/board/{boardId}/{articleId}/{commentId}")
	public Object createReplyComment(@PathVariable("boardId") int boardId,
								@PathVariable("articleId") int articleId,
								@PathVariable("commentId") int commentId, CommentDTO commentDTO) {
		commentDTO.setArticleId(articleId);
		commentDTO.setParentId(commentId);
		return new ResponseEntity<>(commentService.createReplyComment(commentDTO), HttpStatus.OK);
	}
	
	@ApiOperation(value = "댓글 수정, (created_at, updated_at 같은 것들은 무시하고 필수값만 넣으면 됨)")
	@PutMapping("/board/{boardId}/{articleId}/{commentId}")
	public Object updateComment(@PathVariable("boardId") int boardId,
								@PathVariable("articleId") int articleId,
								@PathVariable("commentId") int commentId, CommentDTO commentDTO) {
		commentDTO.setArticleId(articleId);
		commentDTO.setId(commentId);
		return new ResponseEntity<>(commentService.updateComment(commentDTO), HttpStatus.OK);
	}
	
	@ApiOperation(value = "댓글 삭제")
	@DeleteMapping("/board/{boardId}/{articleId}/{commentId}")
	public Object deleteComment(@PathVariable("boardId") int boardId,
								@PathVariable("articleId") int articleId,
								@PathVariable("commentId") int commentId) {
		return new ResponseEntity<>(commentService.deleteComment(commentId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "댓글 좋아요 (로그인 필요)")
	@PostMapping("/board/{boardId}/{articleId}/{commentId}/like")
	public Object likeComment(@PathVariable("boardId") int boardId,
							@PathVariable("articleId") int articleId,
							@PathVariable("commentId") int commentId,
//							HttpServletRequest request,
							@RequestParam("userId") int userId) {
		return new ResponseEntity<>(likeService.likeComment(commentId, userId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "댓글 좋아요 취소 (로그인 필요)")
	@DeleteMapping("/board/{boardId}/{articleId}/{commentId}/like")
	public Object cancelLikeComment(@PathVariable("boardId") int boardId,
							@PathVariable("articleId") int articleId,
							@PathVariable("commentId") int commentId,
//							HttpServletRequest request,
							@RequestParam("userId") int userId) {
		return new ResponseEntity<>(likeService.cancelLikeComment(commentId, userId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "게시글 좋아요 (로그인 필요)")
	@PostMapping("/board/{boardId}/{articleId}/like")
	public Object likeArticle(@PathVariable("boardId") int boardId,
							@PathVariable("articleId") int articleId,
//							HttpServletRequest request,
							@RequestParam("userId") int userId) {
		return new ResponseEntity<>(likeService.likeArticle(articleId, userId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "게시글 좋아요 취소 (로그인 필요)")
	@DeleteMapping("/board/{boardId}/{articleId}/like")
	public Object cancelLikeArticle(@PathVariable("boardId") int boardId,
							@PathVariable("articleId") int articleId,
//							HttpServletRequest request,
							@RequestParam("userId") int userId) {
		
//		int userId = getUserPK(request);
//		if(userId == -1) {
//			return new ResponseEntity<>("잘못된 접근입니다. 다시 로그인해주세요.", HttpStatus.UNAUTHORIZED);
//		}
		return new ResponseEntity<>(likeService.cancelLikeArticle(articleId, userId), HttpStatus.OK);
	}

	
	// JWT 토큰에서 userId(PK) 가져오는 메소드
	private int getUserPK(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		if(token == null) {
			return -1;
		}
		return jwtUtil.getUserPK(token.substring("Bearer ".length()));
	}
	
}
