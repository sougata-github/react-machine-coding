// import Otp from "./components/Otp";
// import Chart from "./components/Chart";
// import Modal from "./components/modal/Modal";
// import ProgressBar from "./components/ProgressBar";
// import Comment from "./components/comments/Comment";
// import TrafficLights from "./components/TrafficLights";
// import CountDownTimer from "./components/CountDownTimer";
// import HolyGrailLayout from "./components/HolyGrailLayout";
import FileExplorer from "./components/file-explorer/FileExplorer";
// import InputTypeAhead from "./components/input-typeahead/InputTypeAhead";
// import InfiniteScroll from "./components/infinite-scroll/InfiniteScroll";

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
      {/* <InfiniteScroll /> */}
      {/* <CountDownTimer /> */}
      <FileExplorer />

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
