"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { update } from "firebase/database";

const FormLayout = () => {
  // State to store the input values
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [contents, setContents] = useState([]);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      // Delete the content from Firebase
      await deleteDoc(doc(db, "posts", id));
      // Update the contents state by filtering out the deleted content
      setContents(contents.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error("Error deleting content: ", error);
    }
  };

  useEffect(() => {
    // Function to fetch contents from Firebase
    const fetchContents = async () => {
      try {
        const contentsCollection = collection(db, "posts");
        const contentsSnapshot = await getDocs(contentsCollection);
        const contentsData = contentsSnapshot.docs.map((doc) => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
        console.log("Contents data: ", contentsData);
        setContents(contentsData);
      } catch (error) {
        console.error("Error fetching contents: ", error);
      }
    };

    fetchContents();

    console.log("Contents : ", contents);
  }, [title === "", content === ""]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Add the content to Firebase
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        content,
        url,
        date: new Date(), // Set notification date to current date
        status: "sent", // Set status to "sending" as it's a new content
      });

      console.log("Document written with ID: ", docRef.id);

      // Reset the form fields after submission
      setTitle("");
      setContent("");
      setUrl("");

      // Update the contents state to reflect the new content added
      // setTimeout(() => {
      //   setContents([...contents, { title, content }]);
      // }, 5000);
      // await updateDoc(doc(db, "contents", docRef.id), {
      //   status: "sent", // Update the status to "sent" after the content is sent
      // });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Function to handle input changes for title field
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Function to handle input changes for content field
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Notify Students" />

      <div className="flex flex-col gap-9">
        {/* Contact Form */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Contact Form
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Image
                </label>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={url}
                  onChange={handleUrlChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Content
                </label>
                <textarea
                  rows={6}
                  placeholder="Type your content"
                  value={content}
                  onChange={handleContentChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Send Content
              </button>
            </div>
          </form>
        </div>
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Content
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Date
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {contents.map((packageItem, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {packageItem.content}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.date.toDate().toLocaleDateString()}{" "}
                        {/* Convert to date object and then to locale string */}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                          packageItem.status === "sent"
                            ? "text-sent bg-success"
                            : "bg-warning text-warning"
                        }`}
                      >
                        {packageItem.status}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => {
                            handleDelete(packageItem.id);
                          }}
                          className="hover:bg-primary"
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <title></title>{" "}
                              <g id="Complete">
                                {" "}
                                <g id="edit">
                                  {" "}
                                  <g>
                                    {" "}
                                    <path
                                      d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
                                      fill="none"
                                      stroke="#9a9996"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                    ></path>{" "}
                                    <polygon
                                      fill="none"
                                      points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
                                      stroke="#9a9996"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                    ></polygon>{" "}
                                  </g>{" "}
                                </g>{" "}
                              </g>{" "}
                            </g>
                          </svg>
                        </button>
                        <button
                          className="hover:text-primary"
                          onClick={() => {
                            handleDelete(packageItem.id);
                          }}
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                              fill=""
                            />
                            <path
                              d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                              fill=""
                            />
                            <path
                              d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                              fill=""
                            />
                            <path
                              d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;

// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import { useEffect, useState } from "react";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import { db } from "@/firebase/config";
// import { collection, getDocs, doc, addDoc } from "firebase/firestore";

// {/* <!-- TODO: fetch from firebase --> */ }
// const packageData = [
//   {
//     content: "All students are requested to come and give attendance All students are requested to come and give attendance All students are requested to come and give attendance All students are requested to come and give attendance ",
//     date: `Jan 13,2023`,
//     status: "sent",
//   },
//   {
//     content: "Standard Package",
//     date: `Jan 13,2023`,
//     status: "sent",
//   },
//   {
//     content: "Business Package",
//     date: `Jan 13,2023`,
//     status: "sending",
//   },
//   {
//     content: "Standard Package",
//     date: `Jan 13,2023`,
//     status: "sent",
//   },
// ];

// const FormLayout = () => {

//   const [content, setContent] = useState([]);
//   const [newContent, setNewContent] = useState(null); // State to store the new content

//   useEffect(() => {
//     const getContent = async () => {
//       const contentRef = collection(db, "contents");
//       const querySnapshot = await getDocs(contentRef);
//       const data = querySnapshot.docs.map((doc) => doc.data());
//       setContent(data);
//     }
//     getContent();

//     console.log(content);
//   }, [])

//   const handleSubmit = async () => {
//     if (newContent) {
//       try {
//         console.log(newContent);
//         const docRef = await addDoc(collection(db, "contents"), newContent);
//         console.log("Document written with ID: ", docRef.id);
//         // Optionally, you can update the state to reflect the new content added
//         setContent(prevContents => [...prevContents, newContent]);
//         setNewContent(null); // Reset newContent state
//       } catch (error) {
//         console.error("Error adding document: ", error);
//       }
//     }
//   }

//   // Function to handle input changes and update newContent state accordingly
//   const handleInputChange = () => {
//     const { value } = event.target;
//     setNewContent(prevContent => ({
//       ...prevContent,
//       [key]: value
//     }));
//   }

//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="Notify Students" />

//       <div className="flex flex-col gap-9">
//         {/* <!-- Contact Form --> */}
//         <div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//           <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
//             <h3 className="font-medium text-black dark:text-white">
//               Contact Form
//             </h3>
//           </div>
//           <form action="#">
//             <div className="p-6.5">
//               <div className="mb-4.5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Select title"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                 />
//               </div>

//               <div className="mb-6">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Content
//                 </label>
//                 <textarea
//                   rows={6}
//                   placeholder="Type your content"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                 ></textarea>
//               </div>

//               <button onClick={handleSubmit} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
//                 Send Content
//               </button>
//             </div>
//           </form>
//         </div>
//         {/* <!-- Contact Form Ends --> */}

//         {/* <!-- Previous contents --> */}
// <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//   <div className="max-w-full overflow-x-auto">
//     <table className="w-full table-auto">
//       <thead>
//         <tr className="bg-gray-2 text-left dark:bg-meta-4">
//           <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
//             Content
//           </th>
//           <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
//             Date
//           </th>
//           <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
//             Status
//           </th>
//           <th className="px-4 py-4 font-medium text-black dark:text-white">
//             Actions
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         {packageData.map((packageItem, key) => (
//           <tr key={key}>
//             <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
//               <h5 className="font-medium text-black dark:text-white">
//                 {packageItem.content}
//               </h5>
//             </td>
//             <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
//               <p className="text-black dark:text-white">
//                 {packageItem.date
//                 }
//               </p>
//             </td>
//             <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
//               <p
//                 className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${packageItem.status === "sent"
//                     ? "bg-success text-sent"
//                     : "bg-warning text-warning"
//                   }`}
//               >
//                 {packageItem.status}
//               </p>
//             </td>
//             <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
//               <div className="flex items-center space-x-3.5">
//                 <button className="hover:bg-primary">
//                   <svg className="fill-current"
//                     width="18"
//                     height="18"
//                     viewBox="0 0 22 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#9a9996" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#9a9996" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon> </g> </g> </g> </g></svg>

//                 </button>
//                 <button className="hover:text-primary">

//                   <svg
//                     className="fill-current"
//                     width="18"
//                     height="18"
//                     viewBox="0 0 18 18"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
//                       fill=""
//                     />
//                     <path
//                       d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
//                       fill=""
//                     />
//                     <path
//                       d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
//                       fill=""
//                     />
//                     <path
//                       d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
//                       fill=""
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>
//         {/* <!-- Previous contents end --> */}

//       </div>
//     </DefaultLayout>
//   );
// };

// export default FormLayout;
