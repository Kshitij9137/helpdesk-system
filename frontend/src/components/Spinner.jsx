export default function Spinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-3" />
      <p className="text-sm">{message}</p>
    </div>
  );
}