import React, { useState, useEffect, lazy, Suspense } from 'react';

import { Loader, FormField } from '../components';

const LazyCard = lazy(() => import('../components/Card'));

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => (
      <Suspense fallback={<div>Loading...</div>} key={post.id}>
        <LazyCard {...post} />
      </Suspense>
    ));
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  // ... (rest of your component code)
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
         const response = await fetch('https://image-generation-1v47.onrender.com/api/v1/post',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
         })

         if(response.ok) {
          const result = await response.json();

          setAllPosts(result.data.reverse());
         }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
      const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));

      setSearchedResults(searchResults)
    }, 500)
    );
    
  }

  return (
    <section className='max-w-7xl mx-auto mt-[50px]'>
      <div className="font-extrabold text-[#222328] text-[32px]">
        <h1>The Community Showcase</h1>
        <p className="mt-2 text-[#665e75] text-[16px] max-w[500px]">Browse through a collection of imaginative and visually stunning images generated by <span className=' text-cyan-700'>IMAGE BOT</span></p>
      </div>

      <div className='mt-16'>
        <FormField 
          LabelName="Search Posts"
          type="text"
          name="text"
          placeholder="Search Posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#665e75] text-xl mb-3">Showing results for <span className="text-[#222328]">{searchText}</span></h2>
            )}

            <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found" 
                />
              ) : (
                <RenderCards
                  data={allPosts} 
                  title="No posts found" 
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;


// import React, { useState, useEffect} from 'react';

// import { Loader, Card, FormField } from '../components';


// const RenderCards = ({ data, title}) => {
//   if(data?.length > 0) {
//     return data.map((post) => <Card key={post.id} {...post} />)
//   }

//   return(
//     <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
//   )
// }

// const Home = () => {
//   const [loading, setLoading] = useState(false);
//   const [allPosts, setAllPosts] = useState(null);

//   const [searchText, setSearchText] = useState('');
//   const [searchedResults, setSearchedResults] = useState(null);
//   const [searchTimeout, setSearchTimeout] = useState(null)

//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true);

//       try {
//          const response = await fetch('https://image-generation-1v47.onrender.com/api/v1/post',{
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//          })

//          if(response.ok) {
//           const result = await response.json();

//           setAllPosts(result.data.reverse());
//          }
//       } catch (error) {
//         console.log(error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchPosts();
//   }, []);

//   const handleSearchChange = (e) => {
//     clearTimeout(searchTimeout);

//     setSearchText(e.target.value);

//     setSearchTimeout(
//       setTimeout(() => {
//       const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));

//       setSearchedResults(searchResults)
//     }, 500)
//     );
    
//   }

//   return (
//     <section className='max-w-7xl mx-auto mt-[50px]'>
//         <div className="font-extrabold text-[#222328] text-[32px]">
//           <h1>The Community Showcase</h1>
//           <p className="mt-2 text-[#665e75] text-[16px] max-w[500px]">Browse through a collection of imaginative and vissually stunning images generated by <span className=' text-cyan-700'>IMAGE BOT</span></p>
//         </div>

//         <div className='mt-16'>
//           <FormField 
//             LabelName="Search Posts"
//             type="text"
//             name="text"
//             placeholder="Search Posts"
//             value={searchText}
//             handleChange={handleSearchChange}
//           />
//         </div>

//         <div className='mt-10'>
//           {loading ? (
//             <div className='flex justify-center items-center'>
//               <Loader />
//             </div>
//           ) : (
//             <>
//             {searchText && (
//               <h2 className="font-medium text-[#665e75] text-xl mb-3">Showing results for <span className="text-[#222328]">{searchText}</span></h2>
//             )}

//             <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 gap-3">
//               {searchText ? (
//                 <RenderCards
//                 data={searchedResults}
//                 title="No search results found" 
//                 />
//               ):(
//                 <RenderCards
//                 data={allPosts} 
//                 title="No posts found" 
//                 />
//               )}
//             </div>
//             </>
//           )}
//         </div>
//     </section>
//   )
// }

// export default Home