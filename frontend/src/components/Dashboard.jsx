import React, { useState } from "react";
import { Link } from "react-router-dom";
import Add_icon from "../assets/icons/add-icon.svg";
import Default_user_icon from "../assets/icons/default-user-icon.svg";
import Navbar from "./Navbar";
import './All.css'
import ProjectForm from "./ProjectFrom";
import { backendApi } from "../config";
import { useEffect } from "react";
import TaskForm from "./TaskForm";

export default function Dashboard({
  taskCount,
  setTaskCount,
  token,
  setToken,
}) {
  const [showProjects, setShowProjects] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(backendApi + "/api/v1/projects", {
        method: "GET",
        credentials: 'include',
        headers: {
          Authorization: token,
        },
      }).catch(err => console.log(err.data.message));
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


  return (
    <>
      <div className="mainbg p-0 sm:p-2 flex w-full gap-3">
        <Navbar token={token} setToken={setToken} />
        <div className="min-h-screen flex flex-col w-full items-center bg-transparent">
          <div className="flex justify-between items-center w-full p-2 bg-white rounded-3xl border border-gray-300">
            {/* Search Box*/}
            <div className="flex min-w-[50%]">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-1 border placeholder:text-xs border-gray-300 bg-gray-medium rounded-3xl w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              />
            </div>

            {/* Add Task button on the right */}
            <div className="flex gap-4">
              <button className="bg-primary text-white py-1 px-2 text-sm rounded-xl border-black-all hover:bg-blue-600 transition duration-300">
                <a href="/tasks">
                  <img
                    src={Add_icon}
                    className="aspect-square w-6"
                    alt="add icon"
                  />
                  <span>Add Task</span>
                </a>
              </button>

              <div className="rounded-full flex cursor-pointer">
                <img
                  src={Default_user_icon}
                  className="aspect-square w-9"
                  alt="user icon"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-center mainbg">
          <div className="ula">
{showProjectForm && (
  <ProjectForm token={token} setProjects={setProjects} />
)}
{/* styled project list */}
    <ul >
  {projects && projects.map((project) => (
            <div
              key={project._id}
              className=""
            >
              <div>
                <p className="para">{project.name}</p>
                <p className="para">{project.description}</p>
              </div>
            </div>
          
          ))}
        </ul>
        
        {showTaskForm && (
          <TaskForm
            token={token}
            projects={projects}
            setTasks={setTasks}
          />
        )}

        <ul className="task-list mt-5">
          { (
            tasks.map((task) => (
              <li className="vi" key={task._id}>
                <p className="para">{task.name} <span className="status1"> {task.status}</span></p>
                <p className="para"> Priority : {task.priority} </p>
                <p className="para">Deadline : {task.deadline}</p>
              </li>
            ))
          ) }
        </ul>
        </div>
            <h2 className="vi text-2xl sm:text-4xl font-semibold text-gray-800 p-5">
              Hello user, you have{" "}
              <span className="font-bold">{taskCount}</span> tasks remaining
            </h2>
            </div>

          </div>
        </div>
      
    </>
  );
}
