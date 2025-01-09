import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Task, getTask } from "src/api/tasks";
import { Button, Page } from "src/components";
import { TaskForm } from "src/components/TaskForm";

import styles from "/src/pages/TaskDetail.module.css";

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchTask = async () => {
      if (id) {
        const result = await getTask(id);
        if (result.success) {
          setTask(result.data);
        } else {
          console.log(result.error);
        }
      } else {
        alert("Task ID is undefined.");
      }
    };

    fetchTask();
  }, [id]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(date);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = (updatedTask: Task) => {
    setTask(updatedTask);
    setIsEditing(false);
  };

  return (
    <Page>
      <Helmet>
        <title>{task ? task.title : "Loading..."} | TSE Todos</title>
      </Helmet>
      <p>
        <Link to="/">Back to home</Link>
      </p>
      {isEditing && task ? (
        <TaskForm mode="edit" task={task} onSubmit={handleFormSubmit} />
      ) : task ? (
        <div className={styles.container}>
          <div className={styles.titleRow}>
            <span className={styles.title}>{task.title}</span>
            <Button label={"Edit task"} onClick={handleEditClick} />
          </div>
          <div className={styles.field}>
            <p>{task.description ? task.description : "(No description)"}</p>
          </div>
          <div className={`${styles.field} ${styles.assignee}`}>
            <span className={styles.label}>Assignee:</span>
            <span className={styles.content}>
              {task.assignee ? task.assignee.name : "Not assigned"}
            </span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Status:</span>
            <span className={styles.content}>{task.isChecked ? "Done" : "Not done"}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Date Created:</span>
            <span className={styles.content}>{formatDate(new Date(task.dateCreated))}</span>
          </div>
        </div>
      ) : (
        <p className={styles.title}>This task doesn&apos;t exist!</p>
      )}
    </Page>
  );
}
