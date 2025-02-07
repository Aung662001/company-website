import React from "react";

const Divider = ({color=null}:{color?:string | null}) => {
  return (
    <div className={`h-1 ${color?color:"bg-slate-600"}`}>
      <p className="hidden">Divider</p>
    </div>
  );
};

export default Divider;
