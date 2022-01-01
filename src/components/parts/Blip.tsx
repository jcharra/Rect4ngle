export default function Blip({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderWidth: "0 1px 1px 0",
        borderColor: "white",
        borderStyle: "solid",
        display: "inline-block",
      }}
    ></div>
  );
}
