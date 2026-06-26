package com.team2.faultFind_backend.comment.service;

import com.team2.faultFind_backend.comment.dto.CommentRequestDto;
import com.team2.faultFind_backend.comment.dto.CommentResponseDto;
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
    public void addComment(Long id, CommentRequestDto commentRequestDto, String email) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("가입된 회원이 아닙니다."));

        if (user.isSuspended()) {
            throw new RuntimeException("활동이 정지된 계정입니다. 댓글을 작성할 수 없습니다.");
        }

        Comment comment = new Comment();
        comment.setContent(commentRequestDto.getContent());
        comment.setAuthor(user.getUserName());
        comment.setAuthorEmail(user.getEmail());
        comment.setPost(post);

        if (commentRequestDto.getParentId() != null) {
            Comment parentComment = commentRepository.findById(commentRequestDto.getParentId())
                    .orElseThrow(() -> new IllegalArgumentException("부모 댓글이 존재하지 않습니다."));

            comment.setParent(parentComment);
        }

        commentRepository.save(comment);

        post.setCommentCount(post.getCommentCount() + 1);
    }

    public void updateComment(Long postId,Long commentId, CommentRequestDto commentRequestDto, String email) {
        // 넘어온 이메일(또는 아이디)로 DB에서 회원 정보를 찾아옵니다.
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("가입된 회원이 아닙니다."));

        if (user.isSuspended()) {
            throw new RuntimeException("활동이 정지된 계정입니다. 댓글을 작성할 수 없습니다.");
        }

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("수정할 댓글이  없습니다."));
        if(!comment.getPost().getId().equals(postId)){
            throw new RuntimeException("잘못된 활동입니다.");
        }
        comment.setContent(commentRequestDto.getContent());
        commentRepository.save(comment);
    }

    // 댓글 목록 조회 로직
    @Transactional(readOnly = true)
    public List<CommentResponseDto> getComments(Long postId) {
        return commentRepository.findByPostId(postId)
                .stream()
                .map(CommentResponseDto::from)
                .toList();
    }

}