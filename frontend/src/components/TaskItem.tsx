import { useState } from "react";
import { Task, updateTask } from "src/api/tasks";
import { CheckButton } from "src/components";
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
        // Use the previous state to make sure React knows the update is based on the latest state.
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
        <span className={styles.title}>{task.title}</span>
        <span className={styles.description}>
          {task.description && task.description.trim().length > 0 && task.description}
        </span>
      </div>
    </div>
  );
}
