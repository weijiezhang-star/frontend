import Heart from "../../../basic/icons/Heart";
import "lazysizes";

interface Props {
  imgUrl: string;
  username: string;
  recommend: number;
}
const CatImage = ({ imgUrl, username, recommend }: Props) => {
  return (
    <div className="relative overflow-x-hidden p-4 shadow-md rounded-md">
      <img
        data-src={imgUrl}
        alt={imgUrl.substring(imgUrl.lastIndexOf("/") + 1)}
        className="lazyload h-[216px] m-auto object-cover"
      />
      <div className="absolute flex w-[48px] h-[18px] right-[5px] bottom-[5px]">
        <div className="me-1">
          <Heart />
        </div>
        <div className="text-white text-[12px] leading-4">{recommend}</div>
      </div>
      <p className="mt-[9px] text-[12px] text-[#767676] leading-4 underline">
        {username}
      </p>
    </div>
  );
};

export default CatImage;
