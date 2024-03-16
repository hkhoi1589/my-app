import Link from "next/link";

export default function Hero({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <section>
        <div className="max-w-screen-xl w-full mx-auto px-4 py-28 gap-12 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <h1 className="text-sm text-primary font-medium">
              Build products for everyone
            </h1>
            <h2 className="text-4xl opacity-90 font-extrabold mx-auto md:text-5xl">
              Design your projects faster with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
                the largest figma UI kit
              </span>
            </h2>
            <p className="max-w-2xl mx-auto">
              Sed ut perspiciatis unde omnis iste natus voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae.
            </p>
            <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <Link href="#" className="btn btn-primary btn-sm">
                Browse courses
              </Link>
              <Link href="#" className="btn btn-outline btn-sm">
                Get access
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="mt-14 relative">
            <div
              className="absolute top-0 inset-x-0 mx-auto w-1/2 h-1 sm:w-1/3 opacity-50"
              style={{
                borderWidth: "0px 0px 1.5px",
                borderImage:
                  "radial-gradient(rgb(209, 213, 219), rgb(209, 213, 219), rgb(209, 213, 219), rgba(209, 213, 219, 0)) 1 / 1 / 0 stretch",
              }}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
}
