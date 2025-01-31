import ClockLoader from "react-spinners/ClockLoader";
export default function Loading({ loading }: { loading: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 opacity-65">
      <ClockLoader
        color={"#00ffff"}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
