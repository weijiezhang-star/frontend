import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CatDetailComment = (props: any) => {
  const navigate = useNavigate();
  const commentLoginElement = useRef<HTMLDivElement>(null);
  const [commentLoginShow, setCommentLoginShow] = useState(false);
  const [loginSectionHover, setLoginSectionHover] = useState(false);
  const { isAuthenticated } = useSelector((state: any) => state.user);

  const goToComment = () => {
    if (isAuthenticated) navigate(`/comment/${props.id}`);
    else setCommentLoginShow(true);
  };

  return (
    <div className="pt-8 pb-8 sm:pb-[63px]">
      <div className="bg-[#FBA1B7] flex flex-col sm:grid sm:h-[92px] xs:grid-cols-3 md:grid-cols-2 overflow-visible rounded-xl">
        <div className="hidden sm:flex justify-between relative sm:col-span-2 md:col-span-1">
          <div>
            <div className="relative h-full">
              <div className="h-full w-[100px] lg:w-[150px] absolute top-0 left-[-11px] ">
                <img
                  src="/assets/imgs/catdetailcomment-2.webp"
                  alt="catdetailcomment-2"
                  className="h-full w-auto m-auto"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="absolute top-[-20px] right-0 lg:right-[20px]">
              <p className="flex flex-col lg:text-[20px] font-bold text-[#767676] pt-4 pr-6 pb-4 pl-10 comment-link-tooptip">
                <span>推し写真のアップ＆</span>
                <span>推しコメントを書いてね！</span>
              </p>
              <img
                src="/assets/imgs/catdetailcomment-1.webp"
                alt="catdetailcomment-1"
                className="absolute top-0 left-0 -z-10"
              />
            </div>
          </div>
        </div>
        <div className="block sm:flex justify-between sm:col-span-1 md:col-span-1">
          <div
            className="relative"
            ref={commentLoginElement}
            onMouseLeave={() => {
              if (!loginSectionHover) {
                setCommentLoginShow(false);
                setLoginSectionHover(false);
              }
            }}
          >
            <button
              onClick={goToComment}
              className="flex justify-center items-center h-full m-auto"
            >
              <span className="lg:text-[28px] tracking-[-3px] text-white font-bold">
                コメントするニャン！
              </span>
              <span>
                <img
                  src="/assets/imgs/icons/arr-right-white.webp"
                  alt="arr-right-white"
                />
              </span>
            </button>
            {commentLoginShow && (
              <span
                className="absolute -left-0 -bottom-[50px] w-[250px] bg-white px-4 py-2 shadow-md rounded-xl cursor-pointer"
                onClick={() => navigate("/login")}
                onMouseOver={() => setLoginSectionHover(true)}
                onMouseLeave={() => {
                  setCommentLoginShow(false);
                  setLoginSectionHover(false);
                }}
              >
                会員ログイン後にボタンを押すことが可能です
                <span className="w-2 h-4 absolute left-10 -top-4 z-20 border-8 border-transparent border-b-white"></span>
              </span>
            )}
          </div>
          <div className="">
            <div className="relative h-full">
              <div className="hidden sm:block absolute top-0 right-[-11px] h-full w-[100px] lg:w-[150px]">
                <img
                  src="/assets/imgs/catdetailcomment-1.webp"
                  alt="catdetailcomment-1"
                  className="h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatDetailComment;
