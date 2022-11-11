import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FaTrashAlt } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { useState } from "react";
import Modal from "./Modal";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const [showModal, setShowModal] = useState(false);

  const deleteWorkout = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const editWorkout = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "PATCH",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "EDIT_WORKOUT", payload: json });
    }
    setShowModal(!showModal);
    console.log(response);
  };

  return (
    <>
      {showModal && (
        <div>
          <Modal
            showModal={showModal}
            onClose={() => setShowModal(!showModal)}
          />
        </div>
      )}

      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Number of reps: </strong>
          {workout.reps}
        </p>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
        <span>
          <FaTrashAlt onClick={deleteWorkout} />
          <BsPencilSquare className="edit-icon" onClick={editWorkout} />
        </span>
      </div>
    </>
  );
};

export default WorkoutDetails;
