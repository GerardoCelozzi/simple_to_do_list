import React from 'react';
import '../../App.css'

const TodoList = ({
  items = [],
  todoClicked = () => {},
  clearClicked = () => {},
  deleteClicked = () => {}
}) => {
  return (
    <>
      <ul className="todolist">
        {items.map((item, index) => (
          <li key={item.id} className={item.completed ? 'is--completed' : ''}>
            <button
              onClick={() => {
                todoClicked(index);
              }}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="todolist-actions">
        <button
          className="btn btn-secondary"
          onClick={clearClicked}
          disabled={!items.some(item => item.completed)}
        >
          CLEAR COMPLETED
        </button>
        <button className="btn btn-primary" onClick={deleteClicked}>
          DELETE ALL
        </button>
      </div>
    </>
  );
};

export default React.memo(TodoList);
