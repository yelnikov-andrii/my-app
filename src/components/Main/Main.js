import { Messages } from '../Messages/Messages';
import {useState} from 'react';
import './Main.scss';

export const Main = ({amount}) => {
  const [selectedTab, setSelectedTab] = useState('unread');
  const [addToArchive, setAddToArchive] = useState(false);
  const [deletePerson, setDeletePerson] = useState(false);
  const [inputedValue, setInputedValue] = useState('');

  const onAdd = () => {
    setAddToArchive(false);
  }

  const onDelete = () => {
    setDeletePerson(false)
  }

  return (
    <main
      className="main"
    >
      <form
      className="form"
    >
      <ul
        className="form__list"
      >

      <button
      style={{color: "red"}}
      className="button"
      onClick={(event) => {
        event.preventDefault();
        setDeletePerson(true);
      }}
    >
      Удалить
    </button>

    <button
      style={{color: "white"}}
      className="button"
      onClick={(event) => {
        event.preventDefault();
        setAddToArchive(true);
      }}
    >
      Добавить в архив
    </button>
      </ul>
      <ul
        className="form__list"
      >
        <button
      style={{color: "orange"}}
      className={selectedTab === 'unread' ? 'button button--active' : 'button'}
      onClick={(event) => {
        event.preventDefault();
        setSelectedTab('unread');
      }}
    >
      Непрочитанное
    </button>

    <button
      style={{color: "grey"}}
      className={selectedTab === 'archive' ? 'button button--active' : 'button'}
      onClick={(event) => {
        event.preventDefault();
        setSelectedTab('archive');
      }}
    >
      Архив
      </button>
    </ul>
      <input 
        placeholder="Искать &rarr;"
        className="form__input"
        value={inputedValue}
        onChange={(event) => {
          setInputedValue(event.target.value);
        }}
      />
    </form>
      <Messages
        selectedTab={selectedTab}
        addToArchive={addToArchive}
        onAdd={onAdd}
        deletePerson={deletePerson}
        onDelete={onDelete}
        inputedValue={inputedValue}
      />
    </main>
    
  )
}