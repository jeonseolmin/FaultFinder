package com.team2.faultFind_backend.user.controller;

import com.team2.faultFind_backend.common.security.dto.LoginRequest;
import com.team2.faultFind_backend.user.dto.UserRequest;
import com.team2.faultFind_backend.user.dto.UserResponse;
import com.team2.faultFind_backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/faultfinder")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    /*
    * POST Mapping 칸
    */
    @PostMapping("/signup")
    public ResponseEntity<String> join(@RequestBody UserRequest request){
        userService.signUp(request);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        String token = userService.login(request);
        System.out.println("token = " + token);
        if(token == null){
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("로그인 실패");
        }
        return ResponseEntity.ok(token);
    }



    /*
     * GET Mapping 칸
     */
    @GetMapping("/user/me")
    public ResponseEntity<UserResponse> getMyInfo(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(userService.getMyInfo(email));
    }

    //test 용
    @GetMapping("/mypage")
    public ResponseEntity<String> mypage() {
        return ResponseEntity.ok("JWT 인증 성공");
    }

    //test용
    @GetMapping("/test")
    public String test() {
        return "success";
    }
}
