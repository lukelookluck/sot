create database if not exists sot;
use sot;

SET foreign_key_checks = 0;

drop table if exists community;
create table `community` (
	`id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    
    PRIMARY KEY (`id`),
    UNIQUE KEY (`name`)
);

drop table if exists `user`;
create table `user` (
	`id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(20) NOT NULL,
    `email` varchar(100) NOT NULL,
    `password` varchar(100) NOT NULL,
    `year` int NOT NULL,
    `community_id` int NOT NULL,
    `is_admin` boolean default false,
    
    PRIMARY KEY (`id`),
    UNIQUE KEY (`name`),
    UNIQUE KEY (`email`),
    FOREIGN KEY (`community_id`) REFERENCES community (`id`)
);


drop table if exists `comment`;
drop table if exists article;
drop table if exists board;

create table `board` (
	`id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `community_id` int NOT NULL,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`community_id`) REFERENCES community (`id`) ON DELETE CASCADE
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
    `community_id` int NOT NULL,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`community_id`) REFERENCES `community` (`id`) ON DELETE CASCADE
);