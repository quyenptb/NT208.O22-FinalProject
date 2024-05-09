import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './App.css';
import { UniProvider } from './App';
import { uniContext } from './App';

function DropDownCustom({ toggle, listItems, onSelect }) {
    const {dahoHelping, setDahoHelping, currentUser, setCurrentUser, choosenUni, setChoosenUni, choosenFal, setChoosenFal, choosenSub, setChoosenSub, fal, setFal, maj, setMaj, uni, setUni, sub, setSub} = useContext(uniContext);

  const [value, setValue] = useState(toggle);

  const handleChoice = selectedItem => {
    setValue(selectedItem);
    onSelect(selectedItem);
    if (toggle === "Trường Đại học") {
      setChoosenUni(selectedItem);
    }
  };

  return (
    <DropdownButton title={value} id="dropdown-basic">
        {Array.isArray(listItems) && listItems.map(item => (
  <Dropdown.Item key={item.id} onClick={() => handleChoice(item.name)}>
    {item.name}
  </Dropdown.Item>
))}
    </DropdownButton>
  );
}

function FilterDropdown() {
  const {filterState, setFilterState, dahoHelping, setDahoHelping, currentUser, setCurrentUser, choosenUni, setChoosenUni, choosenFal, setChoosenFal, choosenSub, setChoosenSub, fal, setFal, maj, setMaj, uni, setUni, sub, setSub} = useContext(uniContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/filter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(filterState)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // setUni(data); // Update the cards with new data
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchData();
  }, [filterState]);

  const handleSelect = (dropdownName, selectedItem) => {
    setFilterState(prevState => ({
      ...prevState,
      [dropdownName]: selectedItem
    }));
  };

  return (
    <>
      <div className="btn-group">
        <DropDownCustom
          toggle="DahoHelping"
          listItems={dahoHelping}
          onSelect={item => handleSelect('DahoHelping', item)}
        />
        {filterState.DahoHelping === 'DahoHelping' && (
            <>
        <DropDownCustom
          toggle="Trường Đại học"
          listItems={uni}
          onSelect={item => handleSelect('Others', [item, null, null, null])}
        />
        <DropDownCustom
          toggle="Khoa"
          listItems={fal}
          onSelect={item => handleSelect('Others', [filterState.Others[0], item, null, null])}
        />
        <DropDownCustom
          toggle="Ngành"
          listItems={maj}
          onSelect={item => handleSelect('Others', [filterState.Others[0], filterState.Others[1], item, null])}
        />
        <DropDownCustom
          toggle="Môn"
          listItems={sub}
          onSelect={item => handleSelect('Others', [filterState.Others[0], filterState.Others[1], filterState.Others[2], item])}
        />
        </>
    )}
    </div>
    </>
    )
}

export default FilterDropdown;
