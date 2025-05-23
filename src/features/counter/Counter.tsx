import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { decrement, increment, incrementByAmount } from "./counterSlice";

export const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="">
      <div className="">Count: {count} </div>
      <button aria-label="decrement" onClick={() => dispatch(decrement())}>
        -
      </button>
      <button aria-label="increment" onClick={() => dispatch(increment())}>
        +
      </button>
      <button
        aria-label="incrementbyamount"
        onClick={() => dispatch(incrementByAmount(3))}
      >
        multiple by 3
      </button>
    </div>
  );
};
