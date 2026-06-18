package com.team2.faultFind_backend.post.service;

import com.team2.faultFind_backend.post.dto.PostDto;
import com.team2.faultFind_backend.post.entity.Post;
import com.team2.faultFind_backend.post.repository.PostRepository;
import com.team2.faultFind_backend.user.entity.User;
import com.team2.faultFind_backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    // 1. 게시글 작성
    public void createPost(PostDto postDto, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("가입된 회원이 아닙니다."));

        if (user.isSuspended()) {
            throw new RuntimeException("활동이 정지된 계정입니다. 글을 작성할 수 없습니다.");
        }

        Post post = Post.builder()
                .category(postDto.getCategory())
                .title(postDto.getTitle())
                .content(postDto.getContent())
                .author(user.getUserName())
                .authorEmail(user.getEmail())
                .isNotice(postDto.isNotice()) // 공지사항 체크 여부 반영
                .build();

        postRepository.save(post);
    }

    // 2. 전체 게시글 조회 (공지 우선 정렬)
    @Transactional(readOnly = true)
    public List<Post> getAllPosts() {
        return postRepository.findAllNoticeFirst();
    }

    // 3. 인기글 TOP 5 조회
    @Transactional(readOnly = true)
    public List<Post> getPopularPosts() {
        return postRepository.findTop5ByOrderByLikeCountDesc();
    }

    // 4. 게시글 상세 조회 (조회수 증가)
    public Post getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));
        post.setViewCount(post.getViewCount() + 1);
        return post;
    }

    // 5. 게시글 수정
    public void updatePost(Long id, PostDto postDto, String email) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        if (!post.getAuthorEmail().equals(email)) {
            throw new RuntimeException("글을 수정할 권한이 없습니다.");
        }

        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setCategory(postDto.getCategory());
//        post.setNotice(postDto.isNotice());
    }

    // 6. 게시글 삭제
    public void deletePost(Long id, String email) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        // 관리자이거나, 글 작성자 본인일 경우 삭제 허용
        User user = userRepository.findByEmail(email).orElseThrow();
        boolean isAdmin = String.valueOf(user.getRole()).equals("ROLE_ADMIN");

        if (!isAdmin && !post.getAuthorEmail().equals(email)) {
            throw new RuntimeException("글을 삭제할 권한이 없습니다.");
        }

        postRepository.delete(post);
    }

    // 7. 좋아요 처리
    public void likePost(Long id, String email) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
        post.setLikeCount(post.getLikeCount() + 1);
    }
}