import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "myBase";
import Twitt from "../components/Twitt";

const Home = ({ userObj }) => {
  const [twitt, setTwitt] = useState("");
  const [twitts, setTwitts] = useState([]);
  const [attachment, setAttachment] = useState("");
  // const set twitts => firestroe에 twitts data 전송.
  // const get twitts => firestore에 twitts 컬렉션 자동으로 얻기.

  useEffect(() => {
    //ONSNAPSHOT 은 데이터베이스에 무슨일이 있을대 알림을 받는거임 ㅋ
    //새로운 스냅샷을 받을때 배열을 만든다. 아래 DOC ID 랑 DATA를 받음.
    //그리고 아래 내려보면 MAP 으로 넘어감.
    dbService
      .collection("twitts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const twittArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTwitts(twittArray);
      });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    const twittObj = {
      text: twitt,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection("twitts").add(twittObj);
    setTwitt("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTwitt(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onCancelPhotoClick = () => setAttachment("");
  return (
    <div>
      {/* what do you do? twitt 창 */}
      <form onSubmit={onSubmit}>
        <input
          value={twitt}
          onChange={onChange}
          type="text"
          placeholder="What's on your Twitt?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Push Twitt" />
        {attachment && (
          <div>
            <img src={attachment} width="200px" height="200px" />
            <button onClick={onCancelPhotoClick}>Cancel</button>
          </div>
        )}
      </form>
      {/* / twitt.twitt 웹 페이지에 twitt 이 나오는 멘트 css 할떄 참고~ */}
      <div>
        {/* //뉴 컴포넌트를 만드는거임  */}
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
