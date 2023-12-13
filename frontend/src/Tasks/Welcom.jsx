import WelcomAnimation from '../Lotties/AnimationWelcom.json'; 
import Lottie from "lottie-react";

export default function Welcom() {
  return (
    <div className="Success"> {/* Apply the "Success" class */}
    <Lottie className="lottie-containers" animationData={WelcomAnimation} />
  </div>
  )
}
