import * as React from 'react';
import { Outlet, Link } from "react-router-dom";


export default function HomePage() {
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-8">Pocket Therapy Demo</h1>
            <div className="mb-4">
                <Link to="login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Login
                </ Link>
            </div>
            <div className="mb-4">
                <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Register
                </ Link>
            </div>
        </div>
    </div>
  );
}
