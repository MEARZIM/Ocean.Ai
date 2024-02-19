"use client"
import React from 'react'
import { FaTwitter,FaFacebook,FaInstagram,FaGithub,FaLinkedin } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="relative bg-inherit p-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap text-left lg:text-left">
                    <div className="w-full lg:w-6/12 px-4">
                        
                        <h5 className="text-lg mt-0 mb-2 text-white">
                            Find me on any of these platforms, and I respond within 1-2 business days.
                        </h5>
                        <div className="flex mt-6 lg:mb-0 mb-6">
                            <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                               <a href="https://twitter.com/ayansah68348681"> <FaTwitter size={20} color='blue'/> </a> 
                            </button>
                            <button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                <a href="https://www.facebook.com/ayan%20saha">  <FaFacebook size={20} color='blue'/> </a>
                            </button>
                            <button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                <a href="https://www.instagram.com/fucking_nobody17/"> <FaInstagram size={20} color='red'/> </a> 
                            </button>
                            <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                <a href="https://github.com/MEARZIM"> <FaGithub  size={20} color='black'/> </a>
                            </button>
                            <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                <a href="https://www.linkedin.com/in/ayan-saha-b12aa0248"> <FaLinkedin  size={20} color='blue'/> </a>
                            </button>
                        </div>
                    </div>
                    
                </div>
                <hr className="my-6 border-blueGray-300" />
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm text-white font-semibold py-1">
                        All rights reserved © <span id="get-current-year"> 2024</span> Ayan Saha
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

