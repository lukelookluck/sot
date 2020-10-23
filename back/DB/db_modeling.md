# DB 모델링

> My SQL 사용
>
> 수정될 수 있음
>
> 게임 관련 DB (유저랭킹, 학교랭킹 등) 제외, 필요할 시 추가
>
> 기본기능에 필요한 테이블만 만들었습니다. 추가가 필요한 테이블이 있으면 알려주세요.



## 테이블 목차

- [학교별 커뮤니티(Community)](#community)
- [커뮤니티에 속한 게시판(Board)](#board)
- [게시판에 속한 게시글(Article)](#article)
- [게시글에 속한 댓글(Comment)](#comment)
- [게시글 좋아요(ArticleLike)](#articlelike)
- [댓글 좋아요(CommentLike)](#commentlike)
- [유저정보(User)](#user)
- [유저개인알림(UserNotice)](#usernotice)

>  전체공지사항(notice)과 문의하기(qna) 테이블은 따로 만들지 않고 id가 1인 커뮤니티를 활용하기로 함. 에브리타임도 1번째 학교(주소 1/v/~~~~)를 공지사항 게시판으로 활용중



## Community

> id
>
> name - 학교 이름, 만약 학교이름이 중복인 학교들이 있다면 지역필드 추가해야 할듯?



## Board

> id
>
> name - 게시판의 이름 (장터, 익명게시판, 3학년게시판 등)
>
> community_id (FK)



## Article

> id
>
> title
>
> content
>
> board_id (FK)
>
> user_id (FK) - 작성자
>
> created_at
>
> updated_at



## Comment

> id
>
> content
>
> article_id (FK)
>
> user_id (FK)
>
> created_at
>
> updated_at



## ArticleLike

> id
>
> article_id (FK)
>
> user_id (FK)



## CommentLike

> id
>
> comment_id (FK)
>
> user_id (FK)



## User

> id
>
> name
>
> email
>
> password
>
> year - 입학년도, int
>
> community_id (FK)
>
> is_admin - 관리자계정 여부 (True / False)



## UserNotice

> id
>
> user_id (FK)
>
> msg
>
> article_id - 댓글이든 게시글이든 해당 게시글로 이동시켜주면 되니까 게시글 아이디만 있음 될듯
>
> created_at
>
> read - 읽으면 True로 바꿔주고 유저알림 목록에서는 읽음표시 띄워주면 될듯

## Ranking

> id
>
> name
>
> user_id (FK)
>
> score
>
> community_id (FK)
