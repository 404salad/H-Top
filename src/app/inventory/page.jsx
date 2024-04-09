"use client";
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const FormLayout = () => {
  const [chair, setChair] = useState(0);
  const [table, setTable] = useState(0);
  const [fan, setFan] = useState(0);
  const [ac, setAC] = useState(0);
  const [bunker, setBunker] = useState(0);
  const [mirrors, setMirrors] = useState(0);
  const [tv, setTV] = useState(0);
  const [iron, setIron] = useState(0);
  const [enabled, setEnabled] = useState(true);

  const decrement = (setState) => {
    setState((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      }
      return prevState;
    });
  };

  const increment = (setState) => {
    setState((prevState) => prevState + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9 ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white ">
                Inventory Form
              </h3>
              {/* Toggle switch for delete or add */}
              <div className="flex">
                <label
                  htmlFor="toggle3"
                  className="flex cursor-pointer select-none items-center"
                >
                    <h5 className="p-2">{enabled && (<span className="text-green-600">Add</span>)}</h5>
                    <h5 className="p-2">{!enabled && (<span className="text-red">Delete</span>)}</h5>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="toggle3"
                      className="sr-only"
                      onChange={() => {
                        setEnabled(!enabled);
                      }}
                    />
                    <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
                    <div
                      className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
                        enabled &&
                        "!right-1 !translate-x-full !bg-primary dark:!bg-white"
                      }`}
                    >
                      <span className={`hidden ${enabled && "!block"}`}>
                        <svg
                          className="fill-white dark:fill-black"
                          width="11"
                          height="8"
                          viewBox="0 0 11 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                            fill=""
                            stroke=""
                            strokeWidth="0.4"
                          ></path>
                        </svg>
                      </span>
                      <span className={`${enabled && "hidden"}`}>
                        <svg
                          className="h-4 w-4 stroke-current"
                          fill="none"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
                  {[
                    { label: "Chair", state: chair, setState: setChair },
                    { label: "Table", state: table, setState: setTable },
                    { label: "Fan", state: fan, setState: setFan },
                    { label: "AC", state: ac, setState: setAC },
                    { label: "Bunker", state: bunker, setState: setBunker },
                    { label: "Mirrors", state: mirrors, setState: setMirrors },
                    { label: "TV", state: tv, setState: setTV },
                    { label: "Iron", state: iron, setState: setIron },
                  ].map((item, index) => (
                    <div className="w-full" key={index}>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        {item.label}
                      </label>
                      <div className="flex items-center justify-between">
                        <div
                          className="inline-block w-1/3 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-center text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          onClick={() => decrement(item.setState)}
                        >
                          -
                        </div>
                        <input
                          type="text"
                          value={isNaN(item.state) ? "" : item.state}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value < 0) return;
                            item.state = isNaN(value) ? "" : value;
                            item.setState(value); // Update the state
                          }}
                          inputMode="numeric"
                          pattern="\d*"
                          className="inline-block w-1/3 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-center text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <div
                          className="inline-block w-1/3 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-center text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          onClick={() => increment(item.setState)}
                        >
                          +
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;

// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

// import { Metadata } from "next";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// // export const metadata: Metadata = {
// //   title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
// //   description:
// //     "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// // };

// const FormLayout = () => {

//     const [chair, setChair] = useState(0);

//     return (
//         <DefaultLayout>
//             {/* <Breadcrumb pageName="FormLayout" /> */}

//             <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
//                 <div className="flex flex-col gap-9 ">
//                     {/* <!-- Contact Form --> */}
//                     <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//                         <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
//                             <h3 className="font-medium text-black dark:text-white">
//                                 Inventory Form
//                             </h3>
//                         </div>
//                         <form action="#">
//                             <div className="p-6.5">
//                                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//                                     <div className="w-full xl:w-1/2">
//                                         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                                             Chair
//                                         </label>
//                                         <div className="w-1/3 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary inline" onClick={() => setChair(chair - 1)}>-</div>
//                                         <input
//                                             type="number"
//                                             value={chair}
//                                             className="w-1/3 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input text-center dark:text-white dark:focus:border-primary inline"
//                                         />
//                                         <div className="w-1/3 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary inline" onClick={() => setChair(chair + 1)}>+</div>
//                                     </div>

//                                     <div className="w-full xl:w-1/2">
//                                         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                                             Last name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             placeholder="Enter your last name"
//                                             className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="mb-4.5">
//                                     <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                                         Email <span className="text-meta-1">*</span>
//                                     </label>
//                                     <input
//                                         type="email"
//                                         placeholder="Enter your email address"
//                                         className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                     />
//                                 </div>

//                                 <div className="mb-4.5">
//                                     <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                                         Subject
//                                     </label>
//                                     <input
//                                         type="text"
//                                         placeholder="Select subject"
//                                         className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                     />
//                                 </div>

//                                 <SelectGroupOne />

//                                 <div className="mb-6">
//                                     <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                                         Message
//                                     </label>
//                                     <textarea
//                                         rows={6}
//                                         placeholder="Type your message"
//                                         className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                     ></textarea>
//                                 </div>

//                                 <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
//                                     Send Message
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>

//             </div>
//         </DefaultLayout>
//     );
// };

// export default FormLayout;
