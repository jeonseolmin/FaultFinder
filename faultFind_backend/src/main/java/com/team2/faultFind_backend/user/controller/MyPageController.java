
import com.team2.faultFind_backend.comment.entity.Comment;
import com.team2.faultFind_backend.comment.repository.CommentRepository;
import com.team2.faultFind_backend.post.entity.Post;
import com.team2.faultFind_backend.post.repository.PostRepository;
import com.team2.faultFind_backend.user.entity.User;
import com.team2.faultFind_backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getMyPageData(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));

        List<Post> myPosts = postRepository.findByAuthorOrderByIdDesc(user.getUserName());
        List<Comment> myComments = commentRepository.findByAuthorOrderByIdDesc(user.getUserName());

        // 🌟 추가된 부분: 리액트가 기절하지 않도록 댓글 배열을 직접 포장합니다!
        List<Map<String, Object>> commentList = new java.util.ArrayList<>();
        for (Comment c : myComments) {
            Map<String, Object> map = new java.util.HashMap<>();
            map.put("id", c.getId());
            map.put("content", c.getContent());
            map.put("createdDate", c.getCreatedDate());
            // 무한 루프 없이 게시글 번호와 제목만 쏙 빼서 담아줍니다.
            map.put("postId", c.getPost().getId());
            map.put("postTitle", c.getPost().getTitle());
            commentList.add(map);
        }

        Map<String, Object> response = new HashMap<>();
        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("email", user.getEmail());
        userInfo.put("name", user.getUserName());

        response.put("user", userInfo);
        response.put("posts", myPosts);

        // 🌟 기존 myComments 대신 직접 포장한 commentList를 보냅니다.
        response.put("comments", commentList);

        return ResponseEntity.ok(response);
    }
}
