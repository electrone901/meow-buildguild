"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsHeartFill } from "react-icons/bs";
import { MyContext } from "~~/components/ScaffoldEthAppWithProviders";

const backgroundImageStyle = {
  backgroundImage: 'url("/assets/background.jpg")',
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "120vh", // Set to full height of the viewport
};

const products = [
  {
    name: "Coconut",
    img: "/assets/image 4.png",
    calories: "56",
    price: "3.99",
  },
  {
    name: "Watermelon",
    img: "/assets/image 5.png",
    calories: "120",
    price: "4.99",
  },
  {
    name: "Fish",
    img: "/assets/image 1.png",
    calories: "120",
    price: "5.99",
  },
  {
    name: "Grapes",
    img: "/assets/image 2.png",
    calories: "56",
    price: "2.99",
  },
  {
    name: "Pasta",
    img: "/assets/image 3.png",
    calories: "86",
    price: "4.99",
  },
  {
    name: "Water",
    img: "/assets/image 6.png",
    calories: "10",
    price: "1.99",
  },
];

// NEEDED TO do new screen step 9
function SelectFood() {
  const [selected, setSelected] = useState<any>();
  const { selectedFood, setSelectedFood, catSelected } = useContext<any>(MyContext);

  const router = useRouter();

  return (
    <div style={backgroundImageStyle}>
      <div className="flex items-center justify-center">
        <div className="w-[70%] mt-40">
          <div className="mb-20">
            {selected == -1 && (
              <p className="font-bold text-3xl text-black px-2 py-2">
                Let’s see what {catSelected ? catSelected.name : "MOMOTO"} likes to eat today.
              </p>
            )}
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div className=" col-span-2">
              {selected !== -1 && (
                <div className="relative inline-block bg-white text-black p-4 rounded-lg items-center justify-center">
                  <span> I love </span>
                  <div className="relative z-1 flex items-center ">
                    <p>{selectedFood.name} ~Meow~</p>
                    <BsHeartFill color="red" fontSize={25} className="ml-1" />
                    <BsHeartFill color="red" fontSize={25} className="ml-1" />
                  </div>
                  <div className="absolute h-8 w-8 bg-white transform rotate-45 -mb-8 left-1/2 -translate-x-2 after:block after:w-8 after:h-8 after:bg-white after:absolute after:transform after:rotate-225 after:-mb-8 after:left-1/2 after:-translate-x-2"></div>
                </div>
              )}
              <div className="flex items-center justify-center  z-20">
                <Image
                  src={catSelected?.front ? catSelected.front : "/assets/cat 001.png"}
                  width={1900}
                  height={1900}
                  alt="pet"
                  className={`object-cover w-[300px] h-[400px] mt-[-50px] text-center border-8 border-white rounded-lg`}
                />
              </div>
              <p className="font-semibold text-3xl text-black px-2 py-2  text-center">
                {catSelected?.name ? catSelected.name : "MOMOTO."}
              </p>
            </div>

            <div className="col-span-3 ">
              <div className="bg-[#FFECCE] border-8 border-white rounded-md">
                <div className="flex flex-wrap justify-center items-center text-center py-14">
                  {products.map((product, idx) => (
                    <div key={idx} className="w-1/3 p-4 flex flex-col items-center">
                      <Image
                        src={product?.img ? product.img : "/assets/image 4.png"}
                        width={120}
                        height={120}
                        alt="pet"
                        className={`object-cover w-24 h-24 cursor-pointer ${
                          selected === product?.name && "border-4 border-dotted border-black p-4 rounded-lg"
                        }`}
                        onClick={() => {
                          setSelected(product?.name);
                          setSelectedFood(product);
                        }}
                      />
                      <div className="text-center mt-2">
                        <small>Price ${product?.price ? product.price : "3.99"}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-around mt-8 ">
                <button
                  className={`bg-[#02B53C] text-white border-4 border-white px-8 py-4 rounded-xl transition duration-300 ease-in-out text-3xl w-[250px] ${
                    selected == -1 ? "cursor-not-allowed opacity-50" : "hover:bg-[#72d35a]"
                  }`}
                  onClick={() => router.push("/foodPayment")}
                >
                  Start
                </button>
              </div>
            </div>

            {/* <div className="col-span-3 ">
              <div className="bg-[#FFECCE]  border-8 border-white rounded-md">
                <div className="flex flex-wrap justify-center items-center text-center ">
                  {products.map((product, idx) => (
                    <div key={idx} className="w-1/3 p-4  items-center text-center ">
                      <Image
                        src={product?.img ? product.img : "/assets/image 4.png"}
                        width={1900}
                        height={1900}
                        alt="pet"
                        className={`object-cover w-[120px] h-[120px] cursor-pointer text-center  items-center ${
                          selected === product?.name && "border-4 border-dotted border-black p-4  rounded-lg"
                        }`}
                        onClick={() => {
                          setSelected(product?.name);
                          setSelectedFood(product);
                        }}
                      />
                      <div className="text-center">
                        <small>Price $3.99</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}

            {/* <div className="col-span-3 ">
              <div className="bg-[#FFECCE]  border-8 border-white rounded-md ">
                <div className="flex items-center justify-around pt-8">
                  {products.map((product, idx) => (
                    <div key={idx}>
                      <Image
                        src={product?.img ? product.img : "/assets/image 4.png"}
                        width={1900}
                        height={1900}
                        alt="pet"
                        className={`object-cover w-[120px] h-[120px] cursor-pointer ${
                          selected === product?.name && "border-4 border-dotted border-black p-4  rounded-lg"
                        }`}
                        onClick={() => {
                          setSelected(product?.name);
                          // setSelectedFood("Coconut");
                          // Pasta: {
                          //   name: "Pasta",
                          //   img: "/assets/image 3.png",
                          //   calories: "86",
                          //   price: "4.99",
                          // },

                          setSelectedFood(product);
                        }}
                      />
                      <div className="text-center">
                        <small>$3.99</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className=" col-span-3 ">
              <div className="bg-[#FFECCE]  border-8 border-white rounded-md ">
                <div className="flex items-center justify-around pt-8">
                  <div>
                    <Image
                      src="/assets/image 4.png"
                      width={1900}
                      height={1900}
                      alt="pet"
                      className={`object-cover w-[120px] h-[120px] cursor-pointer ${
                        selected === 1 && "border-4 border-dotted border-black p-4  rounded-lg"
                      }`}
                      onClick={() => {
                        setSelected(1);
                        setSelectedFood("Coconut");
                      }}
                    />
                    <div className="text-center">
                      <small>$3.99</small>
                    </div>
                  </div>
                  <div>
                    <Image
                      src="/assets/image 5.png"
                      width={1900}
                      height={1900}
                      alt="pet"
                      className={`object-cover w-[120px] h-[120px] cursor-pointer ${
                        selected === 2 && "border-4 border-dotted border-black p-4  rounded-lg"
                      }`}
                      onClick={() => {
                        setSelected(2);
                        setSelectedFood("Watermelon");
                      }}
                    />
                    <div className="text-center">
                      <small>$3.99</small>
                    </div>
                  </div>
                  <div>
                    <Image
                      src="/assets/image 1.png"
                      width={1900}
                      height={1900}
                      alt="pet"
                      className={`object-cover w-[120px] h-[120px] cursor-pointer ${
                        selected === 3 && "border-4 border-dotted border-black p-4  rounded-lg"
                      }`}
                      onClick={() => {
                        setSelected(3);
                        setSelectedFood("Fish");
                      }}
                    />
                    <div className="text-center">
                      <small>$3.99</small>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-around py-16">
                  <div>
                    <Image
                      src="/assets/image 2.png"
                      width={1900}
                      height={1900}
                      alt="pet"
                      className={`object-cover w-[120px] h-[120px] cursor-pointer ${
                        selected === 4 && "border-4 border-dotted border-black p-4  rounded-lg"
                      }`}
                      onClick={() => {
                        setSelected(4);
                        setSelectedFood(products["Grapes"]);
                      }}
                    />
                    <div className="text-center">
                      <small>$3.99</small>
                    </div>
                  </div>

                  <div>
                    <Image
                      src="/assets/image 3.png"
                      width={1900}
                      height={1900}
                      alt="pet"
                      className={`object-cover w-[120px] h-[120px] cursor-pointer ${
                        selected === 5 && "border-4 border-dotted border-black p-4  rounded-lg"
                      }`}
                      onClick={() => {
                        setSelected(5);
                        setSelectedFood("Fried Rice");
                      }}
                    />
                    <div className="text-center">
                      <small>$3.99</small>
                    </div>
                  </div>

                  <div>
                    <Image
                      src="/assets/image 6.png"
                      width={1900}
                      height={1900}
                      alt="pet"
                      className={`object-cover w-[120px] h-[120px] cursor-pointer ${
                        selected === 6 && "border-4 border-dotted border-black p-4  rounded-lg"
                      }`}
                      onClick={() => {
                        setSelected(6);
                        setSelectedFood("Water");
                      }}
                    />

                    <div className="text-center">
                      <small>$3.99</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-around mt-8 ">
                <button
                  className={`bg-[#02B53C] text-white border-4 border-white px-8 py-4 rounded-xl transition duration-300 ease-in-out text-3xl w-[250px] ${
                    selected == -1 ? "cursor-not-allowed opacity-50" : "hover:bg-[#72d35a]"
                  }`}
                  onClick={() => router.push("/foodPayment")}
                >
                  Start
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectFood;
