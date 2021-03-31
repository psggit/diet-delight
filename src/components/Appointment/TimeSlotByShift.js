import React, { useState, useEffect, useMemo } from "react";

export default function TimeSlotByShift(props) {
  const [renderMorning, setRenderMorning] = useState(false);
  const [renderAfternoon, setRenderAfternoon] = useState(false);
  const [renderEvening, setRenderEvening] = useState(false);
  const [timeSlotShift, setTimeSlot] = useState("");
  const [disabled, setDisabled] = useState(false);

  // let morningShift = ["9:00 AM","10:00 AM","11:00 AM","12:00PM","9:15 AM","10:15 AM","11:15 AM","12:15PM","9:30 AM","10:30 AM","11:30 AM","12:30PM","9:45 AM","10:45 AM","11:45 AM","12:45PM"];
  // let afternoonShift = ["1:00 PM","2:00 PM","3:00 PM","4:00 PM","1:15 PM","2:15 PM","3:15 PM","4:15 PM","1:30 PM","2:30 PM","3:30 PM","4:30 PM","1:45 PM","2:45 PM","3:45 PM","4:45 PM"];
  // let eveningShift = ["5:00 PM","6:00 PM","7:00 PM","8:00 PM","5:15 PM","6:15 PM","7:15 PM","8:15 PM","5:30 PM","6:30 PM","7:30 PM","8:30 PM","5:45 PM","6:45 PM","7:45 PM","8:45 PM"];

  let morningShift = [
    "9:00 AM",
    "09:15 AM",
    "09:30 AM",
    "09:45AM",
    "10:00 AM",
    "10:15 AM",
    "10:30 AM",
    "10:45AM",
    "11:00 AM",
    "11:15 AM",
    "11:30 AM",
    "11:45AM",
  ];
  let afternoonShift = [
    "12:00 PM",
    "12:15 PM",
    "12:30 PM",
    "12:45 PM",
    "01:00 PM",
    "01:15 PM",
    "01:30 PM",
    "01:45 PM",
    "02:00 PM",
    "02:15 PM",
    "02:30 PM",
    "02:45 PM",
  ];
  let eveningShift = [
    "03:00 PM",
    "03:15 PM",
    "03:30 PM",
    "03:45 PM",
    "04:00 PM",
    "04:15 PM",
    "04:30 PM",
    "04:45 PM",
    "05:00 PM",
    "05:15 PM",
    "05:30 PM",
    "05:45 PM",
  ];
  // const handleTimeSlot = (selectedTimeSlot) => {

  // }

  useEffect(() => {
    console.log(timeSlotShift);
    if (timeSlotShift != "") {
      var timeSlotByClass = document.getElementsByClassName(
        "time_morning_title"
      );
      for (var i = 0; i < timeSlotByClass.length; i++) {
        if (timeSlotByClass[i].id !== timeSlotShift) {
          timeSlotByClass[i].style.background = "#fff";
          timeSlotByClass[i].style.color = "#000";
          timeSlotByClass[i].style.border = "1px solid #2121213b";
        } else {
          console.log(timeSlotByClass[i]);
          timeSlotByClass[i].style.background = "#8BC441";
          timeSlotByClass[i].style.color = "#fff";
          timeSlotByClass[i].style.border = "1px solid #8BC441";
          timeSlotByClass[i].style.outline = "none";
        }
      }
      props.selectedTimeSlot(timeSlotShift);
    }
  }, [props.selectedTimeSlot, timeSlotShift]);

  const renderMorningShift = morningShift.map((timeSlot) => {
    return (
      <div className="col-md-3  col-3" key={Math.random()}>
        <button
          className="time_morning_title"
          id={timeSlot}
          onClick={() => setTimeSlot(timeSlot)}
          disabled={props.disabled}
        >
          {timeSlot}
        </button>
      </div>
    );
  });

  const renderAfternoonShift = afternoonShift.map((timeSlot) => {
    return (
      <div className="col-md-3  col-3" key={Math.random()}>
        <button
          className="time_morning_title"
          id={timeSlot}
          onClick={() => setTimeSlot(timeSlot)}
          disabled={props.disabled}
        >
          {timeSlot}
        </button>
      </div>
    );
  });

  const renderEveningShift = eveningShift.map((timeSlot) => {
    return (
      <div className="col-md-3  col-3" key={Math.random()}>
        <button
          className="time_morning_title"
          id={timeSlot}
          onClick={() => setTimeSlot(timeSlot)}
          disabled={props.disabled}
        >
          {timeSlot}
        </button>
      </div>
    );
  });

  // const renderMorningLock = useMemo(() => {
  //     return renderMorningShift
  // },[renderMorningShift])

  const renderAfternoonLock = useMemo(() => {
    return renderAfternoonShift;
  }, [renderAfternoonShift]);

  const renderEveningLock = useMemo(() => {
    return renderEveningShift;
  }, [renderEveningShift]);

  useEffect(() => {
    if (props.renderShift === "morning") {
      setRenderMorning(true);
      setRenderAfternoon(false);
      setRenderEvening(false);
    } else if (props.renderShift === "afternoon") {
      setRenderAfternoon(true);
      setRenderMorning(false);
      setRenderEvening(false);
    } else if (props.renderShift === "evening") {
      setRenderAfternoon(false);
      setRenderMorning(false);
      setRenderEvening(true);
    } else {
      setRenderAfternoon(false);
      setRenderMorning(false);
      setRenderEvening(false);
    }
  }, [props.renderShift]);

  return (
    <div>
      <div className="row">
        {renderMorning && renderMorningShift}
        {renderAfternoon && renderAfternoonLock}
        {renderEvening && renderEveningLock}
      </div>
    </div>
  );
}
