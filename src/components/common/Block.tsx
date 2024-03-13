import React from 'react'

export default function Block({ children }:any) {
  return (
    <div>
      <div className="px-4 md:px-16 flex flex-col gap-8 md:gap-20 ">
        {" "}
        <div className="relative mt-16 md:mt-10 ">{children}</div>
      </div>
    </div>
  );
}
