import React from "react";
import SearchBar from "../SearchBar/SearchBar";

const Header = () => {
  return (
    <div>
      <div>
        <h1>
            <span className="text-secondary-dark">B</span>
            <span className="text-primary">Social</span>
        </h1>
      </div>
      <SearchBar />
    </div>
  );
};

export default Header;
