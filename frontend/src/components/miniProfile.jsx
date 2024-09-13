import { Link } from "react-router-dom";
import "./miniProfile.css";

function MasterCard({
  name,
  avatar,
  categories,
  rating,
  startDate,
  description,
}) {
  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => <span key={index}>{index < rating ? "★" : "☆"}</span>);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  return (
    <div className="card">
      <h1>Мастер по ремонту {categories.join(", ")}</h1>
      <p>{description}</p>
      <div className="rating">{renderStars()}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="master-info">
          <div className="avatar">
            <img src={avatar} alt="Avatar" />
          </div>
          <div className="details">
            <p>{name}</p>
            <p>с {formatDate(startDate)}</p>
          </div>
        </div>
        <Link to="/repairman-page" className="view-btn">
          Посмотреть
        </Link>
      </div>
    </div>
  );
}

export default MasterCard;
