import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";



const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("https://image-generation-1v47.onrender.com/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });
  
        // Parse the JSON response
        const data = await response.json();
  
        // Check if the data contains the image URL in the expected format
        if (data && data.photo) {
          // Update the form.photo state with the image URL
          setForm({ ...form, photo: data.photo });
        } else {
          alert("Invalid response from the API");
        }
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide a proper prompt");
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("https://image-generation-1v47.onrender.com/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        await response.json();
        alert("Success");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Generate an imaginative image through DALL-E AI and share it with the
          community
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Jon Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
              src={form.photo}
              alt={form.prompt}
              className="w-full h-full object-contain"
            />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-gradient-to-r fro from-sky-500 via-40% to-emerald-500 to-60% font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with
            others in the community **
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-gradient-to-r from-cyan-500 to-blue-500 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the Community" }
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;


// import React, {useState} from 'react';
// import { useNavigate } from 'react-router-dom'

// import { preview } from '../assets'; 
// import { getRandomPrompt } from '../utils';
// import { FormField, Loader } from '../components';




// const CreatePost = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: '',
//     prompt: '',
//     photo: '',
//   });
//   const [generatingImg, setGeneratingImg] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const generateImage = async () => {
//     if(form.prompt){
//       try{
//         setGeneratingImg(true);
//         const response = await fetch(
//         "https://api.openai.com/v1/images/generations",
//         {method:"POST", 
//         headers:{
//           "Content-Type": "application/json",
//       },
//         body: JSON.stringify({
//         prompt: form.prompt,
//         n:1,
//         size: "512x512",
//       }),
//         })

//         let data = await response.json();
//         const image = data.data

//         setForm({ ...form, photo: image[0].url });

//       } catch(error){
//         alert(error);
//       }
//         finally{
//         setGeneratingImg(false);
//       }
//       } 
//     else {
//       alert("Please enter a text to be generated")
//     }
//   }

//   const handleSubmit = () => {

//   }

//   const handleChange = (e) => {
//     setForm({...form, [e.target.name]: e.target.value})
//   }

//   const handleSurpriseMe = () => {
//     const randomPrompt = getRandomPrompt(form.prompt);
//     setForm({ ...form, prompt: randomPrompt });
//   }

//   return (
//     <section className="max-w-7xl mx-auto">
//       <div className="font-extrabold text-[#222328] text-[32px]">
//           <h1>Create</h1>
//           <p className="mt-2 text-[#665e75] text-[16px] max-w[500px]">Create imaginative and vissually stunning images through DALL-E AI and share them with the community</p>
//         </div>

//         <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
//           <div className="flex flex-col gap-5">
//             <FormField 
//               LabelName="Your Name"
//               type="text"
//               name="name"
//               placeholder="John Doe"
//               value={form.name}
//               handleChange={handleChange}
//             />
//             <FormField 
//               LabelName="Prompt"
//               type="text"
//               name="prompt"
//               placeholder="3D render of a cute tropical fish in an aquarium on a dark blue background, digital art"
//               value={form.prompt}
//               handleChange={handleChange}
//               isSurpriseMe
//               handleSurpriseMe={handleSurpriseMe}
//             />

//             <div className="relative bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
//               {form.photo ? (
//                 <img 
//                 src={form.photo} 
//                 alt={form.prompt} 
//                 className="w-full h-full object-contain"
//                 />
//               ): (
//                 <img 
//                 src={preview}
//                 alt="preview" 
//                 className="w-9/12 h-9/12 object-contain opacity-40"
//                 />
//               )}

//               {generatingImg && (
//                 <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
//                   <Loader />
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="mt-5 flex gap-5">
//                 <button
//                 type="button"
//                 onClick={generateImage}
//                 className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//                 >

//                 {generatingImg ? 'Generating...' : 'Generate'}
//                 </button>
//           </div>

//           <div className="mt-10">
//                 <p className="mt-2 text-[#665e75] text-[14px]">Once you have created the image you want, you can share it with the others in the community</p>
//                 <button
//                 type='submit'
//                 className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
//                 >
//                   {loading ? 'Sharing...' : 'Share with the community'}
//                 </button>
//           </div>
//         </form>
//     </section>
//   )
// }

// export default CreatePost