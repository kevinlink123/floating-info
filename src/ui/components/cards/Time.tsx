import { useEffect, useState } from "react";

function Time() {
	const [time, setTime] = useState("");
	useEffect(() => {
	window.electron.getTime((time) => {
		setTime(time);
	});
	}, []);


  return (
    <>
      <p className="">{time}</p>
    </>
  );
}

export default Time;
