import React from 'react'
import { Link } from 'react-router-dom'

// import ImageLight from '../assets/img/login-office.jpeg'
// import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button, WindmillContext } from "@windmill/react-ui";
import { useEffect, useState, useContext } from "react";
import { useAuthActions, useAuthState } from "use-eazy-auth";
import { MoonIcon, SunIcon } from '../icons'
function Login() {
const { loginLoading, loginError } = useAuthState();
const { login, clearLoginError } = useAuthActions();
  const { mode, toggleMode } = useContext(WindmillContext);

// Clear login error when Login component unmount
  useEffect(() => () => clearLoginError(), [clearLoginError]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="https://r4.wallpaperflare.com/wallpaper/181/737/158/cristiano-ronaldo-sports-football-hd-wallpaper-b8539f0526830d1a82a38fdf350d1624.jpg"
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src="https://i.pinimg.com/originals/15/0f/b4/150fb4ee97b1d0f99eebea6e774eb3fe.jpg"
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                footballpro
              </h1>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (username !== "" && password !== "") {
                    login({ username, password });
                  }
                }}
              >
                <Label>
                  <span>Email</span>
                  <Input
                    className="mt-1"
                    type="text"
                    placeholder="john@doe.com"
                    value={username}
                    onChange={(e) => {
                      clearLoginError();
                      setUsername(e.target.value);
                    }}
                  />
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1"
                    type="password"
                    placeholder="***************"
                    value={password}
                    onChange={(e) => {
                      clearLoginError();
                      setPassword(e.target.value);
                    }}
                  />
                </Label>

                <button
                  className="mt-4"
                  block
                  tag={Link}
                  disabled={loginLoading}
                >
                  <Button className="mt-4" block>
                    {!loginLoading ? "Login!" : "Logged in..."}
                  </Button>
                </button> {" "}
                <Button
                  className="rounded-md focus:outline-none focus:shadow-outline-purple"
                  onClick={toggleMode}
                  aria-label="Toggle color mode"
                >
                  {mode === "dark" ? (
                    <SunIcon className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <MoonIcon className="w-5 h-5" aria-hidden="true" />
                  )}
                </Button>
                {loginError && (
                  <div>Bad combination of username and password.</div>
                )}
                <hr className="my-8" />

               

                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    to="/forgot-password"
                  >
                    Forgot your password?
                  </Link>
                </p>
                <p className="mt-1">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    to="/create-account"
                  >
                    Create account
                  </Link>
                </p>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login
