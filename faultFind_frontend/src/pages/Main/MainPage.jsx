import Footer from "../../components/Layout/Footer/Footer.jsx";
import HeroSection from "../../components/Home/HeroSection/HeroSection.jsx";
import ServiceOverview from "../../components/Home/ServiceOverview/ServiceOverview.jsx";
import AboutFaultFinder from "../../components/Home/AboutFaultFinder/AboutFaultFinder.jsx";
export default function MainPage() {
  return (
    <div className="main-page-container">
      {/* 1번 구역 (첫 번째 위치): 하늘색 자동차 배경 + AI 과실비율 조회 */}
        <HeroSection/>
        <ServiceOverview/>
        <AboutFaultFinder/>
        <Footer />
    </div>
  );
}
