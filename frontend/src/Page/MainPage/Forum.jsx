import React from "react";
import { Link } from "react-router-dom";
import "./Forum.scss";     // SCSS 연결

const Forum = () => {
  const dummyPosts = [
    { _id: 1, number: 1, title: "첫 번째 게시물 입니다.", views: 120, fileUrl: ["file1"], createdAt: "2023-01-01" },
    { _id: 2, number: 2, title: "두 번째 게시물 입니다.", views: 95,  fileUrl: [],        createdAt: "2023-01-05" },
    { _id: 3, number: 3, title: "세 번째 게시물 입니다.", views: 70,  fileUrl: ["file2","file3"], createdAt: "2023-01-10" },
    { _id: 4, number: 4, title: "네 번째 게시물 입니다.", views: 50,  fileUrl: [],        createdAt: "2023-01-15" },
    { _id: 5, number: 5, title: "다섯 번째 게시물 입니다.", views: 30,  fileUrl: ["file4"], createdAt: "2023-01-20" },
  ];

  return (
    <section className="forum">
      <div className="inner">
        <header className="forum-header">
          <h4 >업무 게시판</h4>

          <Link
            to="/board"
            className="forum-more"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            전체보기
            <span className="icon icon--arrow" />
          </Link>
        </header>

        <div className="forum-list">
          {dummyPosts.length === 0 ? (
            <p className="forum-empty">최근 게시물이 없습니다.</p>
          ) : (
            dummyPosts.map((post) => (
              <article key={post._id} className="forum-item">
                <div className="forum-meta">
                  <span>No. {post.number}</span>
                  <span>조회수: {post.views}</span>
                  {post.fileUrl.length > 0 && <span>파일: {post.fileUrl.length}</span>}
                </div>

                <h3 className="forum-item-title">{post.title}</h3>
                <time className="forum-date">{post.createdAt}</time>

                <span className="icon icon--arrow" />
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Forum;
