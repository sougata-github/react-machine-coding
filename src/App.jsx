// import Password from "./components/password-checker/Password";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";

// import Otp from "./components/Otp";
// import Chart from "./components/Chart";
// import Modal from "./components/modal/Modal";
// import LikeButton from "./components/LikeButton";
// import GridLights from "./components/GridLights";
// import Pagination from "./components/Pagination";
// import ProgressBar from "./components/ProgressBar";
// import Comment from "./components/comments/Comment";
// import TrafficLights from "./components/TrafficLights";
// import FileTree from "./components/file-tree/FileTree";
// import CountDownTimer from "./components/CountDownTimer";
// import HolyGrailLayout from "./components/HolyGrailLayout";
// import InputTypeAhead from "./components/input-typeahead/InputTypeAhead";
// import InfiniteScroll from "./components/infinite-scroll/InfiniteScroll";
// import DragDrop from "./drag-drop";
import FileUploader from "./components/file-uploads/FileUploader";

// import DataTable from "./components/resuable-components/DataTable";
// import { tableData } from "./data";

// const columns = [
//   { key: "id", header: "ID" },
//   { key: "name", header: "Name" },
//   {
//     key: "email",
//     header: "Email",
//     render: (value) => (
//       <a href={`mailto:${value}`} className="text-blue-500 underline">
//         {value}
//       </a>
//     ),
//   },
//   { key: "role", header: "Role" },
// ];

function App() {
  return (
    // <>
    //   <HolyGrailLayout />
    // </>
    <Router>
      <main className="flex flex-col min-h-screen w-full items-center justify-center">
        {/* <Otp /> */}
        {/* <Chart /> */}
        {/* <ProgressBar /> */}
        {/* <TrafficLights /> */}
        {/* <Comment /> */}
        {/* <Modal /> */}
        {/* <InputTypeAhead /> */}
        {/* <InfiniteScroll /> */}
        {/* <CountDownTimer /> */}
        {/* <FileTree /> */}
        {/* <Pagination /> */}
        {/* <GridLights /> */}
        {/* <LikeButton /> */}
        {/* <DragDrop /> */}
        <FileUploader />
        {/* <Password /> */}
        {/* <DataTable columns={columns} data={tableData} /> */}

        {/* todo:
      react hook form with validation
      sorting & filtering */}
      </main>
    </Router>
  );
}

export default App;
