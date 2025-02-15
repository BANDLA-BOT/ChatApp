
const Message = () => {
  return (
    <div className="chat chat-end">
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img src="" alt="Chat bubble" />
            </div>
        </div>
        <div className={`chat-bubble text-white bg-blue-500` }>
            Hi
        </div>
        <div className="chat-footer opacity-50 text-sm flex gap-1 items-center">
            Time
        </div>
    </div>
  )
}

export default Message