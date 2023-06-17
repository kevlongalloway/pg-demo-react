import React from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import GuidedMeditation from './pages/GuidedMeditation';
import Chat from './pages/Chat';
import { CSSTransition } from 'react-transition-group';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <CSSTransition classNames="fade" timeout={300}>
          <HomePage />
        </CSSTransition>
      ),
    },
    {
      path: "/login",
      element: (
        <CSSTransition classNames="fade" timeout={300}>
          <LoginPage />
        </CSSTransition>
      ),
    },
    {
      path: "/register",
      element: (
        <CSSTransition classNames="fade" timeout={300}>
          <RegisterPage />
        </CSSTransition>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <CSSTransition classNames="fade" timeout={300}>
          <Dashboard />
        </CSSTransition>
      ),
    },
    {
      path: "/chat",
      element: (
        <CSSTransition classNames="fade" timeout={300}>
          <Chat />
        </CSSTransition>
      ),
    },
    {
      path: "/guided-meditation",
      element: (
        <CSSTransition classNames="fade" timeout={300}>
          <GuidedMeditation />
        </CSSTransition>
      ),
    },
  ]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <RouterProvider router={router} />
      
    </div>
  );
}
