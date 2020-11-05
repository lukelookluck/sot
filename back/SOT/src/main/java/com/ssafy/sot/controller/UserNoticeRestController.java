package com.ssafy.sot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sot.service.UserNoticeService;

@RestController
public class UserNoticeRestController {

	@Autowired
	UserNoticeService usernoticeService;
	
}
