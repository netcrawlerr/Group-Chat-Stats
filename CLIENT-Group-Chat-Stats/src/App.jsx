import { useEffect, useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <div className="flex bg-amber-500 quicksand ">
        <div className=" flex  bg-amber-900 h-screen justify-center items-start p-5 text-3xl text-yellow-400 ">
          {/* <img src="chat.svg" className="w-12 " alt="" /> */}
          <h1>Group Chat Stats</h1>
        </div>

        {2 > 3 ? (
          <div className="flex justify-center items-center m-auto p-4">
            <form action="">
              <div className="flex m-3">
                <span className="text-4xl m-2 text-white">
                  Upload JSON Data
                </span>
                <img src="upload.svg" className="w-12" alt="" />
              </div>

              <a>
                <svg
                  viewBox="0 0 256 256"
                  height="32"
                  width="38"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: "rotate(180deg)" }}
                >
                  <path
                    d="M74.34 85.66a8 8 0 0 1 11.32-11.32L120 108.69V24a8 8 0 0 1 16 0v84.69l34.34-34.35a8 8 0 0 1 11.32 11.32l-48 48a8 8 0 0 1-11.32 0ZM240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h52.4a4 4 0 0 1 2.83 1.17L111 145a24 24 0 0 0 34 0l23.8-23.8a4 4 0 0 1 2.8-1.2H224a16 16 0 0 1 16 16m-40 32a12 12 0 1 0-12 12a12 12 0 0 0 12-12"
                    fill="currentColor"
                  ></path>
                </svg>
                <input
                  type="file"
                  style={{ display: "block", marginTop: "10px" }}
                />
              </a>
            </form>
          </div>
        ) : (
          <Loader />
        )}

        {/* <Loader /> */}
      </div>
      <TopChatters />
    </>
  );
}

function Loader() {
  return (
    <div className="loader-container flex-col justify-center items-center m-auto">
      <div className="loader "></div>
      <p className="mt-5 items text-green-900 text-2xl"> Loading .......</p>
    </div>
  );
}

function TopChatters() {
  const [topChitChatters, setTopChitChatters] = useState([]);
  const [groupName, setGroupName] = useState("....");

  async function getChatters() {
    const array = [];
    const res = await fetch("../result.json");
    const data = await res.json();

    setGroupName(data.name);
    for (let i = 0; i < data.messages.length; i++) {
      if (data.messages[i].actor !== undefined) {
        array.push(data.messages[i].actor);
      } else {
        array.push(data.messages[i].from);
      }
    }

    const counts = new Map();
    array.forEach((item) => {
      counts.set(item, (counts.get(item) || 0) + 1);
    });

    const topChitChatters = Array.from(counts, ([key, value]) => ({
      key,
      value,
    })).sort((a, b) => b.value - a.value);

    setTopChitChatters(topChitChatters);
  }

  useEffect(() => {
    getChatters();
  }, []);

  return (
    <div>
      <h1>{groupName}</h1>
      <hr />
      <ul>
        {topChitChatters.map((chatter, index) => (
          <li key={index}>
            {chatter.key} - {chatter.value} messages
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
now what 
*/
export default App;
