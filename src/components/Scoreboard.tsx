import { CreateAnimation, IonIcon } from "@ionic/react";
import { diamondOutline } from "ionicons/icons";

export default function Scoreboard({
  diamonds,
  delta,
  comment,
}: {
  diamonds: number;
  delta: number | undefined;
  comment: string;
}) {
  return (
    <>
      <div className="score">
        <IonIcon size="4x" icon={diamondOutline}></IonIcon> &nbsp;{diamonds}
      </div>
      <div className="delta">
        {delta && (
          <CreateAnimation
            duration={1000}
            iterations={1}
            fromTo={[
              {
                property: "transform",
                fromValue: "translateY(0px)",
                toValue: `translateY(${delta > 0 ? -100 : 100}px)`,
              },
              { property: "opacity", fromValue: "1", toValue: "0" },
            ]}
            play={true}
          >
            <div className={`${delta > 0 ? "bonus" : "malus"}`}>
              {!!delta && delta > 0 ? "+" : ""}
              {delta}
            </div>
          </CreateAnimation>
        )}
      </div>
      <div className="comment">
        {!!comment && (
          <CreateAnimation
            duration={1000}
            iterations={1}
            fromTo={[{ property: "opacity", fromValue: "1", toValue: "0" }]}
            play={true}
          >
            <div className={`${comment ? "good" : "bad"}`}>{comment}</div>
          </CreateAnimation>
        )}
      </div>
    </>
  );
}
