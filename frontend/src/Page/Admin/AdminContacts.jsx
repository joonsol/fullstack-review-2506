import React from 'react'
import "./AdminContacts.scss"
const AdminContacts = () => {
  const contacts = [
    {
      id: 1,
      name: "홍길동",
      email: "hong@example.com",
      phone: "010-1234-5678",
      message: "상품에 대한 문의입니다.",
      status: "대기중",
    },
    {
      id: 2,
      name: "이영희",
      email: "lee@example.com",
      phone: "010-8765-4321",
      message: "환불 요청합니다.",
      status: "진행중",
    },
    {
      id: 3,
      name: "박철수",
      email: "park@example.com",
      phone: "010-0000-1111",
      message: "연락이 지연되고 있습니다.",
      status: "완료",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "대기중":
        return "status pending";
      case "진행중":
        return "status in-progress";
      case "완료":
        return "status completed";
      default:
        return "status";
    }
  };
  return (
    <div className="admin-contacts">
      <div className="inner">
        <h1>문의 관리</h1>
        <div className="controls">
          <div className="filters">
            <select>
              <option value="name">이름</option>
              <option value="email">이메일</option>
              <option value="phone">전화번호</option>
              <option value="message">문의내용</option>
            </select>
            <input type="text" placeholder="검색어를 입력하세요" />
            <select>
              <option value="all">전체 상태</option>
              <option value="pending">대기중</option>
              <option value="in progress">진행중</option>
              <option value="completed">완료</option>
            </select>

            {/* 총 개수 */}
            <div className="total-count">총 {contacts.length}개의 문의</div>
          </div>
        </div>
        <ul className="contact-list">
          <li className="contact-header">
            <span className="col no">번호</span>
            <span className="col name">이름</span>
            <span className="col email">이메일</span>
            <span className="col phone">휴대폰</span>
            <span className="col message">문의 내용</span>
            <span className="col status">상태</span>
            <span className="col actions">관리</span>
          </li>
          {contacts.map((contact) => (
            <li key={contact.id} className="contact-row">
              <span className="col no">{contact.id}</span>
              <span className="col name">{contact.name}</span>
              <span className="col email">{contact.email}</span>
              <span className="col phone">{contact.phone}</span>
              <span className="col message">{contact.message}</span>
              <span className={`col status ${getStatusClass(contact.status)}`}>{contact.status}</span>
              <span className="col actions">
                <button className="edit">수정</button>
                <button className="delete">삭제</button>
              </span>
            </li>
          ))}
        </ul>

        {/* 페이지네이션 */}
        <div className="pagination">
          <button disabled>이전</button>
          <span>1 / 1</span>
          <button disabled>다음</button>
        </div>
      </div>
    </div>
  )
}

export default AdminContacts