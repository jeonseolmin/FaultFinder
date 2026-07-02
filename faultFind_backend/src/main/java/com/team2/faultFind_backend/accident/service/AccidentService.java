package com.team2.faultFind_backend.accident.service;

import com.team2.faultFind_backend.accident.dto.AccidentResponse.*;
import com.team2.faultFind_backend.accident.entity.Accident;
import com.team2.faultFind_backend.accident.repository.AccidentRepository;
import com.team2.faultFind_backend.accidentdetail.dto.AccidentDetailResponse;
import com.team2.faultFind_backend.accidentdetail.entity.AccidentDetails;
import com.team2.faultFind_backend.accidentdetail.repository.AccidentDetailsRepository;
import com.team2.faultFind_backend.fault.dto.FaultResponse;
import com.team2.faultFind_backend.fault.repository.FaultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AccidentService {

    private final AccidentRepository accidentRepository;
    private final AccidentDetailsRepository accidentDetailsRepository;
    private final FaultRepository faultRepository;

    public AccidentDetailResponse getDetail(String caseCode) {
        Accident accident = accidentRepository.findById(caseCode)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사고 코드입니다: " + caseCode));

        AccidentDetails detail = accidentDetailsRepository
                .findByCaseCode(caseCode)
                .orElse(null);

        List<FaultResponse> modifiers = faultRepository.findByCaseCode(caseCode)
                .stream()
                .map(f -> FaultResponse.builder()
                        .modifierName(f.getModifierName())
                        .changeValue(f.getChangeValue())
                        .build())
                .toList();

        return AccidentDetailResponse.builder()
                .caseCode(accident.getCaseCode())
                .category(accident.getCategory())
                .title(accident.getTitle())
                .partyAName(accident.getPartyAName())
                .partyBName(accident.getPartyBName())
                .baseFaultA(accident.getBaseFaultA())
                .baseFaultB(accident.getBaseFaultB())
                .accidentSituation(detail != null ? detail.getAccidentSituation() : null)
                .baseFaultExplanation(detail != null ? detail.getBaseFaultExplanation() : null)
                .modifierExplanation(detail != null ? detail.getModifierExplanation() : null)
                .legalReference(detail != null ? detail.getLegalReference() : null)
                .modifiers(modifiers)
                .build();
    }

    // 🌟 [수정] 반환 타입을 List<TitleDto>로 깔끔하게 변경
    public List<TitleDto> getAllAccidents() {
        return accidentRepository.findAll()
                .stream()
                .map(this::toTitleDto)
                .toList();
    }

    // 🌟 [수정] 반환 타입을 TitleDto로 깔끔하게 변경
    public TitleDto getAccidentByCaseCode(String caseCode) {
        Accident accident = accidentRepository.findById(caseCode)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사고 코드입니다: " + caseCode));

        return toTitleDto(accident);
    }

    // 🌟 [수정] 기존 카테고리별 단순 조회 메서드도 구조에 맞춰 호환성 보완
    public List<TitleDto> getAccidentsByCategory(String category) {
        return accidentRepository.findByCategory(category)
                .stream()
                .map(this::toTitleDto)
                .toList();
    }

    // 🌟 [수정] null을 반환하던 구버전 매핑 대신, 제대로 구조화된 TitleDto를 빌드하도록 변경
    private TitleDto toTitleDto(Accident accident) {
        return TitleDto.builder()
                .title(accident.getTitle())
                .caseCode(accident.getCaseCode())
                .category(accident.getCategory())
                .partyAName(accident.getPartyAName())
                .partyBName(accident.getPartyBName())
                .baseFaultA(accident.getBaseFaultA())
                .baseFaultB(accident.getBaseFaultB())
                .build();
    }

    // 🌟 카테고리별 4단계 아코디언 트리 구조 가공 로직 (기존 유지)
    public List<MainCategoryDto> getGroupedAccidentsByCategory(String category) {
        List<Accident> rawAccidents = accidentRepository.findByCategory(category);

        Map<String, Map<String, Map<String, List<Accident>>>> grouped = rawAccidents.stream()
                .collect(Collectors.groupingBy(
                        item -> {
                            String main = item.getMainTitle() != null ? item.getMainTitle().trim() : "";
                            String sub = item.getSubTitle() != null ? item.getSubTitle().trim() : "";
                            String section = item.getSectionTitle() != null ? item.getSectionTitle().trim() : "";

                            if (main.isEmpty()) {
                                return !sub.isEmpty() ? sub : (!section.isEmpty() ? section : item.getTitle());
                            }
                            return main;
                        },
                        Collectors.groupingBy(
                                item -> {
                                    String sub = item.getSubTitle() != null ? item.getSubTitle().trim() : "";
                                    String section = item.getSectionTitle() != null ? item.getSectionTitle().trim() : "";

                                    if (sub.isEmpty()) {
                                        return !section.isEmpty() ? section : "일반";
                                    }
                                    return sub;
                                },
                                Collectors.groupingBy(
                                        item -> {
                                            String section = item.getSectionTitle() != null ? item.getSectionTitle().trim() : "";
                                            return section.isEmpty() ? "기본 정황" : section;
                                        }
                                )
                        )
                ));

        List<MainCategoryDto> result = new ArrayList<>();

        grouped.forEach((mainTitle, subMap) -> {
            List<SubCategoryDto> subCategoryDtos = new ArrayList<>();

            subMap.forEach((subTitle, sectionMap) -> {
                List<SectionCategoryDto> sectionCategoryDtos = new ArrayList<>();

                sectionMap.forEach((sectionTitle, items) -> {
                    List<TitleDto> titleDtos = items.stream()
                            .map(this::toTitleDto) // 수정된 매핑 메서드 활용
                            .collect(Collectors.toList());

                    sectionCategoryDtos.add(new SectionCategoryDto(sectionTitle, titleDtos));
                });

                subCategoryDtos.add(new SubCategoryDto(subTitle, sectionCategoryDtos));
            });

            result.add(new MainCategoryDto(mainTitle, subCategoryDtos));
        });

        return result;
    }
}