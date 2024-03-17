import Navbar from "@/components/navbar/forum-home";
import BG from "@/components/bg/beyond";

export const metadata = {
  title: "Beyond Forum",
  description: "The forum page",
};

export default function ForumLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <BG />
      <Navbar className={`z-50 sticky top-0`} />

      <div id="main-wrap" className="flex-1 flex flex-row overflow-y-hidden">
        <main
          id="main"
          className="bg-base-100/10 flex-1 text-xs overflow-y-auto relative"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
