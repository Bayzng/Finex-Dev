import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div className="bg-black min-h-screen">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-20 transform-gpu overflow-hidden blur-3xl sm:top-5"
          aria-hidden="true"
        >
          <div className="relative left-[calc(40%-80rem)] aspect-square w-[50rem] h-[10rem] -translate-x-1/2 rotate-[80deg] bg-gradient-to-tl from-[#601BD0] to-[#DE1FFD] opacity-30 sm:left-[calc(45%-5rem)]  sm:w-[40rem]  sm:h-[30rem] rounded-full" />
        </div>
      </div>
      <div className="flex flex-col gap-8 justify-center pt-60">
        <div className="text-6xl text-center text-white">
          <p className="font-medium">Welcome To</p>
          <h1 className="welcometxt py-5 text-7xl font-inter font-extrabold">
            FinexSell
          </h1>
        </div>
        <Link href="/Dashboards" className="text-center">
          <button className="text-center text-white text-xl px-14 py-4 btngrad rounded-3xl">
            Get Started
          </button>
        </Link>
      </div>
      <div
        className=" inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(90%-20rem)]"
        aria-hidden="true"
      >
        <div className="left-[calc(190%+3rem)] aspect-[1355/878] w-[26.125rem]  h-[20rem] translate-x-1/2 rotate-[100deg] bg-gradient-to-tl from-[#601BD0] to-[#DE1FFD]   opacity-40 sm:left-[calc(190%+36rem)] sm:w-[72.1875rem] rounded-full" />
      </div>
    </div>
  );
}

export default Home;
