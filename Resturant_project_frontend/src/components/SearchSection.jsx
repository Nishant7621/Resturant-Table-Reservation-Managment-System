import { useState } from "react";

const SearchSection = ({ setSearchData }) => {

  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);


  const cityAreas = {

    Bhopal: [
      "MP Nagar",
      "Indrapuri",
      "Kolar Hills",
      "Mandideep",
      "New Market",
      "Awadhpuri",
      "Hoshangabad Road"
    ],


    Indore: [
      "Vijay Nagar",
      "Palasia",
      "Bhawarkua",
      "Rau",
      "Scheme No. 78",
      "MG Road",
      "Sapna Sangeeta Road"
    ],


    Nagpur: [
      "Dharampeth",
      "Sadar",
      "Sitabuldi",
      "Manish Nagar",
      "Wardha Road",
      "Pratap Nagar",
      "Civil Lines"
    ],


    Pune: [
      "Koregaon Park",
      "Viman Nagar",
      "Baner",
      "Hinjewadi",
      "Kothrud",
      "Shivajinagar",
      "FC Road"
    ]

  };



  const handleSearch = () => {

    setSearchData({
      city,
      area,
      date,
      time,
      guests
    });

  };



  return (

    <section 
      id="search" 
      className="w-full py-20 px-8 bg-gray-100"
    >


      <div className="max-w-7xl mx-auto text-center">


        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Find Your Perfect Table
        </h2>


        <p className="text-gray-500 mb-12">
          Search restaurants by date, time, guests, city and area.
        </p>




        <div className="
          bg-white
          shadow-xl
          rounded-2xl
          p-8
          flex
          flex-wrap
          gap-5
          items-end
          justify-between
        ">



          {/* Date */}

          <div className="flex flex-col flex-1 min-w-[180px]">

            <label className="text-left font-semibold mb-2">
              Date
            </label>


            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3"
            />

          </div>




          {/* Time */}

          <div className="flex flex-col flex-1 min-w-[180px]">

            <label className="text-left font-semibold mb-2">
              Time
            </label>


            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3"
            />

          </div>





          {/* Guests */}

          <div className="flex flex-col flex-1 min-w-[180px]">

            <label className="text-left font-semibold mb-2">
              Guests
            </label>


            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3"
            >

              <option value="1">
                1 Guest
              </option>

              <option value="2">
                2 Guests
              </option>

              <option value="3">
                3 Guests
              </option>

              <option value="4">
                4 Guests
              </option>

              <option value="5">
                5 Guests
              </option>

              <option value="6">
                6 Guests
              </option>

              <option value="7">
                7+ Guests
              </option>


            </select>

          </div>





          {/* City */}

          <div className="flex flex-col flex-1 min-w-[180px]">


            <label className="text-left font-semibold mb-2">
              Select City
            </label>



            <select

              value={city}

              onChange={(e)=>{

                setCity(e.target.value);
                setArea("");

              }}

              className="
              border
              border-gray-300
              rounded-lg
              px-4
              py-3
              "

            >


              <option value="">
                Choose City
              </option>


              <option value="Bhopal">
                Bhopal
              </option>


              <option value="Indore">
                Indore
              </option>


              <option value="Nagpur">
                Nagpur
              </option>


              <option value="Pune">
                Pune
              </option>


            </select>


          </div>







          {/* Area */}


          <div className="flex flex-col flex-1 min-w-[180px]">


            <label className="text-left font-semibold mb-2">
              Select Area
            </label>



            <select

              value={area}

              onChange={(e)=>setArea(e.target.value)}

              disabled={!city}

              className="
              border
              border-gray-300
              rounded-lg
              px-4
              py-3
              disabled:bg-gray-200
              "

            >


              <option value="">
                {
                  city
                  ? "Choose Area"
                  : "Select City First"
                }
              </option>



              {
                city &&
                cityAreas[city].map((item,index)=>(

                  <option 
                    key={index}
                    value={item}
                  >
                    {item}
                  </option>

                ))
              }


            </select>


          </div>







          {/* Search Button */}


          <button

            onClick={handleSearch}

            className="
            bg-orange-600
            hover:bg-orange-700
            text-white
            px-8
            py-3
            rounded-lg
            transition
            "

          >

            Search

          </button>




        </div>


      </div>


    </section>

  );

};


export default SearchSection;
