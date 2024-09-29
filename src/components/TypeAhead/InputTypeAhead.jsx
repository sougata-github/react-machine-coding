/* This is basically an autocomplete search-box */

import DropDown from "./DropDown";
import { useState } from "react";
import { useFetchName } from "./useFetchName";
import { transformData } from "../../../utils";

const InputTypeAhead = () => {
  const [query, setQuery] = useState("");
  const [apiQuery, setApiQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropDown] = useState(false);

  const promise = async (query) =>
    await fetch(`https://swapi.dev/api/people/?search=${query}`);

  const [data, setData, error, loading] = useFetchName(
    apiQuery,
    transformData,
    promise,
    200
  );

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      if (activeIndex === -1) return;

      setData(null);
      setActiveIndex(-1);
      setQuery(data[activeIndex].name);
    } else if (e.keyCode === 40) {
      if (activeIndex === -1 || activeIndex === data.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex((prev) => prev + 1);
      }
    } else if (e.keyCode === 38) {
      if (activeIndex === null || activeIndex === 0) {
        setActiveIndex(data.length - 1);
      } else {
        setActiveIndex((prev) => prev - 1);
      }
    }
  };

  const handleChange = (value) => {
    setQuery(value);
    setApiQuery(value);
    setShowDropDown(true);

    if (value.trim() === "") {
      setShowDropDown(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 h-[600px]">
      <h1 className="text-2xl font-medium">Enter Name</h1>

      <input
        className="border border-black/20 p-4 rounded-lg w-[400px] focus:outline-none"
        placeholder="Enter name to search"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        onKeyUp={handleKeyUp}
      />

      {showDropdown && (
        <DropDown
          list={data}
          error={error}
          loading={loading}
          setData={setData}
          setQuery={setQuery}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
    </div>
  );
};

export default InputTypeAhead;
