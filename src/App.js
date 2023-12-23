import "./App.css";
import { useState } from "react";
import { useImmer } from "use-immer";
import { data } from "./data.js";
import MyHeader from "./myHeader.js";
import MyFooter from "./myFooter.js";

function Filters({ list, onCheckedChange, handleTypeToggle }) {
  const rows = [];
  let lastType = null;
  list.map((searchEngine, index) => {
    if (searchEngine.type !== lastType) {
      rows.push(
        <div>
          <button
            onClick={() => {
              handleTypeToggle(searchEngine.type);
            }}
            className="searchType button-65"
          >
            {searchEngine.type}
          </button>
        </div>
      );
    }
    lastType = searchEngine.type;
    rows.push(
      <>
        <label>
          <img
            src={searchEngine.icon}
            width={20}
            height={20}
            alt={"favicon of " + searchEngine.siteName}
          />
          <input
            type="checkbox"
            checked={searchEngine.checked}
            onChange={(e) => {
              onCheckedChange(e.target.checked, index);
            }}
          ></input>
          {searchEngine.siteName}
        </label>
      </>
    );
  });
  return <div className="filters">{rows}</div>;
}

export default function App() {
  const [list, updateList] = useImmer(data);
  // const [filtersChecked, setFiltersChecked] = useState(
  //   Array(data.length).fill(false)
  // );
  function handleSearch(filtersChecked) {}
  function handleTypeToggle(type) {
    updateList((draft) => {
      const newList = draft.slice();
      newList.map((site) => {
        const newSite = site;
        if (site.type === type) {
          newSite.checked = !newSite.checked;
        }
        return newSite;
      });
    });
  }
  function handleCheck(e, index) {
    updateList((draft) => {
      const newList = draft.slice();
      newList[index].checked = e;
    });
    // const nextFiltersChecked = filtersChecked.slice();
    // nextFiltersChecked[index] = e;
    // setFiltersChecked(nextFiltersChecked);
  }
  return (
    <div className="App">
      <MyHeader />
      <main>
        <div className="searchBox">
          <input autoFocus type="text"></input>
          <button onClick={handleSearch}>Search</button>
        </div>
        <Filters
          list={list}
          onCheckedChange={handleCheck}
          handleTypeToggle={handleTypeToggle}
        />
      </main>
      <MyFooter />
    </div>
  );
}
