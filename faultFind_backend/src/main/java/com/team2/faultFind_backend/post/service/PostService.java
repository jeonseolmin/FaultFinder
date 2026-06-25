package com.team2.faultFind_backend.post.service;

import com.team2.faultFind_backend.post.dto.PostRequest;
import com.team2.faultFind_backend.post.dto.PostResponse;
import com.team2.faultFind_backend.post.entity.Post;
import com.team2.faultFind_backend.post.entity.PostLike;
import com.team2.faultFind_backend.post.repository.PostRepository;
import com.team2.faultFind_backend.post.repository.PostLikeRepository;
import com.team2.faultFind_backend.user.entity.User;
import com.team2.faultFind_backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PostLikeRepository postLikeRepository;

    // 1. 게시글 작성
    public void createPost(PostRequest postRequest, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("가입된 회원이 아닙니다."));

        if (user.isSuspended()) {
            throw new RuntimeException("활동이 정지된 계정입니다. 글을 작성할 수 없습니다.");
        }

        Post post = Post.builder()
                .category(postRequest.getCategory())
                .title(postRequest.getTitle())
                .content(postRequest.getContent())
                .author(user.getUserName())
                .authorEmail(user.getEmail())
                .isNotice(postRequest.isNotice())
                .build();

        postRepository.save(post);
    }

    // 2. 전체 게시글 조회 (공지 우선 정렬)
    @Transactional(readOnly = true)
    public List<PostResponse> getAllPosts() {
        return postRepository.findAllNoticeFirst()
                .stream()
                .map(PostResponse::from)
                .toList();
    }

    // 3. 인기글 TOP 5 조회
    @Transactional(readOnly = true)
    public List<PostResponse> getPopularPosts() {
        return postRepository.findTop5ByOrderByLikeCountDesc()
                .stream()
                .map(PostResponse::from)
                .toList();
    }

    // 4. 게시글 상세 조회 (조회수 증가)
    public PostResponse getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));
        post.setViewCount(post.getViewCount() + 1);
        return PostResponse.from(post);
    }

    // 5. 게시글 수정
    public void updatePost(Long id, PostRequest postRequest, String email) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        if (!post.getAuthorEmail().equals(email)) {
            throw new RuntimeException("글을 수정할 권한이 없습니다.");
        }

        post.setTitle(postRequest.getTitle());
        post.setContent(postRequest.getContent());
        post.setCategory(postRequest.getCategory());
    }

    // 6. 게시글 삭제
    public void deletePost(Long id, String email) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        User user = userRepository.findByEmail(email).orElseThrow();
        boolean isAdmin = String.valueOf(user.getRole()).equals("ROLE_ADMIN");

        if (!isAdmin && !post.getAuthorEmail().equals(email)) {
            throw new RuntimeException("글을 삭제할 권한이 없습니다.");
        }

        postRepository.delete(post);
    }

    // 7. 기존 단방향 좋아요 처리 (사용 안 하시면 삭제하셔도 됩니다)
    public void likePost(Long id, String email) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
        post.setLikeCount(post.getLikeCount() + 1);
    }

    // 8. 아이디당 한 번만 가능한 '좋아요 토글' 완성본
    @Transactional
    public boolean toggleLike(Long postId, String email) {
        // 1. 게시글 존재 확인
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        // 2. 다른 메서드들처럼 이메일로 유저 정보를 정확히 가져옵니다.
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("가입된 회원이 아닙니다."));

        // 3. 유저 엔티티에서 고유 ID를 꺼내 좋아요 장부를 조회합니다.
        // (만약 유저 엔티티의 PK 필드명이 id가 아니라 userId라면 user.getUserId()로 수정하세요)
        Optional<PostLike> existingLike = postLikeRepository.findByPostIdAndUserId(postId, user.getId());

        if (existingLike.isPresent()) {
            // 이미 좋아요를 누른 상태 -> 좋아요 취소!
            postLikeRepository.delete(existingLike.get());
            post.setLikeCount(post.getLikeCount() - 1); // 좋아요 수 1 감소
            return false; // 취소됨(false) 반환
        } else {
            // 좋아요를 누르지 않은 상태 -> 좋아요 추가!
            PostLike newLike = new PostLike(postId, user.getId());
            postLikeRepository.save(newLike);
            post.setLikeCount(post.getLikeCount() + 1); // 좋아요 수 1 증가
            return true; // 추가됨(true) 반환
        }
    }

    public List<PostResponse> findAll() {
        return postRepository.findAll()
                .stream()
                .map(PostResponse::from)
                .toList();
    }

    public void deleteById(Long id) {
        postRepository.deleteById(id);
    }

    // 카테고리별로 게시글을 불러오는 로직 추가
    public List<Post> getPostsByCategory(String category) {
        return postRepository.findByCategory(category);
    }

    // 카테고리 및 검색 조건별 조회 로직 추가
    public List<Post> searchPosts(String category, String searchType, String keyword) {
        // 카테고리가 없거나 "all"이면 전체 검색으로 간주
        boolean isAllPosts = (category == null || category.trim().isEmpty() || category.equals("all"));

        if (searchType.equals("title")) {
            return isAllPosts ? postRepository.findByTitleContainingIgnoreCase(keyword)
                    : postRepository.findByCategoryAndTitleContainingIgnoreCase(category, keyword);
        } else if (searchType.equals("content")) {
            return isAllPosts ? postRepository.findByContentContainingIgnoreCase(keyword)
                    : postRepository.findByCategoryAndContentContainingIgnoreCase(category, keyword);
        } else if (searchType.equals("author")) {
            return isAllPosts ? postRepository.findByAuthorContainingIgnoreCase(keyword)
                    : postRepository.findByCategoryAndAuthorContainingIgnoreCase(category, keyword);
        }

        return isAllPosts ? postRepository.findAll() : postRepository.findByCategory(category);
    }
}