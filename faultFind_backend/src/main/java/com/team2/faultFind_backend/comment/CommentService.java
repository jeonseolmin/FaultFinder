package com.team2.faultFind_backend.comment;

import com.team2.faultFind_backend.post.entity.Post;
import com.team2.faultFind_backend.post.repository.PostRepository;
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

    // 댓글 저장 로직
    public void addComment(Long postId, String content, String username) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setAuthor(username);
        comment.setPost(post); // 댓글과 게시글 연관관계 매핑

        commentRepository.save(comment);
    }

    // 댓글 목록 조회 로직
    @Transactional(readOnly = true)
    public List<Comment> getComments(Long postId) {
        return commentRepository.findByPostId(postId);
    }
}