import { SignIn } from "./_components/SignIn";

export default function Home() {
  return (
    <div className="flex">
      <div>
        <SignIn />
      </div>
      <div className="w-[856px] h-[904px]">
        <img src="./batdel.jpg" alt="BatDelivery" />
      </div>
    </div>
  );
}
