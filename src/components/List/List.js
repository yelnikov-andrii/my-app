import './List.scss';

export const List = ({ content }) => {
  return (
    <ul
      className="list"
    >
      {content.map((header) => (
        <li
          className="list__item"
          key={header}
        >
          {header}
        </li>
      ))}
    </ul>
  )
};