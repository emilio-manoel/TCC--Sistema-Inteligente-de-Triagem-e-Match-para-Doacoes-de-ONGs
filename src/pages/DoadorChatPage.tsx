import ChatInput from "../components/chat/ChatInput"
import ChatMessage from "../components/chat/ChatMessage"
import OngResultCard from "../components/chat/OngResultCard"
import ChatContainer from "../components/chat/ChatContainer"


function DoadorChatPage() {
 

  return (
    <section>
      <ChatContainer/>
        <ChatMessage/>
        <OngResultCard/>
      <ChatInput/>
    </section>
  )
}

export default DoadorChatPage