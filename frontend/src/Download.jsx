import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

function Download() {
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDownloadLogs = () => {
    setShowConfirmation(true);
  };

  const confirmDownload = () => {
    fetch(
      `${
        import.meta.env.REACT_APP_API_BASE_URL
      }/logs/all?startDate=${startDate}&endDate=${endDate}`
    )
      .then((response) => response.json())
      .then((logs) => {
        const processedLogs = logs.map((log) => ({
          ...log,
          students: log.students.join(", "),
        }));

        const worksheet = XLSX.utils.json_to_sheet(processedLogs);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");
        XLSX.writeFile(workbook, "logs.xlsx");
        setShowConfirmation(false);
      })
      .catch((error) => console.error("Error fetching logs:", error));
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };
  return (
    <>
      <section className="relative h-[88svh]">
        <div className="w-full flex justify-center items-center gap-5 mt-5 p-4">
          <div className="relative w-fit">
            <label htmlFor="from" className="font-bold">
              From :
            </label>
            <input
              id="from"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent border border-mybl rounded-lg px-2 w-fit"
            />
          </div>
          <div className="relative w-fit">
            <label htmlFor="to" className="font-bold">
              To :
            </label>
            <input
              id="to"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent border border-mybl rounded-lg px-2 w-fit"
            />
          </div>
          <button
            type="button"
            className="bg-mybl px-4 py-2 rounded-lg block  text-white h-fit"
            onClick={handleDownloadLogs}
          >
            Excel
          </button>
        </div>
      </section>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-5 rounded-lg text-black">
            <h3 className="mb-4">Confirm Download</h3>
            <p>
              Are you sure you want to download logs between {startDate} and{" "}
              {endDate}?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="bg-mybl bg-opacity-75 px-4 py-2 rounded-lg text-white"
                onClick={confirmDownload}
              >
                Confirm
              </button>
              <button
                type="button"
                className="bg-slate-500 px-4 py-2 rounded-lg text-white"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Download;
