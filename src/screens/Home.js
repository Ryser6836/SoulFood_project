// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Carousel from "../components/Carousel";
// import Card from "../components/Card";
// export default function Home() {
//   const [foodCat, setFoodCat] = useState([]);
//   const [foodItem, setFoodItem] = useState([]);

//   const loadData = async () => {
//     let response = await fetch("http://localhost:5000/api/foodData", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     response = await response.json();

//     setFoodItem(response[0]);
//     setFoodCat(response[1]);
//     // console.log(response[0], response[1]);
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   return (
//     <div>
//       <div>
//         <Navbar />
//       </div>
//       <div>
//         <Carousel />
//       </div>
//       <div className="container">
//         {/* {console.log(foodCat)} */}
//         {foodCat !== []
//           ? foodCat.map((data) => {
//               return (
//                 <div className="row mb-3">
//                   <div key={data._id} className="fs-3 m-3">
//                     {data.CategoryName}
//                   </div>
//                   <hr />
//                   {foodItem !== [] ? (
//                     foodItem
//                       .filter((item) => item.CategoryName === data.CategoryName)
//                       .map((filterItems) => {
//                         return (
//                           <div
//                             key={filterItems._id}
//                             className="col-12 col-md-6 col-lg-3"
//                           >
//                             <Card
//                               foodName={filterItems.name}
//                               options={filterItems.options[0]}
//                               imgSrc={filterItems.img}
//                             ></Card>
//                           </div>
//                         );
//                       })
//                   ) : (
//                     <div>No Such Data Found</div>
//                   )}
//                 </div>
//               );
//             })
//           : ""}
//       </div>
//       <div>
//         <Footer />
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
  // .map function works only on Array and not on object
  const [search, setSearch] = useState("");
  const [, setSearchResults] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []); // on every render (no dependency)

  const handleSearch = (query) => {
    // Filter the foodItem array based on the search query
    const filteredFoodItems = foodItem.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    // Update the search results state with the filtered food items
    setSearchResults(filteredFoodItems);
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
        />
      </div>
      <div className="container">
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== [] ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              foodName={filterItems.name}
                              options={filterItems.options[0]}
                              imgSrc={filterItems.img}
                              description={filterItems.description}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No such data found</div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
