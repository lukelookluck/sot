create database if not exists sot;
use sot;

SET foreign_key_checks = 0;

drop table if exists community;
drop table if exists school;
create table `school` (
	`id` int NOT NULL AUTO_INCREMENT,
    `sido` varchar(20) NOT NULL,
    `name` varchar(50),
    
    PRIMARY KEY (`id`)
);

insert into school (sido, `name`) values ("관리", "");
insert into school (sido, `name`) values ("서울", "개포고등학교");
insert into school (sido, `name`) values ("서울", "경기고등학교");
insert into school (sido, `name`) values ("제주", "제주여자고등학교");
insert into school (sido, `name`) values ("제주", "서귀포고등학교");
insert into school (sido, `name`) values ("경남", "거창중앙고등학교");
insert into school (sido, `name`) values ("서울", "강동고등학교");
insert into school (sido, `name`) values ("대구", "강동고등학교");
insert into school (sido, `name`) values ("구미", "구미강동고등학교");
insert into school (sido, `name`) values ("Seoul", "GandongHighSchool");
insert into school (sido, `name`) values ("Gumi", "GandongHighSchool");
insert into school (sido, `name`) values ("Daegu", "GandongHighSchool");
insert into school (sido, `name`) values ("Daegu", "GangseoHighSchool");


drop table if exists `user`;
create table `user` (
	`id` int NOT NULL AUTO_INCREMENT,
    `nickname` varchar(20) NOT NULL,
    `email` varchar(100) NOT NULL,
    `password` varchar(100) NOT NULL,
    `school_id` int NOT NULL,
    `is_admin` boolean default false,
    
    PRIMARY KEY (`id`),
    UNIQUE KEY (`nickname`),
    UNIQUE KEY (`email`),
    FOREIGN KEY (`school_id`) REFERENCES school (`id`)
);

insert into `user`(nickname, email, `password`, school_id) values("토마토", "tomato", "tomato", 2);
insert into `user`(nickname, email, `password`, school_id) values("김싸피", "ssafy", "ssafy", 2);

drop table if exists `comment`;
drop table if exists article;
drop table if exists board;

create table `board` (
	`id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `school_id` int NOT NULL,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`school_id`) REFERENCES school (`id`) ON DELETE CASCADE
);

insert into `board` (`name`, school_id) values ("공지사항", 1);
insert into `board` (`name`, school_id) values ("QnA", 1);
insert into `board` (`name`, school_id) values ("자유게시판", 2);
insert into `board` (`name`, school_id) values ("익명게시판", 2);
insert into `board` (`name`, school_id) values ("1학년게시판", 2);
insert into `board` (`name`, school_id) values ("2학년게시판", 2);
insert into `board` (`name`, school_id) values ("3학년게시판", 2);
insert into `board` (`name`, school_id) values ("묻고답해요", 2);
insert into `board` (`name`, school_id) values ("자유게시판", 10);
insert into `board` (`name`, school_id) values ("익명게시판", 10);
insert into `board` (`name`, school_id) values ("1학년게시판", 10);
insert into `board` (`name`, school_id) values ("2학년게시판", 10);
insert into `board` (`name`, school_id) values ("3학년게시판", 10);
insert into `board` (`name`, school_id) values ("묻고답해요", 10);

select * from user;

create table `article` (
	`id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(100) NOT NULL,
    `content` text NOT NULL,
    `board_id` int NOT NULL,
    `user_id` int NOT NULL,
    `created_at` timestamp default current_timestamp,
    `updated_at` timestamp,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`board_id`) REFERENCES `board` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

insert into article(title, content, board_id, user_id)
	values ("공지사항입니다.", "공지사항 내용입니다. 공지사항 내용입니다.", 1, 1);
    insert into article(title, content, board_id, user_id)
	values ("업데이트 예정.", "업데이트 예정입니다. 업데이트 예정은 다음과 같습니다.", 1, 1);
insert into article (title, content, board_id, user_id)
	values ("질문드립니다.", "질문 있는데 질문 게시판이 어딘가요?", 2, 1);
insert into article (title, content, board_id, user_id)
	values ("탈퇴...", "탈퇴하고 싶은데 어떻게 하나요?", 2, 1);

insert into article (title, content, board_id, user_id)
	values ("제목", "내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.", 3, 1);
insert into article (title, content, board_id, user_id)
	values ("테스트", "잘 되나요?", 3, 2);

create table `comment` (
	`id` int NOT NULL AUTO_INCREMENT,
    `content` text NOT NULL,
    `article_id` int NOT NULL,
    `user_id` int NOT NULL,
    `created_at` timestamp default current_timestamp,
    `updated_at` timestamp,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

insert into comment (content, article_id, user_id)
	values("탈퇴 기능은 딱히 없습니다.", 2, 2);
insert into comment (content, article_id, user_id)
	values("좋은 글 감사합니다.", 3, 2);
insert into comment (content, article_id, user_id)
    values("글 많이 남겨주세요.", 3, 1);

drop table if exists articlelike;
drop table if exists commentlike;
create table `articlelike` (
	`id` int NOT NULL AUTO_INCREMENT,
    `article_id` int NOT NULL,
    `user_id` int NOT NULL,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

create table `commentlike` (
	`id` int NOT NULL AUTO_INCREMENT,
    `comment_id` int NOT NULL,
    `user_id` int NOT NULL,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

drop table if exists usernotice;
create table `usernotice` (
	`id` int NOT NULL AUTO_INCREMENT,
    `user_id` int NOT NULL,
    `msg` varchar(100),
    `article_id` int NOT NULL,
    `created_at` timestamp default current_timestamp,
    `read` boolean default false,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

drop table if exists ranking;
create table `ranking` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
    `score` int NOT NULL,
    `school_id` int NOT NULL,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE CASCADE
);

drop table if exists boardfav;
create table `boardfav` (
	`id` int NOT NULL AUTO_INCREMENT,
    `board_id` int not null,
    `user_id` int not null,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`board_id`) REFERENCES `board` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

insert into boardfav(board_id, user_id) values(3, 1);

drop table if exists boardcreator;
create table `boardcreator` (
	`id` int NOT NULL AUTO_INCREMENT,
    `school_id` int not null,
    `name` varchar(50),
    `user_id` int not null,
    `description` text,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

select * from boardcreator;