import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
const Activate = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  useEffect(() => {
    const decodedToken = decodeURIComponent(token);
    console.log(token);
    console.log("Decoded token:", decodedToken);
  }, [token]);

  return (
    <div className="activate mt-20">
      <div className="mt-4 grow flex justify-center items-center text-center ">
        <div className="flex justify-center items-center flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-24 h-24"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
          <p className="mt-10">
            <h1 className="font-bold text-3xl text-gray-800">Verified!</h1>
            <h3 className=" text-lg text-gray-800">
              You have successfully verified account.
            </h3>
            <button className="primary mt-2">
              <span onClick={handleClick}>okey</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Activate;
