"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config"; // Adjust the import path as necessary
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

function HealthStatus() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [illReq, setIllReq] = useState([]);
  let a = 0;

  const handleUpdateIsIll = async (useremail, isIll) => {
    console.log("hello reacher here")
    const userDoc = doc(db, "iamill", useremail);
    await updateDoc(userDoc, {
      isIll,
    });
    a = a+1;
  }

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "iamill")); // Replace with your collection
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      setData(docs);
    };

    fetchData();

    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "userData")); // Replace with your collection
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      setUsers(docs);
    };

    fetchUsers();
  }, [a]);

  useEffect(() => {
    const filterUsers = () => {
      const illReq1 = users
        .filter((user) => {
          const matchingData = data.find(
            (item) =>
              item.useremail === user.useremail && item.isill && item.date,
          );
          return matchingData ? { ...user, ...matchingData } : null;
        })
        .filter(Boolean);
      console.log(illReq1);
      setIllReq(illReq1);
    };

    filterUsers();

    console.log(illReq);
  }, [users, data]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Health Status" />
      {data.map((data) => (
        <div
          key={data.useremail}
          className="h-full rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <div className="flex h-30 justify-between py-5">
            <div>
              <p>Data: {data.data}</p>
              {/* <ConditionalComponent data1={data} /> */}
              <p>Email: {data.useremail}</p>
            </div>
            {data.isIll == 0 && (
              <div className="flex w-full justify-end">
                <button
                  className="mx-3 inline-flex h-fit items-center justify-center rounded-lg bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  onClick={() => handleUpdateIsIll(data.useremail, 1)}
                >
                  Accept
                </button>
                <button
                  className="mx-3 inline-flex h-fit items-center justify-center rounded-lg bg-red px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  onClick={() => handleUpdateIsIll(data.useremail, -1)}
                >
                  Reject
                </button>
              </div>
            )}
            {data.isIll == 1 && <div>Accepted</div>}
            {data.isIll == -1 && <div>Rejected</div>}
            <div className="mt-4 flex items-end justify-between"></div>
          </div>
        </div>
      ))}
    </DefaultLayout>
  );
}

export default HealthStatus;
