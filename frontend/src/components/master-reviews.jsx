import React, { useState } from "react";
import "./Reviews.css";

const Reviews = () => {
  const allReviews = [
    {
      avatar: "https://via.placeholder.com/50",
      text: "Lorem  salfkedpkwfpok",
      rating: 4,
    },
    { avatar: "https://via.placeholder.com/50", text: "Review 2", rating: 5 },
    { avatar: "https://via.placeholder.com/50", text: "Review 3", rating: 3 },
    { avatar: "https://via.placeholder.com/50", text: "Review 4", rating: 4 },
    { avatar: "https://via.placeholder.com/50", text: "Review 5", rating: 5 },
    { avatar: "https://via.placeholder.com/50", text: "Review 6", rating: 2 },
    { avatar: "https://via.placeholder.com/50", text: "Review 7", rating: 3 },
    { avatar: "https://via.placeholder.com/50", text: "Review 8", rating: 5 },
  ];

  const reviewsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("positive");

  const filteredReviews = allReviews.filter((review) => {
    if (selectedFilter === "positive") {
      return review.rating >= 4;
    } else if (selectedFilter === "negative") {
      return review.rating <= 3;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const CommentCard = ({ avatar, text, rating }) => {
    const renderStars = () => {
      return Array(5)
        .fill(0)
        .map((_, index) => (
          <span key={index}>{index < rating ? "★" : "☆"}</span>
        ));
    };
    return (
      <div className="comment-card">
        <div className="comment-header">
          <img src={avatar} alt="Avatar" className="avatar" />
          <div className="com-rating">{renderStars()}</div>
        </div>
        <p>{text}</p>
      </div>
    );
  };

  const renderPagination = () => {
    let pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`pagination-btn ${currentPage === i ? "active" : ""}`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, "...", totalPages].map((page, idx) => (
          <button
            key={idx}
            className={`pagination-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ));
      } else if (currentPage > totalPages - 3) {
        pages = [1, "...", totalPages - 2, totalPages - 1, totalPages].map(
          (page, idx) => (
            <button
              key={idx}
              className={`pagination-btn ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          )
        );
      } else {
        pages = [1, "...", currentPage, "...", totalPages].map((page, idx) => (
          <button
            key={idx}
            className={`pagination-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ));
      }
    }
    return pages;
  };

  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <div className="reviews">
      <div className="filter">
        <h1>Фильтр</h1>
        <button
          className={`filter-btn ${
            selectedFilter === "positive" ? "active" : ""
          }`}
          onClick={() => handleFilterClick("positive")}
        >
          положительные
        </button>
        <button
          className={`filter-btn ${
            selectedFilter === "negative" ? "active" : ""
          }`}
          onClick={() => handleFilterClick("negative")}
        >
          отрицательные
        </button>
      </div>

      <div className="comments">
        {currentReviews.map((review, index) => (
          <CommentCard
            key={index}
            avatar={review.avatar}
            text={review.text}
            rating={review.rating}
          />
        ))}
      </div>

      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          <img src="/images/arrow.png" alt="arrow" />
          предыдущее
        </button>

        {renderPagination()}

        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          следующее
          <img
            src="/images/arrow.png"
            style={{ transform: "rotate(180deg)" }}
            alt="arrow"
          />
        </button>
      </div>
    </div>
  );
};

export default Reviews;
