import Countdown from "react-countdown";

const Countdownreact = ({ startDateTime, endDateTime }) => {
  const startTime = new Date(startDateTime).getTime();
  let endTimeDates = new Date(endDateTime);
  if (endDateTime.length === 10) {
    // Checking if only date is provided
    endTimeDates.setHours(23, 59, 59, 999);
  }

  const endTime = new Date(endDateTime).getTime();

  console.log("start", startTime, "end", endTime);
  // Renderer for the countdown
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    completed,
  }) => {
    if (completed) {
      return <h1>Time is up!</h1>;
    } else {
      return (
        <div>
          <h1 className="bg-black py-2 px-2  space-x-2  ">
            <span className="text-purple-700">{days}d</span>{" "}
            <span className="text-teal-600">{hours}h</span>
            <span className="text-amber-800">{minutes}m</span>
            <span className="text-white">{seconds}s</span>
            <span className="text-red-800">{milliseconds}s</span>
          </h1>
        </div>
      );
    }
  };

  return (
    <div>
      {startTime <= Date.now() && endTime > Date.now() ? (
        <Countdown date={endTime} renderer={renderer} />
      ) : (
        <h2>The countdown All ready end.</h2>
      )}
    </div>
  );
};

export default Countdownreact;
