

const MessageInput = () => {
  return (
    <>
    <form 
    className="px-4 my-3">
        <div className="w-full relative">
            <input type="text" placeholder="Send message" className="pl-2 border text-sm rounded-lg block w-full bg-gray-700 border-gray-600 text-black h-8"/>
            <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3 text-white">
                Send
            </button>
        </div>
    </form>
    </>
  )
}

export default MessageInput