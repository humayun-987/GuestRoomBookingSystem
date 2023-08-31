import React, { useEffect, useState } from "react";
import result from './Net.json';
import "./Result.css"
// Exam result data for 4 different pools Champions, Rising Stars, Youngsters, Pioneers is stored in Net.json file
// show the table of result of all 4 pools showing       "Sl No.": "1",
//   "Overall Rank",
//   "Candidate Name",
//   "Username",
//   "Percentage",
//   "School"; for each participant
// use pagination to show 10 participants per page initially. start







function ResultTable() {
    const [Pool, setPool] = useState("Youngsters");
    const [data, setData] = useState(result[Pool]);
    const [currentPageData, setCurrentPageData] = useState(data.slice(0, 10));
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState("");
    useEffect(() => {
        setCurrentPageData(data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
    }, [data, currentPage, itemsPerPage]);


    const changePage = (page) => {
        console.log(page, itemsPerPage, "page");
        setCurrentPageData(data.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage));
        console.log(currentPageData, "current page data");
    }

    const changePageLeft = () => {
        if (currentPage > 0) {
            changePage(currentPage - 1);
            setCurrentPage(currentPage - 1);
        }
    }

    const changePageRight = () => {
        if (currentPage < data.length / itemsPerPage - 1) {
            changePage(currentPage + 1);
            setCurrentPage(currentPage + 1);
        }
    }

    const changeItemsPerPage = (e) => {
        setItemsPerPage(e.target.value);
        console.log(e.target.value, itemsPerPage, "items per page");
        changePage(0);
        setCurrentPage(0);
    }

    const Searchitem = (e) => {
        setSearch(e.target.value);
        const search = e.target.value;
        const columns = data[0] && Object.keys(data[0]);
        const newdata = [];
        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            for (let j = 0; j < columns.length; j++) {
                if (row[columns[j]].toLowerCase().includes(search.toLowerCase())) {
                    newdata.push(row);
                    break;
                }
            }
        }
        setItemsPerPage(newdata.length)
        setCurrentPageData(newdata.slice(0, itemsPerPage));
        if(search===""){
            setData(result[Pool]);
            setItemsPerPage(10);
            setCurrentPageData(data.slice(0, 10));
        }

        setCurrentPage(0);
    }


    const changePool = (e) => {
        setSearch("");
        setItemsPerPage(10);
        setPool(e.target.value);
        if (e.target.value === "Champions") {
            setData(result["Champions"]);
        }
        else if (e.target.value === "Rising Stars") {
            setData(result["RisingStars"]);
        }
        else if (e.target.value === "Youngsters") {
            setData(result["Youngsters"]);
        }
        else if (e.target.value === "Pioneers") {
            setData(result["Pioneers"]);
        }
        changePage(0);
        setCurrentPage(0);
    }

    // Use inline styling
    return (
        <div className="result-table">
            <div className="result-table-header">
                <h1 className="result-table-header-text">Result</h1>
                <div className="result-table-header-select">
                    <input className="result-table-header-select-search" type="text" placeholder="Search" value={search} onChange={Searchitem} />
                    <select className="result-table-header-select-pool" onChange={changePool}>
                        <option value="Youngsters">Youngsters</option>
                        <option value="Rising Stars">Rising Stars</option>
                        <option value="Champions">Champions</option>
                        <option value="Pioneers">Pioneers</option>
                    </select>
                    <select className="result-table-header-select-items" value={itemsPerPage}  onChange={changeItemsPerPage}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">150</option>
                    </select>
                </div>
            </div>
            <div className="result-table-body">
                <table className="result-table-body-table">
                    <thead>
                        <tr>
                            <th>Overall Rank</th>
                            <th>Candidate Name</th>
                            <th>Username</th>
                            <th>Percentage</th>
                            <th>School</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((item, index) => (
                            <tr key={index}>
                                <td>{item["Overall Rank"]}</td>
                                <td>{item["Candidate Name"]}</td>
                                <td>{item["Username"]}</td>
                                <td>{item["Percentage"]}</td>
                                <td>{item["School"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* also show total entries and shown entries range */}

            <div>
                <p className="result-table-footer-text">Showing {currentPageData.length} of {data.length} entries</p>

            </div>

            <div className="result-table-footer">
                <div className="result-table-footer-left">
                    <button className="result-table-footer-left-button" onClick={changePageLeft}>{"<"}</button>
                </div>
                <div className="result-table-footer-right">
                    <button className="result-table-footer-right-button" onClick={changePageRight}>{">"}</button>
                </div>
            </div>
        </div>
    );

}
export default ResultTable;