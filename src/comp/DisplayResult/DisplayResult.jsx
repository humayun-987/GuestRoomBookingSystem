import React, { useEffect, useState } from "react";
import result from './Net.json';
import "./Result.css";
import Navbar from "../Navbar";
import Footer from "../footer";

function ResultTable() {
    const [Pool, setPool] = useState("Pool Little Champs");
    const [data, setData] = useState(result[Pool]);
    const [currentPageData, setCurrentPageData] = useState(data.slice(0, 10));
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setCurrentPageData(data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
    }, [data, currentPage, itemsPerPage]);

    const changePage = (page) => {
        setCurrentPageData(data.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage));
    };

    const changePageLeft = () => {
        if (currentPage > 0) {
            changePage(currentPage - 1);
            setCurrentPage(currentPage - 1);
        }
    };

    const changePageRight = () => {
        if (currentPage < data.length / itemsPerPage - 1) {
            changePage(currentPage + 1);
            setCurrentPage(currentPage + 1);
        }
    };

    const changeItemsPerPage = (e) => {
        setItemsPerPage(Number(e.target.value));
        changePage(0);
        setCurrentPage(0);
    };

    const changePool = (e) => {
        setItemsPerPage(10);
        setPool(e.target.value);
        setData(result[e.target.value]);
        changePage(0);
        setCurrentPage(0);
    };

    return (
        <>
        <Navbar/>
        <div className="result-table">
            <div className="result-table-header">
                <h1 className="result-table-header-text">Result</h1>
                <div className="result-table-header-select">
                    <select className="result-table-header-select-pool" onChange={changePool}>
                        <option value="Pool Little Champs">Pool Little Champs</option>
                        <option value="Pool Super Nova">Pool Super Nova</option>
                        <option value="The Titans">The Titans</option>
                        <option value="Elite Explorers">Elite Explorers</option>
                    </select>
                    <select className="result-table-header-select-items" value={itemsPerPage} onChange={changeItemsPerPage}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value={`${data.length}`}>All</option>
                    </select>
                </div>
            </div>
            <div className="result-table-body">
                <table className="result-table-body-table">
                    <thead>
                        <tr>
                            <th>S.I no.</th>
                            <th>Name</th>
                            
                            <th>School name</th>
                            <th>State</th>
                            <th>Percentage Obtained (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((item, index) => (
                            <tr key={index}>
                                <td>{item["S.I no."]}</td>
                                <td>{item["Name"]}</td>
                                
                                <td>{item["School name"]}</td>
                                <td>{item["State"]}</td>
                                <td>{item["Percentage Obtained (%)"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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
        <Footer/>
        </>
    );
}

export default ResultTable;
