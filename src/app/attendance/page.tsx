import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import StudentsPresentCard from "@/components/StudentsPresentCard";
// reg no, name, phone number, room number


const brandData = [
    {
      name: "Saumya Gupta",
      registration: "22BCE1393",
      room: "A-539",
      phone: 94758339584,
    },
    {
        name: "Saumil Gupta",
        registration: "22BCE1393",
        room: "A-142",
        phone: 94758339584,
      },
    {
        name: "Random Gupta",
        registration: "22BCE1393",
        room: "A-131",
        phone: 94758339584,
    },
    
  ];

  
const Attendance: React.FC = () => {
  return (
    <DefaultLayout>
        <h1 className="text-3xl py-5">Hostel Attendance</h1>

    {/* <!-- Cards  --> */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        <StudentsPresentCard block="A block " total="4903" rate="0.43%" levelUp        >
    Students Present
        </StudentsPresentCard>
        <StudentsPresentCard block="A block" total="1943" rate="0.43%" levelDown       >
        Students Absent
        </StudentsPresentCard>
        </div>
    {/* <!-- Cards End  --> */} 

{/* <!--  list missing --> */}

<div className="my-5 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          List of Hostel Absentees
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Registration Number
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phone     
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Room Number
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
                Mark Present
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5 ">
              <p className="hidden text-black dark:text-white sm:block">
                {brand.registration}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.name}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{brand.phone}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.room}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5"><input className="w-4 border" type="checkbox"></input> </p>
            </div>
          </div>
        ))}
      </div>
    </div>

{/* <!--  list missing end --> */}

    </DefaultLayout>
  );
};

export default Attendance;
