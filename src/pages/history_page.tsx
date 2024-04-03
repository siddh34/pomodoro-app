import { GalleryVerticalEnd } from "lucide-react";
import { useNavigate } from "react-router-dom";
function history_page() {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={()=>{
          navigate("/")
        }}
      ><GalleryVerticalEnd />

      </button>
      <div className="flex justify-center items-center">
        <ol className="relative border-s border-gray-200 dark:border-gray-700 ">
          <li className="mb-20 ms-10">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.0 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-10 text-sm font-normal leading-none text-gray-900 dark:text-gray-1000">10 February 2022, Monday</time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-600">opened at 10 am.</p>
            <p className="mb-10 text-base font-normal text-gray-500 dark:text-gray-600">closed at 3 pm.</p>
          </li>
          <li className="mb-20 ms-10">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-10 text-sm font-normal leading-none text-gray-900 dark:text-gray-1000">10 February 2022, Monday</time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-600">opened at 10 am.</p>
            <p className="mb-10 text-base font-normal text-gray-500 dark:text-gray-600">closed at 3 pm.</p>
          </li>
        </ol>
      </div>
    </>
  )
}

export default history_page;
