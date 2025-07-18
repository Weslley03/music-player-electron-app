import type React from "react";
import styles from './RoundedBottom.module.scss';
import colors from "../../utils/colors";

type Props = {
  text: string;
  textSize?: string
  textColor?: string;
  backgroundColor?: string;
  haveHover?: boolean;
}

const RoundedBottom: React.FC<Props> = ({
  text,
  textSize = '16px',
  textColor = colors.white,
  backgroundColor = colors.dark200,
  haveHover = true,
}) => {
  return (
    <div
      className={`${styles.roundedBottom} ${!haveHover ? styles.noHover : ''}`}
      style={{
        backgroundColor,
        fontSize: textSize,
      }}
    >
      <p
        style={{
          userSelect: 'none',
          fontSize: textSize,
          color: textColor,
        }}
      > {text} </p>
    </div>
  )
};

export default RoundedBottom;