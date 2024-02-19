import { Footer } from "@/components/layouts/landingPage/Footer";

const LandingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full ">
    
          {children}
        <Footer />
      </div>
    </main>
  );
}

export default LandingLayout;