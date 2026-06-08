import "./HomePage.css";

const categories = [
  { icon: "🚗", title: "차량 대 차량" },
  { icon: "🚶", title: "차량 대 사람" },
  { icon: "🛵", title: "차량 대 이륜차" },
  { icon: "🚲", title: "차량 대 자전거" },
  { icon: "🚦", title: "단독 사고" },
  { icon: "📙", title: "기타" },
];

function HomePage() {
  return (
    <div className="home">
      <nav className="navbar">
        <div className="logo">FaultFinder</div>

        <div className="nav-buttons">
          <button>로그인</button>
          <button>마이페이지</button>
        </div>
      </nav>

      <main className="main">
        <h1>교통사고 과실비율 조회</h1>
        <p>사고 상황을 입력하고 예상 과실비율을 확인해보세요.</p>

        <div className="search-box">
          <input placeholder="예: 신호 없는 교차로에서 직진 중 충돌했어요" />
          <button>검색</button>
        </div>

        <section className="categories">
          {categories.map((category, index) => (
            <div className="category-card" key={index}>
              <div className="category-icon">{category.icon}</div>
              <div className="category-title">{category.title}</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default HomePage;