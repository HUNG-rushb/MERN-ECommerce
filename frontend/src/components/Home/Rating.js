// import React from "react";
import PropTypes from "prop-types";
import "./Rating.module.css";

const Rating = (props) => {
  const value = props.value;

  return (
    <div className="rating">
      <span>
        <i
          style={{ color: props.color }}
          className={
            value >= 1
              ? "fas fa-star"
              : value >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          style={{ color: props.color }}
          className={
            value >= 2
              ? "fas fa-star"
              : value >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          style={{ color: props.color }}
          className={
            value >= 3
              ? "fas fa-star"
              : value >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          style={{ color: props.color }}
          className={
            value >= 4
              ? "fas fa-star"
              : value >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          style={{ color: props.color }}
          className={
            value >= 5
              ? "fas fa-star"
              : value >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>

      <span>{props.text ? props.text : ""}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

Rating.propTypes = {
  // value: PropTypes.number.isRequired,
  value: PropTypes.number,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};
export default Rating;
