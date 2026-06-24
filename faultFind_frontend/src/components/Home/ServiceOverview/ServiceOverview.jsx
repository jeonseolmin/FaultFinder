import React from "react";
import "./ServiceOverview.css";
import { FiSearch, FiPieChart, FiShield, FiMessageSquare } from "react-icons/fi";

const services = [
    {
        icon: <FiSearch />,
        title: "과실비율 조회",
        subtitle: "교통사고 과실비율 조회",
        desc: "과실비율 인정기준을 기반으로 사고 상황에 맞는 기준 과실비율을 쉽고 빠르게 확인할 수 있습니다.",
    },
    {
        icon: <FiPieChart />,
        title: "사고유형 분석",
        subtitle: "다양한 사고유형 제공",
        desc: "차량 대 차량, 차량 대 보행자, 차량 대 이륜차 등 다양한 사고유형을 체계적으로 제공합니다.",
    },
    {
        icon: <FiShield />,
        title: "사고 대처 가이드",
        subtitle: "사고 발생 시 단계별 안내",
        desc: "사고 발생 직후 필요한 조치와 보험 처리, 증거 확보 방법 등을 단계별로 안내합니다.",
    },
    {
        icon: <FiMessageSquare />,
        title: "커뮤니티",
        subtitle: "사고 사례 공유 공간",
        desc: "실제 사고 사례를 공유하고 다른 사용자들과 경험과 정보를 자유롭게 나눌 수 있습니다.",
    },
];

export default function ServiceOverview() {
    return (
        <section className="service-overview">
            <div className="service-overview-header">
                <h2 className="service-overview-title">OUR SERVICE</h2>
                <p className="service-overview-subtitle">FaultFind가 제공하는 핵심 기능</p>
            </div>

            <div className="service-overview-grid">
                {services.map((service, index) => (
                    <article className="service-overview-item" key={index}>
                        {/* 아이콘을 렌더링하는 부분 추가 */}
                        <div className="service-icon-wrapper">
                            {service.icon}
                        </div>
                        <div className="service-content">
                            <h3>{service.title}</h3>
                            <strong>{service.subtitle}</strong>
                            <p>{service.desc}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}