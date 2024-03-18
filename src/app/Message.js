const Message = (props) => {
  const { message } = props;

  return (
    <>
      {message.type === 'fromme' ? (
        <div className="message">
          <div className="extra"></div>
          <div className="message-text from-me">{message.text}</div>
        </div>
      ) : (
        <div className="message">
          <div className="message-text from-chat">{message.text}</div>
          <div className="extra"></div>
        </div>
      )}
    </>
  );
};

export default Message;
