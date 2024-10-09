/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import Loader from "./Loader";

const List = ({ data, loading, error }) => {
  if (data === null) return null;
  if (error) return <p>Sorry! nothing found.</p>;

  //loading for the first time.
  if (loading && data.length === 0) return <p>Loading...</p>;

  return (
    <ul className="p-2 flex flex-col gap-2">
      {data.map((item, index) => (
        <li key={index} className="text-sm max-w-[200px]">
          {item.title}
        </li>
      ))}
      {loading && data.length > 0 && <Loader />}
    </ul>
  );
};

export default List;
