import { SignIn } from "./_components/SignIn";

export default function Home() {
  return (
    <div className="flex justify-around items-center h-full">
      <div>
        <SignIn />
      </div>
      <div>
        <img
          src="./batdel.jpg"
          alt="BatDelivery"
          className="w-[1000px] h-[950px] rounded-2xl"
        />
      </div>
    </div>
  );
}
