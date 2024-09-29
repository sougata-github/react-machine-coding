// import Otp from "./components/Otp";
// import Chart from "./components/Chart";
// import Modal from "./components/modal/Modal";
// import ProgressBar from "./components/ProgressBar";
// import Comment from "./components/comments/Comment";
// import TrafficLights from "./components/TrafficLights";
import InputTypeAhead from "./components/TypeAhead/InputTypeAhead";

import "./App.css";

function App() {
  return (
    <main className="max-w-xl flex flex-col h-full w-full">
      {/* <Otp /> */}
      {/* <Chart /> */}
      {/* <ProgressBar /> */}
      {/* <TrafficLights /> */}
      {/* <Comment /> */}
      {/* <Modal /> */}
      <InputTypeAhead />

      {/* todo:
      react hook form with validation
      sorting & filtering
      pagination
      infinite-scroll
      render on search
      debouce and search
      input search(typeahead)  */}
    </main>
  );
}

export default App;
