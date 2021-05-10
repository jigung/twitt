import React, { useState } from "react";
import { dbService, storageService } from "myBase";

const Twitt = ({ twittObj, isOwner }) => {
  //에디팅 모드인지 아닌지 true / false 값 가리기
  const [editing, setEditing] = useState(false);
  //input에 입력된 text 업데이트(edit 가능하게 만듬)
  const [newTwitt, setNewTwitt] = useState(twittObj.text);
  //딜릿클릭, 트위트 삭제
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 이 Twitt을 삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`twitts/${twittObj.id}`).delete();
      await storageService.refFromURL(twittObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`twitts/${twittObj.id}`).update({
      text: newTwitt,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTwitt(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your twitt"
              value={newTwitt}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Twitt" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{twittObj.text}</h4>
          {twittObj.attachmentUrl && (
            <img src={twittObj.attachmentUrl} width="200px" height="200px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Twitt</button>
              <button onClick={toggleEditing}>Edit Twitt</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Twitt;
