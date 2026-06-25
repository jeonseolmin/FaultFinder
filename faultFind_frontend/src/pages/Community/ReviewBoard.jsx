import React from "react";
import CategoryBoard from "../../components/Community/CategoryBoard";

export default function ReviewBoard() {
  return (
    <CategoryBoard 
      category="review" 
      title="사고 후기" 
      desc="실제 사고 처리 경험과 팁을 다른 사람들과 공유해주세요." 
    />
  );
}