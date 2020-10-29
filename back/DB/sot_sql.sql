create database if not exists sot;
use sot;

SET foreign_key_checks = 0;

drop table if exists community;
drop table if exists school;
create table `school` (
	`id` int NOT NULL AUTO_INCREMENT,
    `sido` varchar(20) NOT NULL,
    `name` varchar(100) NOT NULL,
    
    PRIMARY KEY (`id`)
);

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
