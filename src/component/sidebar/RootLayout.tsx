
import Sidebar from "./AnimatedSidebar";

function RootLayout({ children }: any) {
  return (
    <div className="flex ">
      <Sidebar />
      <main className=" bg-slate-100 overflow-y-auto flex-1 mx-auto ">{children}</main>
    </div>
  );
}

export default RootLayout;
