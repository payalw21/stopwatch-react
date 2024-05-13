import React, { useEffect, useState } from "react";

const Cont = ({ index, deletefun }) => {
  const [hr, setHr] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [timer, setTimer] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isDesEditing, setIsDescEditing] = useState(false);

  function handleStart() {
    setTimer((prev) => !prev);
    // setTimer((prev) => (prev ? false : true)); OR
    // setTimer((prev) => { return prev ? false : true}); OR
  }

  function handleReset() {
    setTimer(false);
    setHr(0);
    setMin(0);
    setSec(0);
  }

  const watch = () => {
    if (sec < 59) {
      setSec((prev) => prev + 1);
    } else if (sec == 59 && min < 59) {
      setMin((prev) => prev + 1);
      setSec(0);
    } else if (min == 59) {
      setHr((prev) => prev + 1);
      setMin(0);
      setSec(0);
    }
    console.log("hr " + hr);
    console.log("min " + min);
    console.log("sec " + sec);
  };

  useEffect(() => {
    let intervalId = null;

    if (timer) {
      intervalId = setInterval(watch, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer, hr, min, sec]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    console.log(event.target.value);
  };

  const handleTextChange = (event) => {
    setDesc(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="card-container">
          <div className="timer-container">
            <div className="timer">
              <span className="hr">{hr < 10 ? "0" + hr : hr}</span>
              <span>:</span>

              <span className="hr">{min < 10 ? "0" + min : min}</span>
              <span>:</span>

              <span className="hr">{sec < 10 ? "0" + sec : sec}</span>

              {/* <span className="hr">{count}</span> */}
            </div>
            <div className="buttons">
              <button onClick={handleStart} className="btn" id="start">
                {timer ? "Stop" : "Start"}
              </button>
              <button
                disabled={timer}
                onClick={handleReset}
                className="btn"
                id="reset"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="info">
            {isTitleEditing ? (
              <input
                type="text"
                value={title}
                placeholder="Title"
                onChange={handleTitleChange}
                onBlur={() => {
                  setIsTitleEditing(false);
                }}
              />
            ) : (
              <h3
                onClick={() => {
                  setIsTitleEditing(true);
                }}
              >
                {title.length === 0 ? "Title" : title}
              </h3>
            )}

            {isDesEditing ? (
              <textarea
                value={desc}
                placeholder="Description"
                id=""
                cols="30"
                rows="10"
                onChange={handleTextChange}
                onBlur={() => {
                  setIsDescEditing(false);
                }}
              ></textarea>
            ) : (
              <h3
                onClick={() => {
                  setIsDescEditing(true);
                }}
              >
                {desc.length === 0 ? "Description" : desc}
              </h3>
            )}

            <button
              onClick={() => {
                deletefun(index);
              }}
              className="del-btn"
            >
              Delete
            </button>

            {/* <h1>Title</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p> */}
          </div>
          {/* <div></div> */}
        </div>
      </div>
    </>
  );
};

export default Cont;
