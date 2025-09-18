import React, { useEffect, useState } from "react";
import eliteData from "./Elite Explorers.json";
import champsData from "./Little Champs.json";
import novaData from "./Super Nova.json";
import titansData from "./The Titans.json";
function ResultTable() {
    const pools = {
        "Little Champs": champsData,
        "Super Nova": novaData,
        "The Titans": titansData,
        "Elite Explorers": eliteData,
    };

    const poolNames = Object.keys(pools);

    const [pool, setPool] = useState("Little Champs");
    const [data, setData] = useState(pools[pool]);
    const [currentPageData, setCurrentPageData] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [showTopButton, setShowTopButton] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [searchID, setSearchID] = useState("");

    useEffect(() => {
        setData(pools[pool]);
        setCurrentPage(0);
        setSearchName("");
        setSearchID("");
    }, [pool]);

    const filteredData = data.filter(
        (student) =>
            student["STUDENT NAME"].toLowerCase().includes(searchName.toLowerCase()) &&
            student["# ID NO"].toString().includes(searchID)
    );

    useEffect(() => {
        setCurrentPageData(
            filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        );
    }, [filteredData, currentPage, itemsPerPage]);

    const changePage = (page) => {
        setCurrentPageData(
            filteredData.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
        );
    };

    const changePageLeft = () => {
        if (currentPage > 0) {
            changePage(currentPage - 1);
            setCurrentPage(currentPage - 1);
        }
    };

    const changePageRight = () => {
        if (currentPage < Math.ceil(filteredData.length / itemsPerPage) - 1) {
            changePage(currentPage + 1);
            setCurrentPage(currentPage + 1);
        }
    };

    const changeItemsPerPage = (e) => {
        setItemsPerPage(Number(e.target.value));
        changePage(0);
        setCurrentPage(0);
    };

    const scrollToTop = () => {
        const tableWrapper = document.getElementById("table-wrapper");
        if (tableWrapper) tableWrapper.scrollTop = 0;
    };

    // Top 3 Students
    const topThree = [...data].sort((a, b) => a.RANK - b.RANK).slice(0, 3);


    return (
        <div className="h-screen w-screen flex justify-center items-center p-4">
            <div className="w-full max-w-7xl h-full flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        📊 Results
                    </h1>

                    {/* Pool Buttons */}
                    <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                        {poolNames.map((poolName) => (
                            <button
                                key={poolName}
                                onClick={() => setPool(poolName)}
                                className={`px-3 py-1 md:px-4 md:py-2 rounded-lg font-medium text-sm md:text-base transition ${pool === poolName
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {poolName}
                            </button>
                        ))}
                    </div>

                    {/* Items per page & Filters */}
                    <div className="flex gap-2 md:gap-3 mt-2 md:mt-0 flex-wrap">
                        <select
                            className="px-2 py-1 md:px-3 md:py-2 text-sm md:text-base rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                            value={itemsPerPage}
                            onChange={changeItemsPerPage}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value={`${filteredData.length}`}>All</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            className="px-4 py-2 md:px-3 md:py-2 text-sm md:text-base rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            placeholder="Search by ID..."
                            value={searchID}
                            onChange={(e) => setSearchID(e.target.value)}
                            className="px-4 py-2 md:px-3 md:py-2 text-sm md:text-base rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                </div>

                {/* Top 3 Compact & Scrollable Winner Cards */}
                <div className="flex overflow-x-auto gap-3 p-4">
                    {topThree.map((student, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 flex flex-col items-center justify-center p-2 rounded-xl shadow-xl transition transform hover:scale-105 w-36 
        ${index === 0
                                    ? "bg-gradient-to-tr from-pink-500 to-purple-600 text-white"
                                    : index === 1
                                        ? "bg-gradient-to-tr from-blue-500 to-cyan-500 text-white"
                                        : "bg-gradient-to-tr from-lime-400 to-teal-500 text-white"
                                }`}
                        >
                            <div className="text-2xl mb-1">
                                {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                            </div>
                            <h2 className="font-semibold text-center text-sm truncate">
                                {student["STUDENT NAME"]}
                            </h2>
                            <p className="text-xs mt-1 text-center">
                                ID: {student["# ID NO"]} | Total: {student["TOTAL MARKS"]}
                            </p>
                            <p className="mt-1 font-bold text-xs">Rank #{student.RANK}</p>
                        </div>
                    ))}
                </div>

                {/* Scrollable & Responsive Table */}
                <div
                    id="table-wrapper"
                    className="flex-1 overflow-y-auto overflow-x-auto border-t border-b"
                    onScroll={(e) => setShowTopButton(e.target.scrollTop > 200)}
                >
                    <table className="w-full min-w-[700px] border-collapse text-sm">
                        <thead className="bg-blue-600 text-white sticky top-0 z-10">
                            <tr>
                                <th className="py-3 px-4 text-left">ID No.</th>
                                <th className="py-3 px-4 text-left">Student Name</th>
                                <th className="py-3 px-4 text-left">Sports Trivia</th>
                                <th className="py-3 px-4 text-left">Quantitative Aptitude</th>
                                <th className="py-3 px-4 text-left">Logical Reasoning</th>
                                <th className="py-3 px-4 text-left">Verbal Ability</th>
                                <th className="py-3 px-4 text-left">Total Marks</th>
                                <th className="py-3 px-4 text-left">Rank</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="odd:bg-gray-50 hover:bg-blue-50 transition"
                                >
                                    <td className="py-2 px-4">{item["# ID NO"]}</td>
                                    <td className="py-2 px-4 font-medium text-gray-700">
                                        {item["STUDENT NAME"]}
                                    </td>
                                    <td className="py-2 px-4">{item["SPORTS-TRIVIA"]}</td>
                                    <td className="py-2 px-4">{item["QUANTITATIVE-APTITUDE"]}</td>
                                    <td className="py-2 px-4">{item["LOGICAL-REASONING"]}</td>
                                    <td className="py-2 px-4">{item["VERBAL-ABILITY"]}</td>
                                    <td className="py-2 px-4 font-semibold text-blue-600">
                                        {item["TOTAL MARKS"]}
                                    </td>
                                    <td className="py-2 px-4">{item["RANK"]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center p-4">
                    <p className="text-gray-600 text-sm mb-3 md:mb-0">
                        Showing {currentPageData.length} of {filteredData.length} entries
                    </p>
                    <div className="flex gap-3">
                        <button
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                            onClick={changePageLeft}
                            disabled={currentPage === 0}
                        >
                            ◀ Prev
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                            onClick={changePageRight}
                            disabled={currentPage >= Math.ceil(filteredData.length / itemsPerPage) - 1}
                        >
                            Next ▶
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultTable;
