export const LoadingState = () =>  <div className="loader-container">
<div className="flex items-center justify-center w-full h-[700px]">
  <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full text-[#0A2F1E]"></div>
</div>
</div>;

export const ErrorState = () => <p>Property not found.</p>;