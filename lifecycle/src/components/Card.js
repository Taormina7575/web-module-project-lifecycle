import React from "react";
import "./Card.css";

export default function Card({props}) {
    
  return (
    <div className="card">
      <img src={props.avatar_url} alt="vinnie" />
      <div className='card-info'>
        <h3 className="name">{props.name}</h3>
        <p className="username">{props.login}</p>
        <p>Location: {props.location}</p>
        <p>
          Profile:
          <a href={props.url}>{props.url}</a>
        </p>
        <p>Followers: {props.followers}</p>
        <p>Following: {props.following}</p>
        <p>Bio: {props.bio}</p>
      </div>
    </div>
  );
}
