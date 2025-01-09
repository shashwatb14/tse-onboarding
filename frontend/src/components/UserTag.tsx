import styles from "src/components/UserTag.module.css";

export interface UserTagProps {
  name: string; // Required
  profilePictureURL?: string; // Optional
  className?: string; // Optional
}

export function UserTag({ name, profilePictureURL, className }: UserTagProps) {
  return (
    <div className={`${styles.userTag} ${className || ""}`}>
      <img
        src={profilePictureURL || "/userDefault.svg"}
        alt={`${name}'s avatar`}
        className={styles.profilePicture}
      />
      <span className={styles.name}>{name}</span>
    </div>
  );
}
