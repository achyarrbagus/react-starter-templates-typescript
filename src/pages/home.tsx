import React, { useState, useEffect } from "react";

export const Home = () => {
  // You can change the api link according to what you want

  // const { data: fecthData } = useQuery("dataCache", async () => {
  //   try {
  //     const response = await axios.get(`your api`);
  //     return setDatas(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  const [state, setState] = React.useState<number>(0);
  const count = () => {
    if (state >= 10) {
      return alert("maximum capacity");
    }

    return setState(state + 1);
  };

  const less = () => {
    if (state <= 0) {
      return alert("maximum capacity");
    }

    return setState(state - 1);
  };

  return (
    <>
      <div className="grid justify-items-center">
        <div>{state}</div>
        <div className="flex gap-5">
          <button onClick={count}>+</button>
          <button onClick={less} className="bg-blue">
            -
          </button>
        </div>
      </div>
    </>
  );
};
