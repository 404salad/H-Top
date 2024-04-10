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
  const [inventoryTech, setInventoryTech] = useState([]);

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

    const fetchInventoryTech = async () => {
      try {
        const inventoryCollection = doc(
          collection(db, "techHelp"),
          "CoQbkfU8aoMlnH0EJvOr",
        );
        const snapshot = await getDoc(inventoryCollection);
        const data = snapshot.data(); // Use data() instead of docs.map() for single document
        setInventoryTech(data);
        console.log(inventoryTech);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventoryTech();

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
      updateDoc(doc(db, "inventoryTech", "CoQbkfU8aoMlnH0EJvOr"), {
        chair:
          chair + inventoryTech.chair < 0 ? chair + inventoryTech.chair : 0,
        table:
          table + inventoryTech.table < 0 ? table + inventoryTech.table : 0,
        fan: fan + inventoryTech.fan < 0 ? fan + inventoryTech.fan : 0,
        ac: ac + inventoryTech.ac < 0 ? ac + inventoryTech.ac : 0,
        bunker:
          bunker + inventoryTech.bunker < 0 ? bunker + inventoryTech.bunker : 0,
        mirrors:
          mirrors + inventoryTech.mirrors < 0
            ? mirrors + inventoryTech.mirrors
            : 0,
        tv: tv + inventoryTech.tv < 0 ? tv + inventoryTech.tv : 0,
        iron: iron + inventoryTech.iron < 0 ? iron + inventoryTech.iron : 0,
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
          <CardDataStats
            title="Chairs"
            total={inventory.chair}
            rate={inventoryTech.chair}
          >
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
          <CardDataStats
            title="Tables"
            total={inventory.table}
            rate={inventoryTech.table}
          >
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
            rate={inventoryTech.fan}
          >
            <svg
              fill="#3c4fe0"
              viewBox="-2.4 -2.4 28.80 28.80"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#3c4fe0"
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
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 3.48154C7.29535 3.48154 3.48148 7.29541 3.48148 12.0001C3.48148 16.7047 7.29535 20.5186 12 20.5186C16.7046 20.5186 20.5185 16.7047 20.5185 12.0001C20.5185 7.29541 16.7046 3.48154 12 3.48154ZM2 12.0001C2 6.47721 6.47715 2.00006 12 2.00006C17.5228 2.00006 22 6.47721 22 12.0001C22 17.5229 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.5229 2 12.0001Z"
                ></path>{" "}
                <path d="M12 11.3C11.8616 11.3 11.7262 11.3411 11.6111 11.418C11.496 11.4949 11.4063 11.6042 11.3533 11.7321C11.3003 11.86 11.2864 12.0008 11.3134 12.1366C11.3405 12.2724 11.4071 12.3971 11.505 12.495C11.6029 12.5929 11.7277 12.6596 11.8634 12.6866C11.9992 12.7136 12.14 12.6997 12.2679 12.6467C12.3958 12.5937 12.5051 12.504 12.582 12.3889C12.6589 12.2738 12.7 12.1385 12.7 12C12.7 11.8144 12.6262 11.6363 12.495 11.505C12.3637 11.3738 12.1857 11.3 12 11.3ZM12.35 5.00002C15.5 5.00002 15.57 7.49902 13.911 8.32502C13.6028 8.50778 13.3403 8.75856 13.1438 9.05822C12.9473 9.35787 12.8218 9.69847 12.777 10.054C13.1117 10.1929 13.4073 10.4116 13.638 10.691C16.2 9.29102 19 9.84401 19 12.35C19 15.5 16.494 15.57 15.675 13.911C15.4869 13.6029 15.232 13.341 14.9291 13.1448C14.6262 12.9485 14.283 12.8228 13.925 12.777C13.7844 13.1108 13.566 13.406 13.288 13.638C14.688 16.221 14.128 19 11.622 19C8.5 19 8.423 16.494 10.082 15.668C10.3852 15.4828 10.644 15.2332 10.84 14.9368C11.036 14.6404 11.1644 14.3046 11.216 13.953C10.8729 13.8188 10.5711 13.5967 10.341 13.309C7.758 14.695 5 14.149 5 11.65C5 8.50002 7.478 8.42302 8.304 10.082C8.48945 10.3888 8.74199 10.6496 9.04265 10.8448C9.34332 11.0399 9.68431 11.1645 10.04 11.209C10.1748 10.8721 10.3971 10.5772 10.684 10.355C9.291 7.80001 9.844 5.00002 12.336 5.00002H12.35Z"></path>{" "}
              </g>
            </svg>{" "}
          </CardDataStats>
          <CardDataStats
            title="Air Conditioners"
            total={inventory.ac}
            rate={inventoryTech.ac}
          >
            <svg
              fill="#3c4fe0"
              viewBox="-2.4 -2.4 28.80 28.80"
              id="ac"
              xmlns="http://www.w3.org/2000/svg"
              class="icon line"
              stroke="#3c4fe0"
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
                <path
                  id="primary"
                  d="M20,17H4a1,1,0,0,1-1-1V8A1,1,0,0,1,4,7H20a1,1,0,0,1,1,1v8A1,1,0,0,1,20,17Zm-3-2H7v2H17Zm-4-4h4"
                ></path>
              </g>
            </svg>
          </CardDataStats>
          <CardDataStats
            title="Bunkers"
            total={inventory.bunker}
            rate={inventoryTech.bunker}
          >
            <svg
              viewBox="-2.4 -2.4 28.80 28.80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#eff2f6"
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
                <path
                  d="M3 5V19M3 16H21M21 19V13.2C21 12.0799 21 11.5198 20.782 11.092C20.5903 10.7157 20.2843 10.4097 19.908 10.218C19.4802 10 18.9201 10 17.8 10H11V15.7273M7 12H7.01M8 12C8 12.5523 7.55228 13 7 13C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11C7.55228 11 8 11.4477 8 12Z"
                  stroke="#3c4fe0"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </CardDataStats>
          <CardDataStats
            title="Mirrors"
            total={inventory.mirrors}
            rate={inventoryTech.mirrors}
          >
            <svg
              viewBox="-2.4 -2.4 28.80 28.80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
                <path
                  d="M5 9.5V19C5 19.6491 4.78947 20.2807 4.4 20.8L3.5 22M19 9.5V19C19 19.6491 19.2105 20.2807 19.6 20.8L20.5 22"
                  stroke="#3c4fe0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>{" "}
                <path
                  d="M6.34141 7C6.12031 7.78195 6 8.62341 6 9.5C6 13.6421 8.68629 17 12 17C15.3137 17 18 13.6421 18 9.5C18 5.35786 15.3137 2 12 2C10.9091 2 9.88613 2.36394 9.00466 3"
                  stroke="#3c4fe0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>{" "}
                <path
                  d="M5 20H12M19 20H16"
                  stroke="#3c4fe0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>{" "}
                <path
                  d="M13 5.2561C13.9608 5.76552 14.697 6.98832 14.9257 8.50024"
                  stroke="#3c4fe0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>{" "}
              </g>
            </svg>
          </CardDataStats>
          <CardDataStats
            title="TV"
            total={inventory.tv}
            rate={inventoryTech.tv}
          >
            <svg
              viewBox="-2.5 -2.5 30.00 30.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0">
                <rect
                  x="-2.5"
                  y="-2.5"
                  width="30.00"
                  height="30.00"
                  rx="15"
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
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.769 17.5H14.231C15.732 17.5279 16.9715 16.334 17 14.833V12.167C16.9715 10.666 15.732 9.47211 14.231 9.49999H10.769C9.268 9.47211 8.02845 10.666 8 12.167V14.834C8.029 16.3346 9.26839 17.5279 10.769 17.5Z"
                  stroke="#3c4fe0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M10.1495 3.62501C9.94244 3.26629 9.48375 3.14337 9.12503 3.35048C8.7663 3.55758 8.64339 4.01627 8.85049 4.37499L10.1495 3.62501ZM10.5825 7.37499C10.7896 7.73371 11.2483 7.85663 11.607 7.64952C11.9657 7.44242 12.0886 6.98373 11.8815 6.62501L10.5825 7.37499ZM16.1495 4.37499C16.3566 4.01627 16.2337 3.55758 15.875 3.35048C15.5163 3.14337 15.0576 3.26629 14.8505 3.62501L16.1495 4.37499ZM13.1185 6.62501C12.9114 6.98373 13.0343 7.44242 13.393 7.64952C13.7517 7.85663 14.2104 7.73371 14.4175 7.37499L13.1185 6.62501ZM13.768 6.25C13.3538 6.25 13.018 6.58579 13.018 7C13.018 7.41421 13.3538 7.75 13.768 7.75V6.25ZM15.192 7L15.1943 6.25H15.192V7ZM19.5 11.333L18.75 11.3309V11.333H19.5ZM19.5 15.666H18.75L18.75 15.6683L19.5 15.666ZM18.2436 18.7252L17.7117 18.1965L18.2436 18.7252ZM15.192 20V20.75L15.1943 20.75L15.192 20ZM9.80802 20L9.80576 20.75H9.80802V20ZM5.50002 15.667L6.25002 15.6691V15.667H5.50002ZM5.50002 11.333H6.25002L6.25001 11.3309L5.50002 11.333ZM9.80802 7V6.25L9.80576 6.25L9.80802 7ZM11.232 7.75C11.6462 7.75 11.982 7.41421 11.982 7C11.982 6.58579 11.6462 6.25 11.232 6.25V7.75ZM13.768 7.75C14.1822 7.75 14.518 7.41421 14.518 7C14.518 6.58579 14.1822 6.25 13.768 6.25V7.75ZM11.232 6.25C10.8178 6.25 10.482 6.58579 10.482 7C10.482 7.41421 10.8178 7.75 11.232 7.75V6.25ZM8.85049 4.37499L10.5825 7.37499L11.8815 6.62501L10.1495 3.62501L8.85049 4.37499ZM14.8505 3.62501L13.1185 6.62501L14.4175 7.37499L16.1495 4.37499L14.8505 3.62501ZM13.768 7.75H15.192V6.25H13.768V7.75ZM15.1898 7.75C17.1617 7.75592 18.7555 9.35902 18.75 11.3309L20.25 11.3351C20.2578 8.5349 17.9945 6.25842 15.1943 6.25L15.1898 7.75ZM18.75 11.333V15.666H20.25V11.333H18.75ZM18.75 15.6683C18.7529 16.6153 18.3794 17.5248 17.7117 18.1965L18.7755 19.254C19.7237 18.3001 20.2541 17.0087 20.25 15.6637L18.75 15.6683ZM17.7117 18.1965C17.044 18.8682 16.1369 19.2472 15.1898 19.25L15.1943 20.75C16.5392 20.746 17.8274 20.2078 18.7755 19.254L17.7117 18.1965ZM15.192 19.25H9.80802V20.75H15.192V19.25ZM9.81027 19.25C7.83838 19.2441 6.24453 17.641 6.25001 15.6691L4.75002 15.6649C4.74223 18.4651 7.00558 20.7416 9.80576 20.75L9.81027 19.25ZM6.25002 15.667V11.333H4.75002V15.667H6.25002ZM6.25001 11.3309C6.24453 9.35902 7.83838 7.75592 9.81027 7.75L9.80576 6.25C7.00558 6.25842 4.74223 8.5349 4.75002 11.3351L6.25001 11.3309ZM9.80802 7.75H11.232V6.25H9.80802V7.75ZM13.768 6.25H11.232V7.75H13.768V6.25Z"
                  fill="#3c4fe0"
                ></path>{" "}
              </g>
            </svg>
          </CardDataStats>
          <CardDataStats
            title="Iron"
            total={inventory.iron}
            rate={inventoryTech.iron}
          >
            <svg
              viewBox="-2.5 -2.5 30.00 30.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0">
                <rect
                  x="-2.5"
                  y="-2.5"
                  width="30.00"
                  height="30.00"
                  rx="15"
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
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.5 17.0001L18.377 11.5291H8.553C7.505 11.5291 7.114 12.1291 6.653 13.3761L5.5 17.0001H19.5Z"
                  stroke="#3c4fe0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M18.3771 11.529L17.5281 7H12.1531"
                  stroke="#3c4fe0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </CardDataStats>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;

// #3c4fe0
// #eff2f6
