package com.ssafy.sot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sot.dto.ReturnMsg;
import com.ssafy.sot.dto.UserNoticeDTO;
import com.ssafy.sot.service.UserNoticeService;

@RestController
@RequestMapping("/usernotice")
public class UserNoticeRestController {

	@Autowired
	UserNoticeService usernoticeService;
	
	@GetMapping("/")
	public Object searchAll() {
		System.out.println("유저알림 전체 조회");
		
		Object dto = usernoticeService.showAll();
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping("/{userId}")
	public Object searchByUserId(@PathVariable("userId") int userId) {
		System.out.println(userId + "번의 유저알림 상세 조회");
		
		UserNoticeDTO dto = usernoticeService.showUserNoticeByUserId(userId);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@PostMapping("/")
	public Object create(UserNoticeDTO usernotice) {
		System.out.println("유저알림 등록");
		
		try {
			if(usernoticeService.createUserNotice(usernotice)) {
				System.out.println("유저알림 등록 성공!!!");
				return new ResponseEntity<>(usernotice, HttpStatus.OK);
			} else {
				System.out.println("유저알림 등록 실패...");
				return new ResponseEntity<>(new ReturnMsg("유저알림 등록에 실패하였습니다.입력한 정보를 확인해주세요"),
						HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new ReturnMsg("유저알림 등록에 실패했습니다. 시스템 관리자에게 문의해주세요."),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/{userId}")
	public Object updateReadByUserId(@PathVariable("userId") int userId) {
		System.out.println(userId + "번의 유저알림 읽음으로 수정");
		
		try {
			if(usernoticeService.updateReadByUserId(userId)) {
				System.out.println("유저알림 읽음으로 수정 성공!!!");
				return new ResponseEntity<>(true, HttpStatus.OK);
			} else {
				System.out.println("유저알림 읽음으로 수정 실패...");
				return new ResponseEntity<>(new ReturnMsg("유저알림 수정에 실패하였습니다.입력한 정보를 확인해주세요"),
						HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new ReturnMsg("유저알림 수정에 실패했습니다. 시스템 관리자에게 문의해주세요."),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/{id}")
	public Object delete(@PathVariable("id") int id) {
		System.out.println(id + "번의 유저알림 삭제");
		
		try {
			if(usernoticeService.deleteUserNotice(id)) {
				System.out.println("유저 알림 삭제 완료!!!");
				return new ResponseEntity<>(new ReturnMsg("알림을 성공적으로 삭제하였습니다."), HttpStatus.OK);
			} else {
				System.out.println("유저 알림 삭제 실패...");
				return new ResponseEntity<>(new ReturnMsg("유저알림 삭제에 실패하였습니다."), HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new ReturnMsg("유저알림 삭제에 실패하였습니다. 시스템관리자에게 문의해주세요"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
