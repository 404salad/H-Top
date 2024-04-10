"use client"
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config'; // Adjust the import path as necessary
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

function HealthStatus() {
 const [data, setData] = useState({
    data: "10-4-2024",
    isIll: 0,
    useremail: "saumya.gupta2022@vitstudent.ac.in",
 });

 useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'iamill', 'pGHYqywzQtb5cpOXdG3hvwHnArA2'); // Replace with your collection and document

      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        setData(docSnapshot.data());
      } else {
        console.error('Document not found in Firebase');
      }
    };

    fetchData();
 }, []);

 const ConditionalComponent = ({ data1 }) => {
    let statusClass;
    if (data1.isIll === -1) {
      statusClass = 'bg-red text-white'; // Example class for -1
    } else if (data1.isIll === 1) {
      statusClass = 'bg-green-500 text-white'; // Example class for 1
    } else {
      statusClass = 'bg-yellow-500 text-black'; // Example class for 0
    }
    let name;
    if (data1.isIll === -1) {
      name = 'Request Rejected'; // Example class for -1
    } else if (data1.isIll === 1) {
      name = 'Request Accepted'; // Example class for 1
    } else {
      name = 'Awaiting Response'; // Example class for 0
    }
    return (
      <div className={`p-4 rounded w-1/3 ${statusClass}`}>
        <p> {name}</p>
      </div>
    );
 };

 const handleUpdateIsIll = async (value) => {
    const docRef = doc(db, 'iamill', 'pGHYqywzQtb5cpOXdG3hvwHnArA2'); // Replace with your collection and document

    try {
      await updateDoc(docRef, {
        isIll: value,
      });
      console.log('Document updated successfully');
      setData((prevData) => ({ ...prevData, isIll: value })); // Update local state for UI reflection
    } catch (error) {
      console.error('Error updating document:', error);
    }
 };

 return (
    <DefaultLayout>
      <Breadcrumb pageName="Health Status" />
      <div className="rounded-sm border h-60 border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className='h-30 bg-meta-4 py-5'>
      <p>Data: {data.data}</p>
      <ConditionalComponent data1={data} />
      <p>User Email: {data.useremail}</p>
      <div>
        <button className='inline-flex items-center justify-center bg-meta-3 px-10 py-4 rounded-lg text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10' onClick={() => handleUpdateIsIll(1)}>Accept</button>
        <button className='inline-flex items-center justify-center bg-red px-10 py-4 rounded-lg text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10' onClick={() => handleUpdateIsIll(-1)}>Reject</button>
      
      </div>
      <div className="mt-4 flex items-end justify-between">


      </div>
     
    </div>
    </div>
    </DefaultLayout>
 );
}

export default HealthStatus;
