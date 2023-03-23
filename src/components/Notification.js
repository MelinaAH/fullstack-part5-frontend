import '../index.css';

const Notification = ({ message, succeeded }) => {
  console.log('succeede', succeeded);
  if (message === null) {
    return null;
  }
  else if (message !== null && succeeded === false) {
    return (
      <div className='errorNote'>
        {message}
      </div>
    );
  }
  else {
    return (
      <div className='note'>
        {message}
      </div>
    );
  }
};

export default Notification;