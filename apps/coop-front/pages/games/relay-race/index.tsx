import dynamic from "next/dynamic";

const Main = () => {
  const RelayRaceStart = dynamic(
    import("@components/relay-race/relayRaceStart")
  );
  return (
    <div>
      <RelayRaceStart />
    </div>
  );
};
export default Main;
