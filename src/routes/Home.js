import React, { useState, useEffect } from "react";
import { dbService } from "myBase";

const Home = () => {
  const [twitt, setTwitt] = useState("");
  const [twitts, setTwitts] = useState([]);
  const getTwitts = async () => {
    const dbTwitts = await dbService.collection("twitts").get();
    dbTwitts.forEach((document) => {
      const twittObject = {
        ...document.data(),
        id: document.id,
      };
      setTwitts((prev) => [twittObject, ...prev]);
    });
  };

  useEffect(() => {
    getTwitts();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("twitts").add({
      twitt,
      createdAt: Date.now(),
    });
    setTwitt("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTwitt(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={twitt}
          onChange={onChange}
          type="text"
          placeholder="지성, 오늘 뭐할겨?"
          maxLength={120}
        />
        <input type="submit" value="Push Twitt" />
      </form>
      <div>
        {twitts.map((twitt) => (
          <div key={twitt.id}>
            <h4>{twitt.twitt}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
