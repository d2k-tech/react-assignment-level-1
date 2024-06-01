import React, { useEffect, useState } from "react";
import "./home.css"; 
import data from ".././asset/userData";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showingEntries, setShowingEntries] = useState([]);
  const entriesPerPage = 10;

  const [searchQuery, setSearchQuery] = useState("");


  const filteredData = data.filter(
    (entry) =>
      entry.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const entryHeading = ["First Name", "Last Name", "Age", "Email", "Web"];

 
  return (
    
    <div className="wrapper">
        
      <h1>Users</h1>
      <div className="search_box">
        
      <input
      className="input_box"
        type="text"
        placeholder="Search by first or last name"
      
      />
     
      </div>
     
      <table>
        <thead>
          <tr>
            {entryHeading.map((heading, index) => (
              <th
                key={index}
               
              >
                <div class="heading">
                  {heading}
                
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((entry, index) => (
            <tr key={index}>
              <td
                
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
     
    </div>
  );
};

export default HomePage;
