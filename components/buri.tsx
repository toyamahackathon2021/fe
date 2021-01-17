import * as React from "react";
interface Props {}

const style = `
.poyooon {
  animation: poyooon 0.9s linear 0s 3;
}

@keyframes poyooon {
  0%   { transform: scale(1.0, 1.0) translate(0%, 0%); filter: hue-rotate(0deg);}
  10%  { transform: scale(1.1, 0.9) translate(0%, 5%); }
  40%  { transform: scale(1.2, 0.8) translate(0%, 15%); }
  50%  { transform: scale(1.0, 1.0) translate(0%, 0%); }
  60%  { transform: scale(0.9, 1.2) translate(0%, -100%); }
  75%  { transform: scale(0.9, 1.2) translate(0%, -20%); }
  85%  { transform: scale(1.2, 0.8) translate(0%, 15%); }
  100% { transform: scale(1.0, 1.0) translate(0%, 0%); filter: hue-rotate(360deg);}
}

.buruburu {
  animation: hurueru .1s  infinite;
}

@keyframes hurueru {
  0% {transform: translate(0px, 0px) rotateZ(0deg)}
  25% {transform: translate(2px, 2px) rotateZ(1deg)}
  50% {transform: translate(0px, 2px) rotateZ(0deg)}
  75% {transform: translate(2px, 0px) rotateZ(-1deg)}
  100% {transform: translate(0px, 0px) rotateZ(0deg)}
}

.buriWrapper {
  width: 40vw;
  position: fixed;
  right: -5px;
  bottom: 10px;
  z-index: 10000;
}

.buriWrapper:after {
  content: "";
  position: absolute;
  right: -5vw;
  bottom: -15vw;
  width: 50vw;
  height: 50vw;
  z-index: 10000;
  background-image: url("/compass.png");
  background-size: cover;
}

.buri {
  position: absolute;
  bottom: 0;
  z-index: 100000;
   background-image: url("/buri.png");
   background-repeat: no-repeat;
   width: 150px;
   height: 80px;
   background-size: 40vw;
}
.sashimi:hover {
   background-image: url("/sashimi_buri.png");
   background-repeat: no-repeat;
   height: 130px;
   margin-bottom: -15px;
}
`;

interface Props {
  buruburu?: boolean;
  poyooon?: boolean;
}

const getClasses = (buruburu: boolean, poyooon: boolean): string[] => {
  const c = ["buri", "sashimi"];
  if (buruburu) {
    c.push("buruburu");
  } else if (poyooon) {
    c.push("poyooon");
  }
  return c;
};

const Buri: React.FC<Props> = (props) => {
  // const buri = document.getElementById('buri');
  const buri = React.useRef(null);
  // const buriContent = document.getElementById("buriContent");
  // const buriGaming = document.getElementById("buriGaming");
  // const buriBuruburu = document.getElementById("buriBuruburu");

  // click gameing toggle
  // if (buriGaming) {
  //   buriGaming.addEventListener(
  //     "click",
  //     (event) => {
  //       buriContent.classList.toggle("poyooon");
  //     },
  //     false
  //   );
  // }

  // // buri buruburu
  // if (buriBuruburu) {
  //   buriBuruburu.addEventListener(
  //     "click",
  //     (event) => {
  //       buriContent.classList.toggle("buruburu");
  //     },
  //     false
  //   );
  // }

  return (
    <>
      <style>{style}</style>
      <div id="buri" className="buriWrapper" ref={buri}>
        <div
          id="buriContent"
          // className={"buri sashimi poyooon"}
          className={getClasses(
            props.buruburu ?? false,
            props.poyooon ?? false
          ).join(" ")}
        />
      </div>
    </>
  );
};
export default Buri;
