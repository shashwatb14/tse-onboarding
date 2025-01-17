import { useState } from "react";
import { Link } from "react-router-dom";
import { Task, updateTask } from "src/api/tasks";
import { CheckButton, UserTag } from "src/components";
import styles from "src/components/TaskItem.module.css";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = async () => {
    setLoading(true);
    try {
      const result = await updateTask({ ...task, isChecked: !task.isChecked });
      if (result.success) {
        setTask((prevTask) => ({
          ...prevTask,
          isChecked: !prevTask.isChecked,
        }));
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.item}>
      <CheckButton checked={task.isChecked} onPress={handleToggleCheck} disabled={isLoading} />
      <div className={`${styles.textContainer} ${task.isChecked ? styles.checked : ""}`}>
        <span>
          <Link to={`/task/${task._id}`} className={styles.title}>
            {task.title}
          </Link>
        </span>
        <span className={styles.description}>
          {task.description && task.description.trim().length > 0 && task.description}
        </span>
        <div className={styles.userTagContainer}>
          {task.assignee ? (
            <UserTag
              name={task.assignee.name}
              profilePictureURL={task.assignee.profilePictureURL}
              className={styles.userTag}
            />
          ) : (
            <UserTag name={"Not assigned"} className={styles.userTag} />
          )}
        </div>
      </div>
    </div>
  );
}
