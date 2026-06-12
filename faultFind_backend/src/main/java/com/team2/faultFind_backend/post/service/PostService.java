package com.team2.faultFind_backend.post.service;

import com.team2.faultFind_backend.post.dto.PostDto;
import com.team2.faultFind_backend.post.entity.Post;
import com.team2.faultFind_backend.post.repository.PostRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public void createPost(PostDto postDto, String loggedInUser) {
        Post post = new Post();
        post.setCategory(postDto.getCategory());
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());

        post.setAuthor(loggedInUser);

        postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll(); // DB에 있는 모든 글을 다 꺼내옵니다.
    }
}
