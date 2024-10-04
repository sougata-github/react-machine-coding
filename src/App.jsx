// import Otp from "./components/Otp";
// import Chart from "./components/Chart";
// import Modal from "./components/modal/Modal";
// import ProgressBar from "./components/ProgressBar";
// import Comment from "./components/comments/Comment";
// import TrafficLights from "./components/TrafficLights";
// import HolyGrailLayout from "./components/HolyGrailLayout";
// import InputTypeAhead from "./components/TypeAhead/InputTypeAhead";
import InfiniteScroll from "./components/InfiniteScroll/InfiniteScroll";

import "./App.css";

function App() {
  return (
    // <>
    //   <HolyGrailLayout />
    // </>

    <main className="flex flex-col h-screen w-full items-center justify-center">
      {/* <Otp /> */}
      {/* <Chart /> */}
      {/* <ProgressBar /> */}
      {/* <TrafficLights /> */}
      {/* <Comment /> */}
      {/* <Modal /> */}
      {/* <InputTypeAhead /> */}
      <InfiniteScroll />

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
