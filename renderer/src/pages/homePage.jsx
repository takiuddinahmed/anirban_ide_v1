import React, { useState, useEffect } from "react";
import Header from "../views/header";
import LogicBlockView from "../views/logicBlockView";
import WorkSpaceView from "../views/workspace";
import CodeView from "../views/code";
import Modal from "../components/modal";
import blocksToArduino from "../engine/blocksToArduino";

const { ipcRenderer } = window.require("electron");

const HomePage = () => {
  const [selectedBlocks, setSelectedBlocks] = useState([]);

  const [arduinoCode, setArduinoCode] = useState(``);

  const copyCodeToClipboard = () => {
    ipcRenderer.send("copy_code", arduinoCode);
  };
  useEffect(() => {
    blocksToArduino(selectedBlocks)
      .then((code) => {
        setArduinoCode(code);
        return 0;
      })
      .catch((err) => console.log(err));
  }, [selectedBlocks]);

  return (
    <>
      <div className="flex w-screen h-screen flex-col">
        {/* <Header /> */}

        <div className="mainBody">
          <LogicBlockView />
          <WorkSpaceView
            selectedBlocks={selectedBlocks}
            setSelectedBlocks={setSelectedBlocks}
            copyCode={copyCodeToClipboard}
            arduinoCode={arduinoCode}
          />
          <CodeView code={arduinoCode} />

          <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          />
        </div>
        <Modal />
      </div>
    </>
  );
};

export default HomePage;
