function Card(props: { content: any; colSize: number; rowSize: number }) {
  return (
    <div className={`card-container flex justify-center items-center min-h-[100px] p-3 rounded-4xl bg-gray-200 shadow shadow-gray-300 drop-shadow-lg col-span-[${props.colSize}] row-span-[${props.rowSize}]`}>
      {props.content}
    </div>
  );
}

export default Card;
