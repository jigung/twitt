import React, { useState } from "react";

const Home = () => {
  const [twitt, setTwitt] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTwitt(value);
  };

  return (
    <div>
      <form>
        <input
          value={twitt}
          onChange={onChange}
          type="text"
          placeholder="지성, 오늘 뭐할겨?"
          maxLength={120}
        />
        <input type="submit" value="Push Twitt" />
      </form>
    </div>
  );
};
export default Home;
