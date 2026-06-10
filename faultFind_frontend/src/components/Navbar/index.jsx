import Nav from 'react-bootstrap/Nav';

function Navbar() {
  return (
   <Nav difaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="사교유형">사교유형</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="과실비율조회">과실비율조회</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="법률정보">법률정보</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="판례검색">판례검색</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="보상가이드">보상가이드</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="상담신청">상담신청</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
