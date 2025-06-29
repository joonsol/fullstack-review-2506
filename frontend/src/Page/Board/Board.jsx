import React, { useState } from 'react'
import './Board.scss'
const Board = () => {
    const [currentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const dummyPosts = [
    { _id: 1, number: 1, title: "첫 번째 게시물", createdAt: "2023-11-01T10:00:00", views: 10 },
    { _id: 2, number: 2, title: "두 번째 게시물", createdAt: "2023-11-02T11:30:00", views: 20 },
    { _id: 3, number: 3, title: "세 번째 게시물", createdAt: "2023-11-03T14:00:00", views: 30 },
    { _id: 4, number: 4, title: "네 번째 게시물", createdAt: "2023-11-04T16:45:00", views: 40 },
    { _id: 5, number: 5, title: "다섯 번째 게시물", createdAt: "2023-11-05T09:15:00", views: 50 },
  ];
    const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = dummyPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <section className='board-container top-section'>
      <div className="inner">
        <div className="t-wrap">
          <h3>공지사항</h3>
        </div>
        <div className="controls">
          <div className="filters">
            <select
            >
              <option value="name">한국어</option>

            </select>
            <input
              type="text" placeholder="검색어를 입력하세요" />
          </div>


        </div>
        <div className="date-filter-container">
          <div className="date-filter-group">
            <label className="date-label">날짜</label>
            <input
              type="date"
              className="date-input"
            />
          </div>
          <div className="date-filter-group">
            <label className="date-label">날짜:</label>
            <input
              type="date"
              className="date-input"
            />
          </div>
        </div>
        {/* 게시글 수 & 페이지당 게시글 수 */}
        <div className="count-wrap">
          <div className="total-count">총 게시글: {dummyPosts.length}건</div>
          <select>
            <option value="10">10개씩 보기</option>
            <option value="20">20개씩 보기</option>
          </select>
        </div>
        {/* 게시글 리스트 */}
        <ul className="post-list">
          <li className="post-header">
            <div className="col no">번호</div>
            <div className="col title">제목</div>
            <div className="col">작성일</div>
            <div className="col">조회수</div>
          </li>

          {currentPosts.map((post) => (
            <li className="post-row" key={post._id}>
              <div className="col no">{post.number}</div>
              <div className="col title">{post.title}</div>
              <div className="col"> {new Date(post.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })}</div>
              <div className="col">{post.views}</div>
            </li>
          ))}
        </ul>

        {/* 페이지네이션 */}
        <div className="pagination">
          <button disabled={currentPage === 1}>이전</button>
          <span>{currentPage}</span>
          <button>다음</button>
        </div>
      </div>
    </section>
  )
}

export default Board