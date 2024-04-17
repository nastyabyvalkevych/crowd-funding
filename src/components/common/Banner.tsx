import React from "react";
import banner2 from "@/../../public/images/banner2.jpg";
import banner1 from "@/../../public/images/banner1.png";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="flex flex-col md:flex-row md:space-x-2 px-2 lg:p-0 mb-10">
      <a
        className="mb-4 md:mb-0 w-full md:w-2/3 relative rounded inline-block"
        style={{ height: "24em" }}
        href="#"
      >
        <div
          className="absolute left-0 bottom-0 w-full h-full z-10"
          style={{
            backgroundImage:
              "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
          }}
        ></div>
        <Image
          src={banner1}
          className="absolute left-0 top-0 w-full h-full rounded z-0 object-cover"
          alt="First Example"
        />
      </a>

      <a
        className="w-full md:w-1/3 relative rounded"
        style={{ height: "24em" }}
        href="#"
      >
        <div
          className="absolute left-0 top-0 w-full h-full z-10"
          style={{
            backgroundImage:
              "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
          }}
        ></div>
        <Image
          src={banner2}
          className="absolute left-0 top-0 w-full h-full rounded z-0 object-cover"
          alt="Second Example"
        />
      </a>
    </div>
  );
}
