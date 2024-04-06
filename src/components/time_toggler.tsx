import { useState } from "react"

function time_toggler({time, setTimer}: {time: Number, setTimer: any}) {
  const [nodeTime, setNodeTime] = useState("");
  
  setNodeTime(String(time))

  return (
    <div>
       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={
        () => {
            setTimer(time)
        }
       }>
        `${nodeTime} mins`
      </button> 
    </div>
  )
}

export default time_toggler