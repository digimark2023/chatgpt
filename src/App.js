import React, { useState } from "react";
import "./App.css";
import img from "./mylo.PNG";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
    //.catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="image">
          <img src={img} alt="Logo" />;
        </div>

        <div className="title">
          <h6>CareChat: Expert Health Advice, Anytime</h6>
        </div>
        <div className="subtitle">
          {" "}
          Currently this app only customized for healtcare related chat.
        </div>
        <textarea
          className="text-area"
          value={message}
          placeholder="Ask me any thing.."
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div>
          {" "}
          <button className="button" type="submit">
            Submit{" "}
          </button>
        </div>
      </form>
      <div className="respose-text"> {response}</div>
    </div>
  );
}

export default App;
