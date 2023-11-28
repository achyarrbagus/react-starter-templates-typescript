import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

// if u need change data on redux u need call reducer to change value
import { counterSlice } from "../redux/redux";

interface HomeProps {
  searchTerm: number;
  setSearchTerm: React.Dispatch<React.SetStateAction<number>>;
}

export const Home: React.FC<HomeProps> = ({ searchTerm, setSearchTerm }) => {
  const dispacth = useDispatch();
  // geting value from redux
  const counterValue = useSelector((state: any) => state.counter.value);
  // getting reducer to change the state redux

  setSearchTerm(1);

  console.log(searchTerm);

  // const { data, isLoading } = useQuery("dataCache", async () => {
  //   try {
  //     const response = await axios.get(`/test`);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
  // if (isLoading) {
  //   return <div>loading ....</div>;
  // }

  // console.log(data);

  // const [state, setState] = useState<number>(0);
  // const count = () => {
  //   if (state >= 10) {
  //     return alert("maximum capacity");
  //   }

  //   return setState(state + 1);
  // };

  // const less = () => {
  //   if (state <= 0) {
  //     return alert("maximum capacity");
  //   }

  //   return setState(state - 1);
  // };

  return (
    <>
      <div className="grid justify-items-center">
        {/* <h1>{ping.value}</h1> */}
        <div className="flex gap-5">
          <h5>counter slice {counterValue}</h5>
          <button onClick={() => dispacth(counterSlice.actions.incremented())}>+</button>
          <button onClick={() => dispacth(counterSlice.actions.decremented(5))}>-</button>
        </div>
      </div>
    </>
  );
};
