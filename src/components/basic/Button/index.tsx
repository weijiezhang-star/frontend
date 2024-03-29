import React from "react";

function Button({ value }: { value: string }) {
  return (
    <div className="text-center pt-12">
      <button
        type="submit"
        className="text-[24px] bg-[#FBA1B7] h-[48px] border-solid rounded-full py-2 ps-[42px] pe-[40px] leading-[32px] text-center text-white"
      >
        {value}
      </button>
    </div>
  );
}

export default Button;
