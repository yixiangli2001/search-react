import "./App.css";
import { useState } from "react";
import { useImmer } from "use-immer";
import { data } from "./data.js";
import MyHeader from "./myHeader.js";
import MyFooter from "./myFooter.js";

// checkbox
function MyCheckbox({ id, type, checked, onChange }) {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
        className={type}
      ></input>
    </>
  );
}
// checkbox + label + image
function SearchEngine({ onChange, searchEngine }) {
  return (
    <>
      <MyCheckbox
        id={searchEngine.id}
        type={searchEngine.type}
        checked={searchEngine.checked}
        onChange={(e) => onChange(e, searchEngine.id)}
      />
      <label for={searchEngine.id}>
        {searchEngine.siteName}
        <img
          class="siteIcon"
          src={searchEngine.icon}
          alt={"icon of " + searchEngine.siteName}
        />
      </label>
    </>
  );
}
// one type of searchEngines
function SearchEngines(toggleGroup, toggleOne, list, type) {
  return (
    <>
      <div>
        <button
          onClick={() => {
            toggleGroup(type);
          }}
          className="searchType button-65"
        >
          {type}
        </button>
      </div>
      {list.map((site) => {
        return <SearchEngine searchEngine={site} onChange={toggleOne} />;
      })}
    </>
  );
}

// function Filters({ list, searchType, onCheckedChange, handleTypeToggle }) {
//   const rows = [];

//   rows.push(
// <div>
//   <button
//     onClick={() => {
//       handleTypeToggle(list.type);
//     }}
//     className="searchType button-65"
//   >
//     {list.type}
//   </button>
// </div>
//   );
//   list.map((searchEngine, index) => {
//     lastType = searchEngine.type;
//     rows.push(
//       <>
//         <label>
//           <img
//             src={searchEngine.icon}
//             width={20}
//             height={20}
//             alt={"favicon of " + searchEngine.siteName}
//           />
//           <input
//             type="checkbox"
//             checked={searchEngine.checked}
//             onChange={(e) => {
//               onCheckedChange(e.target.checked, index);
//             }}
//           ></input>
//           {searchEngine.siteName}
//         </label>
//       </>
//     );
//   });
//   return <div className="Filter">{rows}</div>;
// }

export default function App() {
  const [list, updateList] = useImmer(data);
  function handleSearch(FilterChecked) {}

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
  }

  function getType(type) {
    return list.filter((site) => site.type === type);
  }

  return (
    <div className="App">
      <MyHeader />
      <main>
        <div className="searchBox">
          <input autoFocus type="text"></input>
        </div>
        <SearchEngines
          list={list}
          type="images"
          toggleOne={handleCheck}
          toggleGroup={handleTypeToggle}
        />
      </main>
      <MyFooter />
    </div>
  );
}
