import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import { Link } from "react-router-dom";
import { backendApi } from "../config";
import './All.css'
function TaskList({ token, setTaskCount }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(backendApi + "/api/v1/projects", {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      setProjects(data.data);
    };
    fetchProjects();
  }, [token]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(backendApi + "/api/v1/tasks", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, [token]);

  useEffect(() => {
    setTaskCount(tasks.filter((task) => task.status !== "Completed").length);
  }, [setTaskCount, tasks]);

  return (
    <div className="bgs">
      <div className="bgs1">
      <Link to="/dashboard"> <button className="p-3 px-10 border text-white bg-black mt-10 w-full md:w-96 md:mr-10 rounded-lg font-semibold text-xl">
        
        Go back to Dashboard 
       
      </button> </Link>
        <button
          className={`p-3 px-10 border text-white mt-10 w-full rounded-lg font-semibold text-xl ${
            showTaskForm
              ? "bg-red-400 border-red-900"
              : "bg-blue-500 border-green-500"
          }`}
          onClick={() => setShowTaskForm(!showTaskForm)}
        >
          {showTaskForm ? (
            <div className="flex">
              <img
                className="h-5 mt-[5px] mr-3"
                src="/images/closeicon.png"
                alt="Close"
              />
              Close Form
            </div>
          ) : (
          <>
         
            <div className="flex">
              <img className="h-8 mr-3" src="/images/plusIcon.png" alt="Add" />
              Add New Task
            </div>
            </>
            
          )}
        </button>

        {showTaskForm && (
          <TaskForm
            token={token}
            projects={projects}
            setTasks={setTasks}
            setTaskCount={setTaskCount}
          />
        )}

        <ul className="task-list mt-5">
          { (
            tasks.map((task) => (
              <li className="vi" key={task._id}>
                {task.name} - {task.status}
              </li>
            ))
          ) }
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
