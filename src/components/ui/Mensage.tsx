interface MessagemProps {
    content: string;
    sender: 'user' | 'bot';
}
function Messagem({content, sender}: MessagemProps) {
    return(
        <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} w-full mb-2`}>
            <div className={`text-base md:text-sm max-w-[70%] ${sender === 'user' ? 'bg-primary text-white' : 'bg-card text-foreground'} p-3 rounded-lg`}>
                {content}
            </div>
        </div>
    )
}
export default Messagem