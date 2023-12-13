// Update your Success component to include the "Success" class
import Lottie from "lottie-react";
import success from "../Lotties/AnimationSuccess.json";

export default function Success() {
  return (
    <div className="Success"> {/* Apply the "Success" class */}
      <Lottie className="lottie-container" animationData={success} />
    </div>
  );
}
