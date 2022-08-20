import React from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'
import { useEffect, useState } from "react";
import { useAuthActions, useAuthState } from "use-eazy-auth";

function Login() {
const { loginLoading, loginError } = useAuthState();
const { login, clearLoginError } = useAuthActions();

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
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
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
                </button>
                {loginError && (
                  <div>Bad combination of username and password.</div>
                )}
                <hr className="my-8" />

                <Button block layout="outline">
                  <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                  Github
                </Button>
                <Button className="mt-4" block layout="outline">
                  <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                  Twitter
                </Button>

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
