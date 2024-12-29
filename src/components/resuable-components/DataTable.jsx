/* eslint-disable react/prop-types */

// type Column = {
//     key: string;
//     header: string;
// }

// type DataTableProps = {
// data: Record<string,any>[];
// columns: Column[];
// }

//making it more resuable:
// type Column<T> = {
//     key: keyof T;
//     header: string;
//     render?: (value: T[keyof T]) => ReactNode;
// }
// type DataTableProps<T> = {
//     data: T[];
//     columns: Column<T>[];
// }
// type TableHeaderProps = {
//     columns: Column<T>[];
// }
// type TableRowProps<T> = {
//     row: T;
//     columns: Column<T>[];
// }

const DataTable = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <TableHeader columns={columns} />
        <tbody>
          {data.map((row) => (
            <TableRow key={row.id} row={row} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

function TableHeader({ columns }) {
  return (
    <thead>
      <tr className="bg-gray-100">
        {columns.map((column) => (
          <th key={column.key} className="border p-2">
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableRow({ row, columns }) {
  return (
    <tr>
      {columns.map((column) => (
        <td key={column.key} className="px-4 border">
          {column.render ? column.render(row[column.key]) : row[column.key]}
        </td>
      ))}
    </tr>
  );
}

export default DataTable;
