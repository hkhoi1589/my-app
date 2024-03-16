import Link from "next/link";
import BG from "@/components/bg/twoRadial";

export default function Hero({ className = "" }) {
  return (
    <div
      className={`relative bg-secondary/10 min-h-[825px] -mx-4 ${className}`}
    >
      <BG />
      <div className="relative container lg:max-w-5xl mx-auto p-4 lg:p-12 text-center space-y-6">
        <div className="pt-8">
          <Link
            href="#"
            className="badge border-0 bg-secondary/10 gap-2 p-3 font-semibold hover:bg-secondary/20"
          >
            WATCH OUR NEW PODCAST
            <i className="ri-arrow-right-up-fill"></i>
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold font-merienda pt-2">
            Let’s move Beyond the Mountain
          </h1>
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light">
          Made by students to connect students
        </h2>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          Beyond the Mountains (BM) is a non-profit organization founded by
          college and high school students in the United States.
        </h3>
        <div className="py-8">
          <button className="btn btn-secondary text-white px-12 mb-4 sm:mr-4">
            Buy Now
          </button>
          <button className="btn bg-base-100 lg:px-6 mb-4">
            <i className="ri-corner-down-right-fill"></i>
            Explore how we get Students involved
          </button>
        </div>
      </div>
    </div>
  );
}
