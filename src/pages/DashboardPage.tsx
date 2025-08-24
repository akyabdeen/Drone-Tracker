import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const DashboardPage = () => {
    const [counter, setCounter] = useState(0);

    const decrement = () => {
        setCounter(counter => counter - 10000000000);
    }

    const increment = () => {
        setCounter(counter => counter + 10000000000);
    }

  return (
    <div className="h-full w-full bg-sager-lighter-gray text-white p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl">Hey Abdallah</h1>
        <p>
            Thanks for checking out the code, I know you probably have a lot of these to review
            The following counter is a peace offering.
        </p>
        <p className="mx-4 mb-2 italic">
            - A developer who prefers backend but can handle frontend when needed
        </p>
      </div>
      <div className="flex flex-row items-center gap-3">
        <Minus size={48} onClick={increment} className="bg-sager-black rounded-md"/>
        <h2 className="text-4xl">
            {counter}
        </h2>
        <Plus size={48} onClick={decrement} className="bg-sager-black rounded-md"/>
      </div>
    </div>
  );
};

export default DashboardPage;
