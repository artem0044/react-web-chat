import 'C:/Users/Артем/Desktop/vscode/reactRegistration/my-app/src/App.css';

const Message = () => {
  return (
    <div className="Message">
      <div className="Message__info">
        <img src="../images/iAm.jpg" alt="" />
        <span>just now</span>
      </div>

      <div className="Message__content">
        <p>some text</p>
        <img  src="../images/iAm.jpg" alt="" />
      </div>
    </div>
  );
}

export default Message;