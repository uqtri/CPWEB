import Banner from "./partials/Banner/Banner";
import Challenge from "./partials/Challenge/Challenge";
import Contest from "./partials/Contest/Contest";
import Leaderboard from "./partials/Leaderboard/Leaderboard";
import Topic from "./partials/Topic/Topic";
export default function Home() {
  console.log(import.meta.env.VITE_BACKEND_URL);
  return (
    <div className="homepage px-4">
      <Banner />
      <Contest />
      <Topic />
      <Challenge />
      <Leaderboard />
    </div>
  );
}
