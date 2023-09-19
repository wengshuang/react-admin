import { Button } from "antd";
import useStore from "@/store/index.js";

const Home = () => {
  const bears = useStore((state) => state.bears);
  const increasePopulation = useStore((state) => state.increasePopulation);

  return (
    <div>
      Home {bears}
      <div>
        <Button onClick={increasePopulation}>增加</Button>
      </div>
    </div>
  );
};

export default Home;
