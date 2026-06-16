package com.team2.faultFind_backend.post.service;

import com.team2.faultFind_backend.post.dto.PostDto;
import com.team2.faultFind_backend.post.entity.Post;
import com.team2.faultFind_backend.post.repository.PostRepository;
import com.team2.faultFind_backend.user.entity.User;
import com.team2.faultFind_backend.user.repository.UserRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public void createPost(PostDto postDto, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("가입된 회원이 아닙니다."));

        Post post = new Post();
        post.setCategory(postDto.getCategory());
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());

        post.setAuthor(user.getUserName());

        postRepository.save(post);
    }

    @Transactional(readOnly = true)
    public List<Post> getAllPosts() {
        return postRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    // 상세보기
    public Post getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        post.setViewCount(post.getViewCount() + 1); // 조회수 증가
        return post;
    }

    public void updatePost(Long id, PostDto postDto, String username) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        // 권한 검사: 작성자와 현재 로그인한 유저가 다르면 에러 발생!
        if (!post.getAuthor().equals(username)) {
            throw new RuntimeException("글을 수정할 권한이 없습니다.");
        }

        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setCategory(postDto.getCategory());
        // JPA 영속성 컨텍스트 덕분에 save() 생략 가능
    }

    public void deletePost(Long id, String username) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        // 권한 검사
        if (!post.getAuthor().equals(username)) {
            throw new RuntimeException("글을 삭제할 권한이 없습니다.");
        }

        postRepository.delete(post);
    }

    //  좋아요 메서드
    public void likePost(Long id, String username) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        post.setLikeCount(post.getLikeCount() + 1); // 좋아요 1 증가
    }
}