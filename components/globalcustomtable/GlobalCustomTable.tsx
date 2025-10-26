"use client";
import React from "react";

interface TableColumn {
  key: string;
  label: string;
}

interface GlobalTableProps {
  columns: TableColumn[];
  data: Record<string, string | number>[];
  maxHeight?: string; 
  invoiceComp?: boolean;
  footerValues?: { label: string; value: number }[];
}

const GlobalCustomTable: React.FC<GlobalTableProps> = ({
  columns,
  data,
  maxHeight = "600px",
  invoiceComp = false,
  footerValues,
}) => {
  return (
    <div className="w-full border border-gray-700 rounded-lg shadow-md overflow-hidden">
  {/* Table Header */}
  <div className="bg-gray-800 font-semibold text-gray-200">
    <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
      {columns.map((col) => (
        <div
          key={col.key}
          className="p-3 text-sm border-b border-gray-700 truncate"
        >
          {col.label}
        </div>
      ))}
    </div>
  </div>

  {/* Table Body */}
 {/* Body */}
      <div className="overflow-y-auto text-sm" style={{ maxHeight: maxHeight }}>
        {data.length > 0 ? (
          data.map((row, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] ${
                idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
              } hover:bg-gray-700 transition`}
            >
              {columns.map((col) => (
                <div
                  key={String(col.key)}
                  className="p-2 border-b border-gray-700 truncate"
                >
                  {col.render ? col.render(row, idx, data) : row[col.key] ?? "-"}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-400">No data available</div>
        )}
      </div>

   {invoiceComp && footerValues.length > 0 && (
        <div className="bg-gray-900 text-gray-200 font-semibold">
          {footerValues?.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))]"
            >
              <div className="p-3 border-t border-gray-700">
                <p>{row.label}</p>
              </div>
              <div className="p-3 border-t border-gray-700">
                <p>{row.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}
</div>

  );
};

export default GlobalCustomTable;
