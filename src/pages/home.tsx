import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";

interface HomeProps {
  searchTerm: number;
  setSearchTerm: React.Dispatch<React.SetStateAction<number>>;
}

export const Home: React.FC<HomeProps> = ({ searchTerm, setSearchTerm }) => {
  setSearchTerm(1);
  console.log(searchTerm);

  const { data, isLoading } = useQuery("dataCache", async () => {
    try {
      const response = await axios.get(`/test`);
      return response;
    } catch (error) {
      console.log(error);
    }
  });
  if (isLoading) {
    return <div>loading ....</div>;
  }

  console.log(data);

  const [state, setState] = useState<number>(0);
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
