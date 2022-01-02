export default function Blip({
  size,
  filled,
  content,
  incomplete,
}: {
  size: number;
  filled: boolean;
  content?: number;
  incomplete: boolean;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderWidth: "1px 0 0 1px",
        borderColor: "white",
        borderStyle: "solid",
        display: "inline-block",
        background: filled ? (incomplete ? "gray" : "green") : "transparent",
        fontSize: size - 6,
      }}
    >
      <div style={{ color: "white", display: "flex", justifyContent: "center", alignContent: "center" }}>{content}</div>
    </div>
  );
}
