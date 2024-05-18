import styles from "./radio.module.css";

type RadioProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > & {
    label: string;
  };

export function Radio({
  id,
  name,
  value,
  checked,
  onChange,
  htmlFor,
  label,
}: RadioProps) {
  return (
    <div className={styles["radio-container"]}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={htmlFor}>{label}</label>
    </div>
  );
}
