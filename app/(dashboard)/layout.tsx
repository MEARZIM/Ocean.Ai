import Navbar from "@/components/layouts/Navbar/Navbar"
import Sidebar from "@/components/layouts/Sidebar/Sidebar"

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:fixed md:flex-col md:inset-y-0 z-[80] bg-gray-900  text-white" >
                <div>
                   <Sidebar/>
                </div>
            </div>
            <main className="md:pl-72">
                <Navbar/>
                {children}
            </main>
        </div>
    )
}

export default DashBoardLayout
