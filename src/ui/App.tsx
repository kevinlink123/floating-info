import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Date from "./components/cards/Date";
import Time from "./components/cards/Time";
import { SHRINK_MAINWINDOW_HEIGHT } from "./constants";

function App() {
  const [isShrink, setIsShrink] = useState(false);

  const toggleShrinkWindow = async () => {
    const isWindowShrinked = await window.electron.toggleShrinkWindow();
    console.log(isWindowShrinked);
    setIsShrink(isWindowShrinked);
  }

  return (
    <>
      <nav className={`group w-full flex justify-between items-center ${isShrink ? "h-full" : "h-auto"}`}>
        <ul className={`w-full flex justify-between items-center gap-6 py-2 px-2 bg-gray-950 text-gray-100 transition-all ${isShrink ? "translate-y-0 h-full" : "-translate-y-full group-hover:translate-y-0"} -translate-y-full group-hover:translate-y-0`}>
          <li className="">
            <button onClick={toggleShrinkWindow} className="hover:bg-gray-100 hover:text-gray-950 cursor-pointer transition-all duration-300 rounded-xl px-2 py-1">
              {isShrink ? "OPEN WIDGET" : "HIDE ME!"}
            </button>
          </li>
        </ul>
        <span
          id="drag-button"
          className="h-full flex items-center justify-center px-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 28 28"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 rotate-45"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        </span>
      </nav>
      <main className={isShrink ? "hidden" : ""}>
        <div className="card-container grid grid-cols-2 gap-4 rounded-3xl p-4">
          <Card colSize={1} rowSize={1} content={<Date/>} />
          <Card colSize={1} rowSize={1} content={<Time />} />
        </div>
      </main>
      <footer className="flex flex-col justify-center items-center w-full bg-gray-950 text-gray-100">
        <p>SOME FOOTER TEXT</p>
      </footer>
    </>
  );
}

export default App;
