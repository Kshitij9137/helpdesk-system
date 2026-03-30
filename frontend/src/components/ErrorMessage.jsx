export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 my-4">
      <span className="text-red-500 text-xl">⚠️</span>
      <div className="flex-1">
        <p className="text-red-700 font-semibold text-sm">Something went wrong</p>
        <p className="text-red-500 text-sm mt-1">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-sm text-primary underline hover:text-blue-700"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}