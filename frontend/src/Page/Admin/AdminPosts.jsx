import React, { useEffect, useMemo, useState } from 'react'
import "./AdminPosts.scss"
import axios from "axios";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/post")
        setPosts(response.data)
      } catch (error) {
        console.log("게시글 가져오기 실패", error)
      }
    }
    fetchPosts()
  }, [])

  const getFileNameFromUrl = (url) => {
    if (!url || typeof url !== "string") return null;

    const parts = url.split("/")
    const name = parts[parts.length - 1]

    return name.trim() || null;
  }

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const value = post[searchType]?.toLowerCase() || "";
      return value.includes(searchTerm.toLowerCase())
    })

  }, [posts, searchTerm, searchType])


  const totalPages = pageSize > 0 ? Math.ceil(filteredPosts.length / pageSize) : 1;

  const pagenatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize)
  }, [filteredPosts, currentPage, pageSize])

  return (
    <div className="admin-posts">
      <div className="inner">
        <h1>게시글 관리</h1>

        <div className="controls">
          <div className="filters">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="name">제목</option>
              <option value="content">글 내용</option>
            </select>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text" placeholder="검색어를 입력하세요" />
          </div>

          <a href="#" className="add-button">
            추가하기
          </a>
        </div>
        <div className="total-count">총 {pagenatedPosts.length}개의 게시물</div>
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

          {pagenatedPosts.length === 0 ?
            (
              <li className="post-row">
                게시글이 없습니다.
              </li>
            ) : (pagenatedPosts.map((post, index) => (
              <li key={post._id} className="post-row">
                <span className="col no">{(currentPage - 1) * pageSize + index + 1}</span>
                <span className="col title">{post.title}</span>
                <span className="col content">{post.content}</span>
                <span className="col views">{post.views}</span>
                <span className="col files">
                  {Array.isArray(post.fileUrl) ? (
                    post.fileUrl.map((url, i) => (
                      <button key={i}
                        onClick={() => { window.open(url, "_blank") }}
                        className="file-button">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        {getFileNameFromUrl(url)}
                      </button>
                    ))
                  ) : (post.fileUrl && (
                    <button
                      onClick={() => window.open(post.fileUrl, "_blank")}
                      className="none">
                      {getFileNameFromUrl(post.fileUrl)}
                    </button>
                  )
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
            )))}
        </ul>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1 || totalPages === 0}
          >이전</button>
          <span>
              {totalPages > 0 ? `${currentPage} / ${totalPages}` : "0/0"}
          </span>
          <button
             onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage >= totalPages || totalPages === 0}
          >다음</button>
        </div>
      </div>
    </div>
  )
}

export default AdminPosts