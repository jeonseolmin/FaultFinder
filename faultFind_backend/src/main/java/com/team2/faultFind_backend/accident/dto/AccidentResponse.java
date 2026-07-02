package com.team2.faultFind_backend.accident.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class AccidentResponse {

    // 1단계: 대분류 (main_title)
    @Getter
    @Builder
    @AllArgsConstructor
    public static class MainCategoryDto {
        private String mainTitle;
        private List<SubCategoryDto> subCategories;
    }

    // 2단계: 중분류 (sub_title)
    @Getter
    @Builder
    @AllArgsConstructor
    public static class SubCategoryDto {
        private String subTitle;
        private List<SectionCategoryDto> sectionCategories;
    }

    // 3단계: 소분류 (section_title)
    @Getter
    @Builder
    @AllArgsConstructor
    public static class SectionCategoryDto {
        private String sectionTitle;
        private List<TitleDto> titles; // 최종 title 단계로 이어짐
    }

    // 4단계: 최종 타이틀 (title) 및 기본 과실 요약 정보 (보내주신 기존 필드 기반)
    @Getter
    @Builder
    @AllArgsConstructor
    public static class TitleDto {
        private String title; // 아코디언의 4번째 제목이 될 컬럼 값
        private String caseCode;
        private String category;
        private String partyAName;
        private String partyBName;
        private int baseFaultA;
        private int baseFaultB;
    }
}