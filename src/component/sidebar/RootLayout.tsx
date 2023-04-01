
import Sidebar from "./AnimatedSidebar";

function RootLayout({ children }: any) {
  return (
    <div className="flex ">
      <Sidebar />
      <main className="App-dashboard overflow-y-auto flex-1 mx-auto ">{children}</main>
    </div>
  );
}

export default RootLayout;
