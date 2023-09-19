import { Spin } from "antd";
const style = {
  margin: "20px 0",
  marginBottom: "20px",
  padding: "30px 50px",
  textAlign: "center",
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: "4px",
};
const Loading = () => (
  <div className="example" style={style}>
    <Spin />
  </div>
);
export default Loading;
