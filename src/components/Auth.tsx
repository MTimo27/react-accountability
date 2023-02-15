import React, {
  Dispatch,
  SetStateAction,
  useReducer,
} from "react";

import {
  auth,
  googleProvider,
} from "../firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface formStateType {
  email: string;
  password: string;
}

interface formActionType {
  type: string;
  value?: string;
}

const formReducer = (
  state: formStateType,
  action: formActionType
): formStateType => {
  switch (action.type) {
    case "EMAIL_UPDATE":
      return {
        ...state,
        email: action.value!,
      };
    case "PASSWORD_UPDATE":
      return {
        ...state,
        password: action.value!,
      };
    case "RESET":
      return {
        email: "",
        password: "",
      };
    default:
      return state;
  }
};

interface Props {
  setCurrentUser: Dispatch<
    SetStateAction<string | undefined>
  >;
  currentUser: string | undefined;
}

export const Auth = ({
  setCurrentUser,
  currentUser,
}: Props) => {
  const [formState, dispatchFormState] = useReducer(
    formReducer,
    { email: "", password: "" }
  );

  const handleSignIn = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );
      dispatchFormState({ type: "RESET" });
      setCurrentUser(auth.currentUser?.email!);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setCurrentUser(auth.currentUser?.email!);
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );
      setCurrentUser(auth.currentUser?.email!);
      dispatchFormState({ type: "RESET" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setCurrentUser(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex justify-center mt-10 mb-10">
      <div className="w-11/12 sm:w-1/3 border-2 border-gray-200 rounded-md p-5">
        {currentUser === undefined ? (
          <form
            onSubmit={(event) => handleSignIn(event)}
            className="flex flex-col gap-2"
          >
            <label
              className="font-semibold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border-2 rounded-md border-gray-200 p-1.5 focus:outline-none focus:ring focus:ring-indigo-200"
              type="email"
              name="email"
              value={formState.email}
              onChange={(e) => {
                dispatchFormState({
                  type: "EMAIL_UPDATE",
                  value: e.target.value,
                });
              }}
            />
            <label
              className="font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border-2 rounded-md border-gray-200 p-1.5 focus:outline-none focus:ring focus:ring-indigo-200"
              type="password"
              name="password"
              value={formState.password}
              onChange={(e) => {
                dispatchFormState({
                  type: "PASSWORD_UPDATE",
                  value: e.target.value,
                });
              }}
            />
            <div className="mt-2 flex flex-row gap-2 justify-end">
              <button
                type="submit"
                className="sm:w-32 p-1.5 rounded-md border-none bg-indigo-700 text-white"
              >
                Create account
              </button>
              <button
                type="button"
                onClick={signInWithGoogle}
                className="sm:w-32 p-1.5 rounded-md border-none bg-indigo-700 text-white"
              >
                Google sign in
              </button>
              <button
                type="button"
                onClick={signIn}
                className="sm:w-32 p-1.5 rounded-md border-none bg-indigo-700 text-white"
              >
                Sign in
              </button>
            </div>
          </form>
        ) : (
          <div className="w-full flex justify-center">
            <button
              type="button"
              onClick={handleLogOut}
              className="sm:w-32 p-1.5 rounded-md border-none bg-red-700 text-white"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
