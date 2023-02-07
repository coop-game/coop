import Image, { StaticImageData } from "next/image";
import { useRef } from "react";

function Picture({ images }: { images: StaticImageData }) {
  const ref = useRef(null);
  return (
    <section>
      <div ref={ref}>
        <Image height={720} src={images} alt="이미지" />
      </div>
    </section>
  );
}

export default Picture;
