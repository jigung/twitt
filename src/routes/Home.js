import React, { useState, useEffect } from "react";
import { dbService } from "myBase";
import Twitt from "../components/Twitt";

const Home = ({ userObj }) => {
  const [twitt, setTwitt] = useState("");
  const [twitts, setTwitts] = useState([]);
  // const set twitts => firestroe에 twitts data 전송.
  // const get twitts => firestore에 twitts 컬렉션 자동으로 얻기.

  useEffect(() => {
    dbService.collection("twitts").onSnapshot((snapshot) => {
      const twittArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTwitts(twittArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("twitts").add({
      text: twitt,
      createdAt: Date.now(),
      creatorId: userObj.uid,
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
      {/* what do you do? twitt 창 */}
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
      {/* / twitt.twitt 웹 페이지에 twitt 이 나오는 멘트 css 할떄 참고~ */}
      <div>
        {twitts.map((twitt) => (
          <Twitt
            key={twitt.id}
            twittObj={twitt}
            isOwner={twitt.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
