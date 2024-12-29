import './DisplayTime.css'; // Importing CSS styles for the DisplayTime component

// DisplayTime Component
const DisplayTime = ({ milliseconds, uservalue }) => {
  // Function to format time (in milliseconds) into minutes, seconds, and milliseconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000) // Calculate full minutes
      .toString()
      .padStart(2, '0'); // Ensure 2-digit format
    const seconds = Math.floor((time % 60000) / 1000) // Calculate remaining seconds
      .toString()
      .padStart(2, '0'); // Ensure 2-digit format
    const millis = (time % 1000).toString().padStart(3, '0'); // Calculate remaining milliseconds (3 digits)
    return { minutes, seconds, millis }; // Return formatted time components
  };

  // Format the elapsed time (current countdown timer)
  const elapsedTime = formatTime(milliseconds);

  // Format the target time (value from the input field)
  const targetTime = formatTime(uservalue);

  return (
    <div className="display-time-container">
      {/* Display the elapsed time */}
      <div>
        {elapsedTime.minutes}:{elapsedTime.seconds}:{elapsedTime.millis}
      </div>
      {/* Display the target time */}
      <div className="display-time-uservalue">
        Target: {targetTime.minutes}:{targetTime.seconds}
      </div>
    </div>
  );
};

export default DisplayTime;

// Comment for developers:
// This component is used to display the current elapsed time and the target time in a
// formatted view (MM:SS:MS). It dynamically updates as the `milliseconds` prop changes.
