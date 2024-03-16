import BG from "@/components/bg/twoRadial";

export default function Contact({ className = "" }) {
  return (
    <section id="contact" className={`relative py-28 ${className}`}>
      <div className="relative z-10 max-w-screen-xl mx-auto sm:px-4 md:px-8">
        <div className="max-w-lg space-y-3 px-4 sm:mx-auto sm:text-center sm:px-0">
          <h3 className="text-primary font-semibold">Contact</h3>
          <p className="text-3xl font-semibold sm:text-4xl">Get in touch</p>
          <p className="opacity-80">
            We’d love to hear from you! Please fill out the form bellow.
          </p>
        </div>
        <div className="mt-12 mx-auto px-4 p-8 bg-base-100 sm:max-w-lg sm:px-8 sm:rounded-xl">
          <form className="space-y-5">
            <div>
              <label className="font-medium">Full name</label>
              <input
                type="text"
                required
                className="mt-2 w-full input input-sm border-gray-200 shadow-sm"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                className="mt-2 w-full input input-sm border-gray-200 shadow-sm"
              />
            </div>
            <div>
              <label className="font-medium">Phone number</label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                  <select className="text-sm bg-transparent outline-none rounded-lg h-full">
                    <option>US</option>
                    <option>ES</option>
                    <option>MR</option>
                  </select>
                </div>
                <input
                  type="number"
                  placeholder="+1 (555) 000-000"
                  required
                  className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-neutral-focus shadow-sm rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="font-medium">Message</label>
              <textarea
                required
                className="mt-2 w-full textarea border-gray-200"
              ></textarea>
            </div>
            <button className="btn btn-primary btn-sm btn-block">Submit</button>
          </form>
        </div>
      </div>
      <BG />
    </section>
  );
}
