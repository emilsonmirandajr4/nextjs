"use client";

import React from "react";

export default function GlassCardSection() {
  return (
    <div className="w-full max-w-7xl mx-auto mt-20 mb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[#dedede] mb-4 font-serif">
          Floating Glass Cards
        </h2>
        <p className="text-gray-400">
          Cards com efeito de vidro, inclinação e blur
        </p>
      </div>

      <div className="wrapper">
        <div className="box">
          <span></span>
          <div className="content">
            <h2>Card 1</h2>
            <p>There could be some informations regarding stuff contained on your web page.</p>
            <a href="#">Read more</a>
          </div>
        </div>
        <div className="box">
          <span></span>
          <div className="content">
            <h2>Card 2</h2>
            <p>Or they could be used to showcase different payment plans for your services.</p>
            <a href="#">Read more</a>
          </div>
        </div>
        <div className="box">
          <span></span>
          <div className="content">
            <h2>Card 3</h2>
            <p>With a button redirecting customers to a page with details about a chosen plan.</p>
            <a href="#">Read more</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          padding: 40px 0;
        }
        .wrapper .box {
          position: relative;
          width: 320px;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 40px 30px;
          transition: 0.5s;
        }
        /* look of the tile */
        .wrapper .box::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50px;
          width: 50%;
          height: 100%;
          background-color: #ffffff;
          border-radius: 8px;
          transform: skewX(15deg);
          transition: 0.5s;
        }
        /* look of the blur around tiles */
        .wrapper .box::after {
          content: "";
          position: absolute;
          top: 0;
          left: 50px;
          width: 50%;
          height: 100%;
          background-color: #ffffff;
          border-radius: 8px;
          transform: skewX(15deg);
          transition: 0.5s;
          filter: blur(30px);
          transition: 0.5s;
        }
        /* look after hover */
        .wrapper .box:hover:before,
        .wrapper .box:hover:after {
          transform: skewX(0deg);
          left: 20px;
          width: calc(100% - 90px);
        }
        /* colors for each tile */
        .wrapper .box:nth-child(1):before,
        .wrapper .box:nth-child(1):after {
          background: linear-gradient(315deg, #ffbc00, #ff0058)
        }
        .wrapper .box:nth-child(2):before,
        .wrapper .box:nth-child(2):after {
          background: linear-gradient(315deg, #03a9f4, #ff0058)
        }
        .wrapper .box:nth-child(3):before,
        .wrapper .box:nth-child(3):after {
          background: linear-gradient(315deg, #4dff03, #00d0ff)
        }
        .wrapper .box span {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 50;
          pointer-events: none; 
        }
        .wrapper .box span::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 8px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          opacity: 0;
          transition: 0.5s;
          animation: animate 2s linear infinite;
        }
        /* size and position of first on hover rect */
        .wrapper .box:hover span::before {
          top: -35px;
          left: 35px;
          width: 85px;
          height: 85px;
          opacity: 1;
        }
        /* size and position of second on hover rect */
        .wrapper .box span::after {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          border: 8px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          opacity: 0;
          transition: 0.5s;
          animation: animate 2s linear infinite;
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
          animation-delay: -1s;
        }

        .wrapper .box:hover span::after {
          bottom: -35px;
          right: 100px;
          width: 85px;
          height: 85px;
          opacity: 1;
        }
        /* animation to make on-hover tiles float */
        @keyframes animate {
          0, 100% {
            transform: translateY(10px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        /* position of box with content */
        .wrapper .box .content {
          position: relative;
          left: -20px;
          padding: 20px 40px;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          transition: 0.5s;
          z-index: 1;
          color: #fff;
        }
        .wrapper .box:hover .content {
          left: -60px;
        }
        .wrapper .box .content h2 {
          font-size: 2em;
          color: #fff;
          margin-bottom: 10px;
        }
        .wrapper .box .content p {
          font-size: 1.1em;
          margin-bottom: 10px;
          line-height: 1.4em;
        }
        .wrapper .box .content a {
          display: inline-block;
          font-size: 1.1em;
          color: #111;
          background: #fff;
          padding: 10px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
}
