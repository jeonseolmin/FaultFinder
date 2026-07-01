import "./HeroSection.css";
import heroBg from "../../../images/home/hero-section-bg.png";
export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">
                    TRAFFIC ACCIDENT
                    <br />
                    FAULT ANALYSIS
                </h1>

                <p className="hero-subtitle">
                    교통사고 과실비율 조회 및 사고 정보 서비스
                </p>
            </div>
            <div className='hero-image' style={{ backgroundImage: `url(${heroBg})` }}>
                <div className="hero-text-box">
                    <span className="hero-kicker">WHAT WE DO</span>

                    <h2>
                        사고를 이해하기 쉽게,
                        <br />
                        과실비율을 더 명확하게.
                    </h2>

                    <p>
                        FaultFinder는 교통사고 과실비율 인정기준과 실제 사고 사례를 기반으로
                        사고 유형 분석, 과실비율 조회, 사고 대처 가이드를 제공합니다.
                    </p>
                </div>
            </div>

        </section>
    );
}