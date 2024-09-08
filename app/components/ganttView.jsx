import React, {useEffect, useRef} from "react";
import Gantt from "frappe-gantt"; // Import Frappe Gantt
import "frappe-gantt/dist/frappe-gantt.css"; // Import default styles

const GanttChart = ({tasks}) => {
  const ganttRef = useRef(null); // Create a reference to hold the Gantt chart DOM element

  useEffect(() => {
    if (ganttRef.current) {
      new Gantt(ganttRef.current, tasks, {
        on_progress_change: (task, progress) => {
          console.log(`${task.name}: change progress to ${progress}%`);
        },
      });
    }
  }, [tasks]);

  return <div className=" " ref={ganttRef}></div>; // Render the div to hold the Gantt chart
};

export default GanttChart;
