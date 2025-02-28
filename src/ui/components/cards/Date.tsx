import { useEffect, useState } from "react";

function Date() {
	const [date, setDate] = useState<{
		day: string;
		month: string;
		number: number;
	}>({
		day: '',
		month: '',
		number: 0
	});

	useEffect(() => {
		window.electron.getDate((dateObj) => {
			setDate(dateObj);
		});
	}, [])

	return (
		<div className="w-full h-full">
			<div className="flex justify-between items-center h-1/3 select-none text-center text-[23px] uppercase">
				<span className="w-1/2">{date.day}</span>
				<span className="w-1/2">{date.month}</span>
			</div>
			<div className="flex justify-center items-center h-2/3 text-8xl font-sans font-bold select-none">
				{date.number < 10 ? (
					<>
						<span>0</span>
						{date.number}
					</>
				) : (
					<>{date.number}</>
				)}
			</div>
		</div>
	);
}

export default Date;
