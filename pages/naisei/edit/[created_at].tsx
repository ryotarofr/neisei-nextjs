// "use client";

// import { useRouter } from "next/navigation";
// import React, { Fragment, useEffect, useRef } from "react";
// import { Toaster, toast } from "react-hot-toast";

// type UpdateBlogParams = {
//   naisei: string;
//   evaluation_type: any
//   created_at: any
// };

// // const updateBlog = async (data: UpdateBlogParams) => {
// //   const res = fetch(`http://localhost:3000/api/naisei/${data.created_at}`, {
// //     method: "PUT",
// //     body: JSON.stringify({ naisei: data.naisei, evaluation_type: data.evaluation_type }),
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //   });
// //   return (await res).json();
// // };

// const getBlogById = async (created_at: any) => {
//   const res = await fetch(`http://localhost:3000/api/naisei/${created_at}`);
//   const data = await res.json();
//   return data.naisei;
// };

// // const deleteBlog = async (id: number) => {
// //   const res = fetch(`http://localhost:3000/api/blog/${id}`, {
// //     method: "DELETE",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //   });
// //   return (await res).json();
// // };

// const EditBlog = ({ params }: { params: { created_at: any } }) => {
//   const router = useRouter();
//   const titleRef = useRef<HTMLInputElement | null>(null);
//   const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (titleRef.current && descriptionRef.current) {
//       toast.loading("Sending Request 🚀", { id: "1" });

//       // await updateBlog({
//       //   title: titleRef.current?.value,
//       //   description: descriptionRef.current?.value,
//       //   id: params.id,
//       // });

//       toast.success("Blog Posted Successfully", { id: "1" });

//       router.push("/");
//       router.refresh();
//     }
//   };

//   // const handleDelete = async () => {
//   //   toast.loading("Deleting Blog", { id: "2" });
//   //   await deleteBlog(parseInt(params.id));
//   // };

//   useEffect(() => {
//     toast.loading("Fetching Blog Details 🚀", { id: "1" });
//     getBlogById((params.created_at))
//       .then((data) => {
//         if (titleRef.current && descriptionRef.current) {
//           titleRef.current.value = data.title;
//           descriptionRef.current.value = data.description;
//           toast.success("Fetching Completed", { id: "1" });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error("Error Fetching Blog", { id: "1" });
//       });
//   }, []);

//   return (
//     <>
//       <Toaster />
//       <div className="w-full m-auto flex my-4">
//         <div className="flex flex-col justify-center items-center m-auto">
//           <p className="text-2xl text-slate-200 font-bold p-3">
//             Edit a Wonderful Blog 🚀
//           </p>
//           <form onSubmit={handleSubmit}>
//             <input
//               ref={titleRef}
//               placeholder="Enter Title"
//               type="text"
//               className="rounded-md px-4 w-full py-2 my-2"
//             />
//             <textarea
//               ref={descriptionRef}
//               placeholder="Enter Description"
//               className="rounded-md px-4 py-2 w-full my-2"
//             ></textarea>
//             <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
//               Update
//             </button>
//             <button
//               // onClick={handleDelete}
//               className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100"
//             >
//               Delete
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditBlog;
