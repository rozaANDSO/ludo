import { Image } from "@chakra-ui/react";
import one from "../../../assets/dice/1.png";
import two from "../../../assets/dice/2.png";
import three from "../../../assets/dice/3.png";
import four from "../../../assets/dice/4.png";
import five from "../../../assets/dice/5.png";
import six from "../../../assets/dice/6.png";
import { useEffect, useState } from "react";
import { DiceValue } from "../../../utils/types";
type Props = {
  diceValue: DiceValue;
};
const DiceFace = ({ diceValue }: Props) => {
  useEffect(() => {
    changeAnim(diceValue.value);
  }, [diceValue]);
  const images = [one, two, three, four, five, six];
  const [src, setSrc] = useState(one);
  const changeAnim = async (s: number) => {
    for (let i = 0; i < 6; i++) {
      setSrc(images[i]);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    setSrc(images[s - 1]);
  };

  return <Image boxSize="40px" src={src} />;
};
export default DiceFace;
