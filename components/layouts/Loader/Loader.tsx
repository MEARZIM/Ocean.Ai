import Image from "next/image"

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image
          fill
          src="/loader.png"
          alt="Logo"
        />
      </div>
      <p className="text-sm text-muted-foreground">
       Wait For A Moment..
      </p>
    </div>
  );
};