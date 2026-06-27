import './AboutFaultFinder.css';
import aboutFaultFinderBg from '../../../images/home/about-fault-finder-bg.jpg';

export default function AboutFaultFinder() {
    return (
        <section
            className="about-faultfinder"
            style={{
                backgroundImage: `url(${aboutFaultFinderBg})`,
            }}
        >
            <div className="about-overlay">
                <span className="about-label">ABOUT FAULTFINDER</span>

                <h2>
                    교통사고 정보는 복잡하고,
                    <br />
                    과실비율은 이해하기 어렵습니다.
                </h2>

                <p>
                    FaultFinder는 과실비율 인정기준과 실제 사고 사례를 기반으로
                    <br />
                    누구나 쉽고 빠르게 사고 정보를 확인할 수 있도록 돕습니다.
                </p>
            </div>
        </section>
    );
}