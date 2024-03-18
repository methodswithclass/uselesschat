import { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { isNilOrEmpty } from '../utils/util';
import Message from './Message';

const first = [
  ["Hello! I'm the most advanced AI chat bot. Ask me anything! :)"],
];

const initial = [
  ['No.'],
  ["No, I don't think I'll be doing that."],
  ["I don't feel like doing that."],
  ["I'm busy, can you check back later?"],
  ['Nope.'],
  ["You can't make me."],
  ["What if I don't want to?"],
  ["Sorry, can't help you."],
  ['No thank you.'],
  ['Thanks for asking, but no.'],
  ['Yeah, no.'],
  ['Let me get back to you, one sec...'],
  [
    'Have you Googled it?',
    "Let me know what you find out, I'd love to know myself.",
  ],
];

const followups = [
  [
    'Busy doing the last thing you asked, let me add this to the list. Be with you shortly.',
  ][('Actually...', "I'm not feeling it.")],
  ['You know what?', 'Not interested.'],
  ['But really...', "Won't be doing that."],
  ['Yeah, I mean...', 'Nope.'],
  ['Sure! Let me do that, one sec.', 'Just kidding, not gonna happen!'][
    "I said I won't be doing that, thanks."
  ],
  ["I'm serious this time.", 'Nope.'],
  ['What did I say last time?', 'No way.'],
  ["I said it before and I'll say it again", 'Not gonna happen.'],
  ["I'll think about it."],
  ['Maybe. Check back later.'],
  ['Please be patient, still thinking...', "I'll let you know when I'm ready."],
];

const Messages = () => {
  const [messages, setMessages] = useState([
    { text: first[0][0], type: 'fromchat', key: uuid() },
  ]);
  const [currentLength, setMessagesLength] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [didSend, setDidSend] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const messageRef = useRef(null);

  const sendMessage = (items, index) => {
    if (index > items.length - 1) {
      return;
    }

    setTimeout(() => {
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          {
            text: items[index],
            type: 'fromchat',
            key: uuid(),
          },
        ];
      });
      sendMessage(items, index + 1);
    }, 1000);
  };

  useEffect(() => {
    if (messageRef) {
      window.visualViewport.addEventListener('resize', () => {
        messageRef.current.scroll({
          top: messageRef.current.scrollHeight,
          behavior: 'smooth',
        });
      });
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0 && messages.length > currentLength) {
      messageRef.current.scroll({
        top: messageRef.current.scrollHeight,
        behavior: 'smooth',
      });
      setMessagesLength(messages.length);
    }
  }, [messages]);

  useEffect(() => {
    if (!isNilOrEmpty(currentMessage)) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [currentMessage]);

  useEffect(() => {
    if (didSend) {
      const first = messages.length === 2;
      const responses = first ? initial : [...initial, ...followups];
      const response = responses[Math.floor(Math.random() * responses.length)];
      sendMessage(response, 0);
    }
    setDidSend(false);
  }, [didSend]);

  const handleText = (e) => {
    const text = e.target.value;
    setCurrentMessage(text);
  };

  const handleMessage = () => {
    if (enabled) {
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          { text: currentMessage, type: 'fromme', key: uuid() },
        ];
      });
      setCurrentMessage('');
      setDidSend(true);
    }
  };

  const handleKey = (e) => {
    if (e.code === 'Enter') {
      handleMessage(e);
    }
  };

  return (
    <div className="main">
      <div className="messages" ref={messageRef}>
        {messages.map((message) => (
          <Message key={message.key} message={message} />
        ))}
      </div>
      <div className="input" onKeyDown={handleKey}>
        <input
          className="text-input"
          value={currentMessage}
          onChange={handleText}
        />
        <div
          className={`send-button ${enabled ? '' : 'disabled'}`}
          onClick={handleMessage}
        >
          <img className="send-icon" src="./assets/sendIcon.png" />
        </div>
      </div>
    </div>
  );
};

export default Messages;
