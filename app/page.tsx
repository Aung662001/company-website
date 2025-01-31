import { Lobster } from "next/font/google";
import benefits from "@/data/benefit.json";
import company_data from "@/data/company_data.json";
import MotionDiv from "@/components/MotionDiv";

const lobster = Lobster({
  weight: "400",
  subsets: ["cyrillic-ext"],
});

export default function Home() {
  return (
    <div>
      <div className="hidden md:hidden lg:flex">
        <h2
          className={`${lobster.className} mt-4 w-full text-transparent bg-gradient-to-b to-purple-400
           from-yellow-500 text-center bg-clip-text text-6xl relative right-28`}
        >
          Software for Your
          <span className="absolute top-2 text-7xl bg-gradient-to-tr from-purple-600 to-yellow-600 bg-clip-text">
            &nbsp;Business!
          </span>
        </h2>
      </div>
      <div className="lg:hidden flex items-center justify-center">
        <h2
          className={`${lobster.className} flex flex-col mt-4 gap-2 text-transparent bg-gradient-to-br to-purple-400
           from-yellow-700 text-center bg-clip-text text-4xl relative`}
        >
          Software for
          <span
            className="bg-gradient-to-br bg-clip-text  to-purple-500
           from-yellow-700"
          >
            Your
          </span>
          <span
            className=" text-5xl bg-gradient-to-br bg-clip-text  to-purple-500
           from-yellow-800"
          >
            Bussiness!
          </span>
        </h2>
      </div>
      <MotionDiv>
        <p className="text-blue-500 mt-12 max-w-[70%] m-auto text-center">
          {company_data.ambition}
        </p>
      </MotionDiv>
      <div className="py-10 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
          ကျွန်ုပ်တို့၏ စနစ်၏ အဓိက လုပ်ဆောင်ချက်များ
        </h2>
        <div className="text-center mb-8">
          <button
            className="bg-blue-500 px-4 py-2 rounded-sm text-3xl bg-gradient-to-tr 
          from-cyan-400 to-blue-400 text-slate-600 hover:scale-105 transition-all duration-500 hover:shadow-2xl"
          >
            Check Now
          </button>
        </div>
        <div className="container mx-auto px-4" id="benefits">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <MotionDiv>
                  <div className="lg:text-5xl text-4xl text-blue-500 mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </MotionDiv>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
