import React from "react";

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
  visibility: string;
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

          <div className="flex flex-col">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value={props.visibility}
                className="sr-only peer"
                name="visibility"
                onChange={props.formChangeHandler}
                checked={
                  props.visibility === "private"
                    ? false
                    : true
                }
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium">
                Make public
              </span>
            </label>
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
