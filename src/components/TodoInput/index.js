import React from 'react';


export default function TodoInput({ submitted, changed, value }) {
  return (
    <form className="todolist-control" onSubmit={submitted}>
      <input
        type="text"
        placeholder="What do you have to do?"
        value={value}
        onChange={changed}
      />
      <input className="btn btn-primary" type="submit" value="ADD" />
    </form>
  );
}
