import React from 'react';

const CreationForm: React.FC<{
  formChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleAddCard: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  category: string;
  description: string;
  date: string;
}> = (props) => {
  return (
    <div className="w-full flex justify-center mt-10 mb-10">
      <div className="w-11/12 sm:w-1/3 border-2 border-gray-200 rounded-md p-5">
        <form
          onSubmit={props.handleAddCard}
          className="flex flex-col gap-2"
        >
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="font-semibold mb-1"
            >
              Category
            </label>
            <input
              className="border-2 rounded-md border-gray-200 p-1.5 focus:outline-none focus:ring focus:ring-indigo-200"
              type="text"
              name="category"
              value={props.category}
              onChange={props.formChangeHandler}
            />
          </div>

          <div className="flex flex-col">
            <label
              className="font-semibold mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="border-2 rounded-md border-gray-200 p-1.5 focus:outline-none focus:ring focus:ring-indigo-200"
              type="text"
              name="description"
              value={props.description}
              onChange={props.formChangeHandler}
            />
          </div>

          <div className="flex flex-col">
            <label
              className="font-semibold mb-1"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="border-2 rounded-md border-gray-200 mb-2 p-1.5 focus:outline-none focus:ring focus:ring-indigo-200"
              type="date"
              name="date"
              value={props.date}
              onChange={props.formChangeHandler}
            />
          </div>

          <button
            className="sm:my-0 sm:mx-auto sm:w-32 p-1.5 rounded-md border-none bg-indigo-700 text-white"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreationForm;
