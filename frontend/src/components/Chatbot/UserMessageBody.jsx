import axios from "axios";
import { getAuth } from "firebase/auth";

import React, { useEffect } from "react";

const UserMessageBody = ({ data }) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          <img
            style={{ width: "32px", borderRadius: "16px" }}
            src={getAuth().currentUser.photoURL}
          />
        </div>
        <div className="relative mr-3 text-md bg-[#323A96] text-white py-2 px-4 shadow rounded-xl">
          <div>{data.content}</div>
        </div>
      </div>
    </div>
  );
};

export default UserMessageBody;
