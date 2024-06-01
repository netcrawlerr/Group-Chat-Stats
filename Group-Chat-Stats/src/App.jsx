/* eslint-disable react/prop-types */
// // i want to place the div that show list of topchatter in the center of the screen i want it to be an orderd list and i want it to be scrollable in other words i want to apply overflow-scroll to the list of

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [view, setView] = useState("initial"); // 'initial', 'loading', 'results'
  const [chatData, setChatData] = useState(null);

  const handleChatData = (data) => {
    setChatData(data);
    setView("loading");
    // Simulate loading time
    setTimeout(() => {
      setView("results");
    }, 2000);
  };

  return (
    <>
      <div className="flex bg-amber-500 quicksand w-screen h-screen">
        <div className="flex-col bg-amber-900 h-screen justify-center items-center p-5 text-3xl text-yellow-400">
          <h1 className="mb-20">Group Chat Stats</h1>
          <img src="/peopletalking.svg" alt="" />
        </div>

        <div className="flex justify-center items-center m-auto p-4">
          <UploadData getChatters={handleChatData} />
          {view === "loading" && <Loader />}
          {view === "results" && chatData && (
            <TopChatters chatData={chatData} />
          )}
        </div>
      </div>
    </>
  );
}

function Loader() {
  return (
    <div className="loader-container flex-col justify-center items-center m-auto">
      <div className="loader"></div>
      <p className="mt-5 items text-green-900 text-2xl">Loading .......</p>
    </div>
  );
}

function UploadData({ getChatters }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          console.log(json);
          // Pass the parsed JSON data to the getChatters function
          getChatters(json);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <form>
      <div className="flex m-3">
        <span className="text-4xl m-2 text-white">Upload JSON Data</span>
        <img src="upload.svg" className="w-12" alt="upload icon" />
      </div>
      <label htmlFor="file-upload" className="file-btn">
        <a className="file-btn">
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
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            // If not used, remove commented style line
            // style={{ display: "none" }}
          />
        </a>
      </label>
      <button
        type="button"
        className="fancy"
        onClick={handleUpload}
        disabled={!file}
      >
        <span className="top-key"></span>
        <span className="mr-7 text file-btn">Show Results</span>
        <span className="bottom-key-1"></span>
        <span className="bottom-key-2"></span>
      </button>
    </form>
  );
}

function TopChatters({ chatData }) {
  const [topChitChatters, setTopChitChatters] = useState([]);
  const [groupName, setGroupName] = useState("No Data Found 😔");

  useEffect(() => {
    if (chatData) {
      const { name, messages } = chatData;
      setGroupName(name);

      const counts = messages.reduce((acc, msg) => {
        const actor = msg.actor || msg.from;
        acc[actor] = (acc[actor] || 0) + 1;
        return acc;
      }, {});

      const topChitChatters = Object.entries(counts)
        .map(([key, value]) => ({ key, value }))
        .sort((a, b) => b.value - a.value);

      setTopChitChatters(topChitChatters);
    }
  }, [chatData]);

  return (
    <div className="top-chatters-container flex justify-center items-center m-auto p-4 h-3/4">
      <div className="top-chatters-content w-full max-w-lg">
        <h1 className="text-4xl text-white mb-6 text-center">{groupName}</h1>
        <hr />
        <ol className="bg-stone-300 top-chatters-list overflow-scroll h-full">
          {topChitChatters.map((chatter, index) => (
            <li className="text-2xl p-2" key={index}>
              {chatter.key === "null"
                ? (chatter.key = "Deleted Account")
                : chatter.key}{" "}
              - {chatter.value} messages
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p>
        Developed by{" "}
        <a
          href="https://github.com/netcrawlerr"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mejid
        </a>{" "}
      </p>
    </footer>
  );
}

export default App;
