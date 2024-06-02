import React, { useEffect, useState } from "react";
import "./home.css"; 
import data from ".././asset/userData";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWindow, setPageWindow] = useState([1, 5]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [showingEntries, setShowingEntries] = useState([]);
  const entriesPerPage = 10;

  const filteredData = data.filter(
    (entry) =>
      entry.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const entryHeading = ["First Name", "Last Name", "Age", "Email", "Web"];

  //search function
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

   //next function
  const handleNext = () => {
    if (pageWindow[1] < totalPages) {
      setPageWindow([pageWindow[0] + 5, pageWindow[1] + 5]);
      setCurrentPage(pageWindow[0] + 5);
    }
  };
  //previous function

  const handlePrevious = () => {
    if (pageWindow[0] > 1) {
      setPageWindow([pageWindow[0] - 5, pageWindow[1] - 5]);
      setCurrentPage(pageWindow[0] - 5);
    }
  };

  // sorting function
  const sortedData = currentEntries.sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    console.log(sortedData);
  };

  useEffect(() => {
    setShowingEntries(currentEntries);
    if (sortConfig.key) {
      setShowingEntries(sortedData);
    }
  }, []);

  const navigate = useNavigate();
  return (
    
    <div className="wrapper">
        
      <h1>Users</h1>
      <div className="search_box">
        
      <input
      className="input_box"
        type="text"
        placeholder="Search by first or last name"
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="search_icon">
              <img src={require(".././asset/magnifying-glass.png")}
              width={27}
              />
      </div>
      </div>
     
      <table>
        <thead>
          <tr>
            {entryHeading.map((heading, index) => (
              <th
                key={index}
                onClick={() =>
                  handleSort(heading.toLowerCase().replace(" ", "_"))
                }
              >
                <div class="heading">
                  {heading}
                  {sortConfig.key !==
                    heading.toLowerCase().replace(" ", "_") && (
                    <div class="arrow">
                      <img
                        src={require(".././asset/sortUp.png")}
                        alt="Sort Ascending"
                        width={10}
                        height={10}
                      />
                      <img
                        src={require(".././asset/sortDown.png")}
                        alt="Sort Ascending"
                        width={10}
                        height={10}
                      />
                    </div>
                  )}
                  {sortConfig.key === heading.toLowerCase().replace(" ", "_") &&
                    (sortConfig.direction === "asc" ? (
                      <div class="arrow">
                        <img
                          src={require(".././asset/colSortUp.png")}
                          alt="Sort Ascending"
                          width={10}
                          height={10}
                        />
                        <img
                          src={require(".././asset/sortDown.png")}
                          alt="Sort Ascending"
                          width={10}
                          height={10}
                        />
                      </div>
                    ) : (
                      <div class="arrow">
                        <img
                          src={require(".././asset/sortUp.png")}
                          alt="Sort descending"
                          width={10}
                          height={10}
                        />
                        <img
                          src={require(".././asset/colSortDown.png")}
                          alt="Sort descending"
                          width={10}
                          height={10}
                        />
                      </div>
                    ))}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((entry, index) => (
            <tr key={index}>
              <td
                onClick={() => {
                  navigate(`/users/${entry.id}`);
                }}
                style={{ cursor: "pointer" }}
              >
                {entry.first_name}
              </td>
              <td>{entry.last_name}</td>
              <td>{entry.age}</td>
              <td>{entry.email}</td>
             <td><a href={entry.web} target="_blank" rel="noopener noreferrer">
                {entry.web}
              </a></td> 
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {pageWindow[0] > 1 && <button onClick={handlePrevious}>&lt;</button>}
        {Array.from(
          { length: Math.min(5, totalPages - pageWindow[0] + 1) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(pageWindow[0] + index)}
              className={currentPage === pageWindow[0] + index ? "active" : ""}
            >
              {pageWindow[0] + index}
            </button>
          )
        )}
        {pageWindow[1] < totalPages && (
          <button onClick={handleNext}>&gt;</button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
