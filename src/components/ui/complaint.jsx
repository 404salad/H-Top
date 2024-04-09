'use client'
import { useState, useEffect } from "react";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [activeComplaints, setActiveComplaints] = useState([]);
  const [solvedComplaints, setSolvedComplaints] = useState([]);

  const findRelativeDate = (date) => {
    const currentDate = new Date();
    const complainDate = new Date(date);
    const differenceInDays = Math.floor((currentDate - complainDate) / (1000 * 60 * 60 * 24));

    if (differenceInDays === 0) {
      return "Today";
    } else if (differenceInDays === 1) {
      return "1 day ago";
    } else if (differenceInDays === 2) {
      return "2 days ago";
    } else {
      return `${differenceInDays} days ago`;
    }
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const complainCollection = collection(db, "Complaints");
        const messagesSnapshot = await getDocs(complainCollection);
        const complainData = messagesSnapshot.docs.map((doc) => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });

        // Separate active and solved complaints
        const active = [];
        const solved = [];
        complainData.forEach((complaint) => {
          if (complaint.Status === 0) {
            solved.push(complaint);
          } else {
            active.push(complaint);
          }
        });

        setActiveComplaints(active);
        setSolvedComplaints(solved);
        setComplaints(complainData);
      } catch (error) {
        console.error("Error fetching complaints: ", error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Complaints List
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5">
        {/* Header */}
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Complaint Type</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Register Number</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Room Number</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Complaint Raised</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Status</p>
        </div>
      </div>

      {/* Active Complaints */}
      {activeComplaints.length > 0 && (
        <div className="border-t border-stroke px-4 py-2 dark:border-strokedark">
          <h4 className="text-lg font-semibold text-black dark:text-white mb-2">
            Active Complaints
          </h4>
          {activeComplaints.map((complaint, key) => (
            <div
              className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5"
              key={key}
            >
              {/* Content */}
              <div className="col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-black dark:text-white">
                    {complaint.Category}
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {complaint.Registration}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {complaint.Room}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {findRelativeDate(complaint.Date)}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-meta-3">
                  <span className="rounded-lg bg-red p-2 text-white">Active</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Solved Complaints */}
      {solvedComplaints.length > 0 && (
        <div className="border-t border-stroke px-4 py-2 dark:border-strokedark">
          <h4 className="text-lg font-semibold text-black dark:text-white mb-2">
            Solved Complaints
          </h4>
          {solvedComplaints.map((complaint, key) => (
            <div
              className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5"
              key={key}
            >
              {/* Content */}
              <div className="col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-black dark:text-white">
                    {complaint.Category}
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {complaint.Registration}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {complaint.Room}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {findRelativeDate(complaint.Date)}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-meta-3">
                  <span className="rounded-lg bg-green-400 p-2 text-white">
                    Solved
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Complaint;

// import { Product } from "@/types/product";
// import { useState, useEffect } from "react";
// import { db } from "@/firebase/config";
// import { collection, getDocs, doc } from "firebase/firestore";

// const productData = [
//   {
//     image: "/images/product/product-01.png",
//     name: "Apple Watch Series 7",
//     category: "Electronics",
//     price: 296,
//     sold: 22,
//     profit: 45,
//   },
//   {
//     image: "/images/product/product-02.png",
//     name: "Macbook Pro M1",
//     category: "Electronics",
//     price: 546,
//     sold: 12,
//     profit: 125,
//   },
//   {
//     image: "/images/product/product-03.png",
//     name: "Dell Inspiron 15",
//     category: "Electronics",
//     price: 443,
//     sold: 64,
//     profit: 247,
//   },
//   {
//     image: "/images/product/product-04.png",
//     name: "HP Probook 450",
//     category: "Electronics",
//     price: 499,
//     sold: 72,
//     profit: 103,
//   },
// ];

// const Complaint = () => {
//   const [complain, setComplain] = useState([]);
//   const [relativeDate, setRelativeDate] = useState("");

//     const findRelativeDate = (date) => {
//       console.log("complain.Date: ", date);
//       const currentDate = new Date();
//       const complainDate = new Date(date);
//       const differenceInDays = Math.floor((currentDate - complainDate) / (1000 * 60 * 60 * 24));

//       if (differenceInDays === 0) {
//         return("Today");
//       } else if (differenceInDays === 1) {
//         return("1 day ago");
//       } else if (differenceInDays === 2) {
//         return("2 days ago");
//       } else {
//         return(`${differenceInDays} days ago`);
//       }
//     };


//     useEffect(() => {
//       // Function to fetch messages from Firebase
//       const fetchComplaints = async () => {
//         try {
//           const complainCollection = collection(db, "Complaints");
//           const messagesSnapshot = await getDocs(complainCollection);
//           const complainData = messagesSnapshot.docs.map((doc) => {
//             const data = doc.data();
//             data.id = doc.id;
//             return data;
//           });
    
//           // Sort the complaints by date
//           complainData.sort((a, b) => {
//             const dateA = new Date(a.Date);
//             const dateB = new Date(b.Date);
//             return dateB - dateA; // Descending order
//           });
    
//           console.log("Complaints data: ", complainData);
//           setComplain(complainData);
//         } catch (error) {
//           console.error("Error fetching messages: ", error);
//         }
//       };
    
//       fetchComplaints();
//     }, []);
    

//   return (
//     <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//       <div className="px-4 py-6 md:px-6 xl:px-7.5">
//         <h4 className="text-xl font-semibold text-black dark:text-white">
//           Complaints List
//         </h4>
//       </div>

//       <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5">
//         <div className="col-span-3 flex items-center">
//           <p className="font-medium">Complaint Type</p>
//         </div>
//         <div className="col-span-2 hidden items-center sm:flex">
//           <p className="font-medium">Register Number</p>
//         </div>
//         <div className="col-span-1 flex items-center">
//           <p className="font-medium">Room Number</p>
//         </div>
//         <div className="col-span-2 flex items-center">
//           <p className="font-medium">Complaint Raised</p>
//         </div>
//         <div className="col-span-1 flex items-center">
//           <p className="font-medium">Status</p>
//         </div>
//       </div>

//       {complain.map((complain, key) => (
//         <div
//           className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5"
//           key={key}
//         >
//           <div className="col-span-3 flex items-center">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//               {/* <div className="h-12.5 w-15 rounded-md">
//                 <Image
//                   src={product.image}
//                   width={60}
//                   height={50}
//                   alt="Product"
//                 />
//               </div> */}
//               <p className="text-sm text-black dark:text-white">
//                 {complain.Category}
//               </p>
//             </div>
//           </div>
//           <div className="col-span-2 hidden items-center sm:flex">
//             <p className="text-sm text-black dark:text-white">
//               {complain.Registration}
//             </p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="text-sm text-black dark:text-white">
//               {complain.Room}
//             </p>
//           </div>
//           <div className="col-span-2 flex items-center">
//             <p className="text-sm text-black dark:text-white">{findRelativeDate(complain.Date)}</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="text-sm text-meta-3">
//               {complain.Status == 0 ? (
//                 <span className="rounded-lg bg-green-400 p-2 text-white">
//                   Solved
//                 </span>
//               ) : (
//                 <span className="rounded-lg bg-red p-2 text-white">Active</span>
//               )}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Complaint;
