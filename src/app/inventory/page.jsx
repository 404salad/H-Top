"use client";
import React, { use, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CardDataStats from "@/components/CardDataStats";
import { useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
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
  const [inventory, setInventory] = useState([]);

  console.log(db);

//   TODO svgs

  useEffect(() => {
    // Fetch inventory data here
    const fetchInventory = async () => {
      try {
        const inventoryCollection = doc(
          collection(db, "inventory"),
          "0JbxOnwU0I1jTJ02SPvb",
        );
        const snapshot = await getDoc(inventoryCollection);
        const data = snapshot.data(); // Use data() instead of docs.map() for single document
        setInventory(data);
        console.log(inventory);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, [chair, table, fan, ac, bunker, mirrors, tv, iron]);

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
    console.log("Form submitted");
    if (enabled) {
      updateDoc(doc(db, "inventory", "0JbxOnwU0I1jTJ02SPvb"), {
        chair: chair + inventory.chair,
        table: table + inventory.table,
        fan: fan + inventory.fan,
        ac: ac + inventory.ac,
        bunker: bunker + inventory.bunker,
        mirrors: mirrors + inventory.mirrors,
        tv: tv + inventory.tv,
        iron: iron + inventory.iron,
      });
    } else {
      updateDoc(doc(db, "inventory", "0JbxOnwU0I1jTJ02SPvb"), {
        chair: inventory.chair - chair,
        table: inventory.table - table,
        fan: inventory.fan - fan,
        ac: inventory.ac - ac,
        bunker: inventory.bunker - bunker,
        mirrors: inventory.mirrors - mirrors,
        tv: inventory.tv - tv,
        iron: inventory.iron - iron,
      });
    }

    // Reset the form
    setChair(0);
    setTable(0);
    setFan(0);
    setAC(0);
    setBunker(0);
    setMirrors(0);
    setTV(0);
    setIron(0);
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
                  <h5 className="p-2">
                    {enabled && <span className="text-green-600">Add</span>}
                  </h5>
                  <h5 className="p-2">
                    {!enabled && <span className="text-red">Delete</span>}
                  </h5>
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
                  className={`flex w-full justify-center rounded p-3 font-medium text-white hover:bg-opacity-90 ${
                    enabled ? "bg-primary" : "bg-red"
                  }`}
                >
                  {enabled ? "Add" : "Delete"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="grid h-fit grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
          <CardDataStats title="Chairs" total={inventory.chair} rate="">
            <svg
              viewBox="-2.4 -2.4 28.80 28.80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="matrix(1, 0, 0, 1, 0, 0)"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0">
                <rect
                  x="-2.4"
                  y="-2.4"
                  width="28.80"
                  height="28.80"
                  rx="14.4"
                  fill=" #eff2f6"
                  strokewidth="0"
                ></rect>
              </g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.9643 2.25H12.0359C12.9401 2.24999 13.6694 2.24998 14.2577 2.3033C14.8641 2.35826 15.3939 2.47455 15.8751 2.75241C16.4452 3.08154 16.9186 3.55493 17.2477 4.125C17.5256 4.60625 17.6418 5.13605 17.6968 5.7424C17.7501 6.3307 17.7501 7.05998 17.7501 7.96423V11.371C18.2441 11.4754 18.6911 11.6795 19.052 12.0919C19.4975 12.6011 19.6428 13.2365 19.703 13.9366C19.7044 13.9525 19.7058 13.9684 19.7071 13.9843C19.7424 14.3935 19.7758 14.7811 19.7541 15.105C19.7292 15.4762 19.6285 15.855 19.3273 16.1833C19.0162 16.5223 18.6255 16.6485 18.2514 16.702C18.099 16.7237 17.9306 16.7357 17.7501 16.7422V21C17.7501 21.4142 17.4143 21.75 17.0001 21.75C16.5859 21.75 16.2501 21.4142 16.2501 21V16.75H7.75011V21C7.75011 21.4142 7.41432 21.75 7.00011 21.75C6.58589 21.75 6.25011 21.4142 6.25011 21V16.7422C6.06959 16.7357 5.9012 16.7237 5.74883 16.702C5.37467 16.6485 4.98401 16.5223 4.67291 16.1833C4.37169 15.855 4.27099 15.4762 4.24614 15.105C4.22445 14.7811 4.25785 14.3934 4.29309 13.9842C4.29446 13.9684 4.29583 13.9525 4.2972 13.9366C4.35737 13.2365 4.50268 12.6011 4.94824 12.0919C5.30912 11.6795 5.75609 11.4754 6.25011 11.371L6.25011 7.96421C6.2501 7.05997 6.25009 6.33069 6.30341 5.7424C6.35836 5.13605 6.47466 4.60625 6.75251 4.125C7.08164 3.55493 7.55503 3.08154 8.12511 2.75241C8.60636 2.47455 9.13616 2.35826 9.7425 2.3033C10.3308 2.24998 11.0601 2.24999 11.9643 2.25ZM8.44372 11.25C8.40708 11.25 8.37069 11.25 8.33454 11.25H7.75011V8C7.75011 7.05158 7.75082 6.39041 7.79729 5.87779C7.84281 5.37549 7.92748 5.0899 8.05155 4.875C8.24903 4.53296 8.53306 4.24892 8.87511 4.05144C9.09001 3.92737 9.37559 3.84271 9.8779 3.79718C10.3905 3.75072 11.0517 3.75 12.0001 3.75C12.9485 3.75 13.6097 3.75072 14.1223 3.79718C14.6246 3.84271 14.9102 3.92737 15.1251 4.05144C15.4671 4.24892 15.7512 4.53296 15.9487 4.875C16.0727 5.0899 16.1574 5.37549 16.2029 5.87779C16.2494 6.39041 16.2501 7.05158 16.2501 8V11.25H15.6657C15.6295 11.25 15.5931 11.25 15.5565 11.25H8.44372ZM8.50011 12.75C7.65102 12.75 7.10025 12.7521 6.69378 12.8145C6.32028 12.8719 6.17689 12.9656 6.0771 13.0797C5.95089 13.2239 5.84334 13.4641 5.79168 14.065C5.75092 14.5393 5.72974 14.8098 5.74279 15.0048C5.74859 15.0915 5.76004 15.1324 5.76595 15.1487C5.76977 15.1592 5.77186 15.1623 5.77805 15.169L5.77924 15.1703C5.77921 15.1703 5.77925 15.1703 5.77924 15.1703L5.78231 15.1723C5.78409 15.1733 5.78721 15.1749 5.79206 15.1771C5.81294 15.1863 5.86142 15.2028 5.96095 15.2171C6.17899 15.2482 6.48501 15.25 7.00011 15.25H17.0001C17.5152 15.25 17.8212 15.2482 18.0393 15.2171C18.1388 15.2028 18.1873 15.1863 18.2082 15.1771C18.213 15.1749 18.2161 15.1733 18.2179 15.1723L18.2206 15.1707C18.2206 15.1706 18.2206 15.1706 18.2206 15.1707L18.2222 15.169C18.2284 15.1623 18.2304 15.1592 18.2343 15.1487C18.2402 15.1324 18.2516 15.0915 18.2574 15.0048C18.2705 14.8098 18.2493 14.5393 18.2085 14.065C18.1569 13.4641 18.0493 13.2239 17.9231 13.0797C17.8233 12.9656 17.6799 12.8719 17.3064 12.8145C16.9 12.7521 16.3492 12.75 15.5001 12.75H8.50011Z"
                  fill=" #3c4fe0"
                ></path>{" "}
              </g>
            </svg>
            
          </CardDataStats>
          <CardDataStats title="Tables" total={inventory.table} rate="">
            <svg
              viewBox="-2.4 -2.4 28.80 28.80"
              xmlns="http://www.w3.org/2000/svg"
              fill="#3c4fe0"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0">
                <rect
                  x="-2.4"
                  y="-2.4"
                  width="28.80"
                  height="28.80"
                  rx="14.4"
                  fill="#eff2f6"
                  strokewidth="0"
                ></rect>
              </g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>table</title>{" "}
                <path d="M18.76,6l2,4H3.24l2-4H18.76M20,4H4L1,10v2H3v7H5V16H19v3h2V12h2V10L20,4ZM5,14V12H19v2Z"></path>{" "}
                <rect width="24" height="24" fill="none"></rect>{" "}
              </g>
            </svg>
          </CardDataStats>

          <CardDataStats
            title="Fans"
            total={inventory.fan}
            rate=""
          >
            
          </CardDataStats>
          <CardDataStats
            title="Air Conditioners"
            total={inventory.ac}
            rate=""
          >
            
          </CardDataStats>
          <CardDataStats
            title="Bunkers"
            total={inventory.bunker}
            rate=""
          >
            
          </CardDataStats>
          <CardDataStats
            title="Mirrors"
            total={inventory.mirrors}
            rate=""
          ></CardDataStats>
          <CardDataStats
            title="TV"
            total={inventory.tv}
            rate=""
          ></CardDataStats>
          <CardDataStats
            title="Iron"
            total={inventory.iron}
            rate=""
          ></CardDataStats>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;

// #3c4fe0
// #eff2f6
