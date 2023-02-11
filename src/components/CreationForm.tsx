import React from 'react';

const CreationForm: React.FC<{
  formChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleFormSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  category: string;
  description: string;
  date: string;
}> = (props) => {
  return (
    <form onSubmit={props.handleFormSubmit}>
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={props.category}
          onChange={props.formChangeHandler}
        />
      </label>

      <label>
        Description:
        <input
          type="text"
          name="description"
          value={props.description}
          onChange={props.formChangeHandler}
        />
      </label>

      <label>
        Date:
        <input
          type="date"
          name="date"
          value={props.date}
          onChange={props.formChangeHandler}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreationForm;
