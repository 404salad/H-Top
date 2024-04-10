"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/firebase/config";

function health() {
  const [data, setData] = useState({
    data: "10-4-2024",
    isIll: 0,
    useremail: "saumya.gupta2022@vitstudent.ac.in",
  });

  useEffect(() => {
    const fetchData = async () => {
      const contentsCollection = collection(db, "iamill");
      const contentsSnapshot = await getDocs(contentsCollection);
      const docRef = db.collection('iamill').doc('pGHYqywzQtb5cpOXdG3hvwHnArA2'); // Replace with your collection and document

      const docSnapshot = await docRef.get();

      if (docSnapshot.exists) {
        setData(docSnapshot.data());
      } else {
        console.error('Document not found in Firebase');
      }
    };

    fetchData();
  }, []);

  const handleUpdateIsIll = (value) => {
    const docRef = db.collection('iamill').doc('pGHYqywzQtb5cpOXdG3hvwHnArA2'); // Replace with your collection and document

    docRef.update({
      isIll: value,
    })
    .then(() => {
      console.log('Document updated successfully');
      setData((prevData) => ({ ...prevData, isIll: value })); // Update local state for UI reflection
    })
    .catch((error) => {
      console.error('Error updating document:', error);
    });
  };

  return (
    <DefaultLayout>
      <div>
        <Breadcrumb title="Health Status" />
        <p>data: {data.data}</p>
        <p>isIll: {data.isIll}</p>
        <p>useremail: {data.useremail}</p>
        <button onClick={() => handleUpdateIsIll(1)}>Accept</button>
        <button onClick={() => handleUpdateIsIll(-1)}>Reject</button>
      </div>
    </DefaultLayout>
  );
}

export default health;
