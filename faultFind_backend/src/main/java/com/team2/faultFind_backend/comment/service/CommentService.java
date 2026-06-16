package com.team2.faultFind_backend.comment.service;

import com.team2.faultFind_backend.comment.entity.Comment;
import com.team2.faultFind_backend.comment.repository.CommentRepository;
import com.team2.faultFind_backend.post.entity.Post;
import com.team2.faultFind_backend.post.repository.PostRepository;
import com.team2.faultFind_backend.user.entity.User;
import com.team2.faultFind_backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    // 유저 정보를 찾기 위한 UserRepository 추가
    private final UserRepository userRepository;

    // 댓글 저장 로직
    public void addComment(Long postId, String content, String email) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));

        // 넘어온 이메일(또는 아이디)로 DB에서 회원 정보를 찾아옵니다.
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("가입된 회원이 아닙니다."));

        Comment comment = new Comment();
        comment.setContent(content);

        // 이메일 대신 유저의 '이름'을 작성자로 저장합니다.
        comment.setAuthor(user.getUserName());

        comment.setPost(post); // 댓글과 게시글 연관관계 매핑

        commentRepository.save(comment);

        post.setCommentCount(post.getCommentCount() + 1);
    }

    // 댓글 목록 조회 로직
    @Transactional(readOnly = true)
    public List<Comment> getComments(Long postId) {
        return commentRepository.findByPostId(postId);
    }
}