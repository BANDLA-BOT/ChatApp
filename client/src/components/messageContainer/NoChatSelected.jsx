const noChatSelected = () => {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="px-4 text-center sm:text-lg md:text-xl text-black-200 font-semibold flex flex-col items-center gap-2">
          <p className="text-black">Welcome User</p>
          <p className="text-black">Select a chat to start</p>
        </div>
      </div>
    );
  };

  export default noChatSelected