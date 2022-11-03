import { CreateAnimation, IonIcon } from "@ionic/react";
import { diamondOutline } from "ionicons/icons";
import "./Scoreboard.css";

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
        <div className="comment">
          {!!comment ? (
            <CreateAnimation
              duration={1000}
              iterations={1}
              fromTo={[{ property: "opacity", fromValue: "1", toValue: "0" }]}
              play={true}
            >
              <div className={`${comment ? "good" : "bad"}`}>{comment}</div>
            </CreateAnimation>
          ) : (
            <div className="invisible">Comment</div>
          )}
        </div>
        <div className="scoreContainer">
          <div className="scoreIcon">
            <IonIcon icon={diamondOutline}></IonIcon>
          </div>
          <div className="scoreNum">{diamonds}</div>
        </div>
        <div className="delta">
          {delta ? (
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
          ) : (
            <div className="invisible">foo</div>
          )}
        </div>
      </div>
    </>
  );
}
