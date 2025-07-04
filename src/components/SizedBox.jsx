import "./css/SizedBox.css";

export default function SizedBox({
  children,
  outerClassName = "",
  innerClassName = "",
}) {
  return (
    <div className={`outer-sized-box ${outerClassName}`}>
      <div className={`inner-sized-box ${innerClassName}`}>{children}</div>
    </div>
  );
}
