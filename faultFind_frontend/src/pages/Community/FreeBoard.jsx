import React from "react";
import CategoryBoard from "../../components/Community/CategoryBoard";

export default function FreeBoard() {
  return (
    <CategoryBoard 
      category="free" 
      title="자유게시판" 
      desc="자유롭게 교통사고 관련 이야기와 일상을 나누는 공간입니다." 
    />
  );
}