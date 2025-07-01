import React from 'react'
import "./AdminPosts.scss"
const AdminPosts = () => {
  const dummyPosts = [
    {
      _id: "1",
      title: "첫 번째 게시글",
      content: "이것은 첫 번째 게시글 내용입니다.",
      views: 123,
      fileUrl: ["https://example.com/file1.pdf"],
      createdAt: "2023-12-01T12:00:00Z",
      updatedAt: "2023-12-02T15:30:00Z",
    },
    {
      _id: "2",
      title: "두 번째 게시글",
      content: "두 번째 게시글 내용입니다.",
      views: 456,
      fileUrl: [
        "https://example.com/file2.pdf",
        "https://example.com/file3.pdf",
      ],
      createdAt: "2023-12-03T10:00:00Z",
      updatedAt: "2023-12-03T18:45:00Z",
    },
    {
      _id: "3",
      title: "세 번째 게시글",
      content: "세 번째 게시글 내용입니다.",
      views: 789,
      fileUrl: [],
      createdAt: "2023-12-05T09:00:00Z",
      updatedAt: "2023-12-05T14:30:00Z",
    },
  ];

  return (
    <div className="admin-posts">
      <div className="inner">
        <h1>게시글 관리</h1>

        <div className="controls">
          <div className="filters">
            <select>
              <option value="name">제목</option>
              <option value="content">글 내용</option>
            </select>
            <input type="text" placeholder="검색어를 입력하세요" />
          </div>

          <a href="#" className="add-button">
            추가하기
          </a>
        </div>
        <div className="total-count">총 {dummyPosts.length}개의 게시물</div>
        <ul className="post-list">
          <li className="post-header">
            <span className="col no">번호</span>
            <span className="col title">제목</span>
            <span className="col content">내용</span>
            <span className="col views">조회수</span>
            <span className="col files">파일</span>
            <span className="col created">작성일</span>
            <span className="col updated">수정일</span>
            <span className="col actions">관리</span>
          </li>

          {dummyPosts.map((post, index) => (
            <li key={post._id} className="post-row">
              <span className="col no">{index + 1}</span>
              <span className="col title">{post.title}</span>
              <span className="col content">{post.content}</span>
              <span className="col views">{post.views}</span>
              <span className="col files">
                {post.fileUrl.length > 0 ? (
                  post.fileUrl.map((url, i) => (
                    <button key={i} className="file-button">
                      파일 {i + 1}
                    </button>
                  ))
                ) : (
                  <span className="none">없음</span>
                )}
              </span>
              <span className="col created">
                {new Date(post.createdAt).toLocaleString()}
              </span>
              <span className="col updated">
                {new Date(post.updatedAt).toLocaleString()}
              </span>
              <span className="col actions">
                <button className="edit">수정</button>
                <button className="delete">삭제</button>
              </span>
            </li>
          ))}
        </ul>

        <div className="pagination">
          <button disabled>이전</button>
          <span>1 / 1</span>
          <button disabled>다음</button>
        </div>
      </div>
    </div>
  )
}

export default AdminPosts