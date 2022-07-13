/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Pagination } from "../Pagination/Pagination";
import { getPeople } from "../api";
import user_svg from '../../img/user-filled-white.svg';
import './Messages.scss';

export const Messages = ({
  selectedTab,
  addToArchive,
  onAdd,
  deletePerson,
  onDelete,
  inputedValue,
}) => {
  const urlPeople
= 'https://mate-academy.github.io/react_people-table/api/people.json';
  const [people, setPeople] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [archiveItems, setArchiveItems] = useState([]);
  const [checkedPeople, setCheckedPeople] = useState([]);
  let total = people.length;

    useEffect(() => {
      if (deletePerson) {
        setPeople(prev => {
          const names = checkedPeople.map(person => person.name);
    
          return prev.filter(el => !names.includes(el.name));
        });
      }
      onDelete();
    }, [deletePerson])

  const lastItem = selectedPage * 8;
  const firstItem = lastItem - 8;
  let pageContent = people;
  if (selectedTab === 'unread') {
    pageContent = people;
  }

  if (selectedTab === 'archive') {
    pageContent = archiveItems;
    total = archiveItems.length;
  }

  let currentContent = pageContent.slice(firstItem, lastItem);

  useEffect(() => {
    getPeople(urlPeople)
      .then(peopleFromServer => {
        setPeople(peopleFromServer.filter(person => person.name.toUpperCase().includes(inputedValue.toUpperCase())));
      });
  },[inputedValue]);

  useEffect(() => {
      if (addToArchive) {
        setArchiveItems(prev => {
            return [...prev, ...checkedPeople]
        });
        const names = checkedPeople.map(person => person.name);

        setPeople(prev => prev.filter(person => !names.includes(person.name)));
      }

      setCheckedPeople([]);
      onAdd();

  }, [addToArchive]);

  console.log(archiveItems)
  console.log(addToArchive);

  useEffect(() => {
    pageContent = people;
  },[selectedPage]);

  if (currentContent.length === 0) {
    return (
      <nav className="messages">
        <ul className="messages__row">
          <li className="messages__name">
            Where is the content?
          </li>
        </ul>
      </nav>
    )
  }

  return (
    <>
    <nav 
      className="messages"
    >
      {currentContent.map((person) => (
        <ul
          className="messages__row"
          key={person.slug}
        >
          <label>
        <li
          className={checkedPeople.some(human => human.name === person.name) ?
            "messages__name messages__name--active" :
            "messages__name" }
          key={person.slug}
        >
          
                <input
                  type="checkbox"
                  readOnly
                  checked={true ? checkedPeople.some(human => human.name === person.name) : false}
                  onChange={() => {
                    setCheckedPeople(prev => {
                      if (prev.some(el => el.name === person.name)) {
                        return prev.filter(el => el.name !== person.name);
                      } else {
                        return [...prev, person];
                      }
                    });
                  }}
                />
            <span
              className="messages__img">
            <img 
              src={user_svg}
              alt="user-icon"
              className="messages__img-image"
            />
            </span>
               
            {person.name}
        </li>
        </label>
        <li
          className={checkedPeople.some(human => human.name === person.name) ?
            "messages__parents messages__parents--active" :
            "messages__parents" }
          key={person.slug}
        >
          {person.fatherName || person.motherName}
        </li>
        <li
          className={checkedPeople.some(human => human.name === person.name) ?
            "messages__born messages__born--active" :
            "messages__born" }
        >
          {person.born}
        </li>
        </ul>
      ))}
    </nav>

    <Pagination
      total={total}
      onSelect={setSelectedPage}
    />
    </>
  )
}