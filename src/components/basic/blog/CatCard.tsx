import React, { memo, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";
import { CatObjectType } from "../../../constant/type";
import { useDispatch, useSelector } from "react-redux";
import { RecommendAction, RecommendOutAction } from "../../../slices/cat";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { isNewUtil } from "../../../utils/functions";
import "lazysizes";

const CatCard = ({
  id,
  page,
  is_public,
  advertise,
  cat_name,
  shop,
  images,
  character,
  description,
  recommend,
  created_date,
}: CatObjectType) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recommendLoginElement = useRef<HTMLDivElement>(null);
  const [isNew, setIsNew] = useState<boolean | undefined>(false);
  const [recommendLoginShow, setRecommendLoginShow] = useState(false);
  const [loginSectionHover, setLoginSectionHover] = useState(false);
  const [hoverAction, setHoverAction] = useState(false);
  const [imgWidth, setImgWidth] = useState<number>();
  const [imgHeight, setImgHeight] = useState<number>();
  const { user, isAuthenticated } = useSelector((state: any) => state.user);
  const [isRecommend, setIsRecommend] = useState<boolean>(
    recommend.some((e) => e.user === user.user_id)
  );

  useEffect(() => {
    setIsNew(isNewUtil(created_date));
  }, [created_date]);

  const handleRecommend = async () => {
    if (isAuthenticated) {
      if (!advertise) {
        if (!recommend?.find((e) => e.user === user.user_id)) {
          const submitData = {
            cat_id: id,
            user_id: user.user_id,
          };
          const data = await dispatch(RecommendAction(submitData));
          data.type.includes("fulfilled") && setIsRecommend(true);
        }
      } else {
        if (!recommend?.find((e) => e.user === user.user_id)) {
          const submitData = {
            advertise_id: id,
            user_id: user.user_id,
          };
          dispatch(RecommendAction(submitData));
        }
      }
      // Recommend Delete Start
      if (page && recommend[0].user === user.user_id) {
        dispatch(RecommendOutAction(recommend[0].id));
      }
      // Recommend Delete End
    } else {
      setRecommendLoginShow(true);
    }
  };

  const goToCatDetail = (id: number) => {
    !advertise
      ? (window.location.href = `/oshinyan/${id}`)
      : (window.location.href = `/oshinyan/${id}?advertise=${"advertise"}`);
  };

  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = event.currentTarget;
    setImgWidth(img.width);
    setImgHeight(img.height);
  };

  return (
    <div className="relative m-auto sm:m-0">
      <div
        className={`m-auto w-[312px] xs:max-w-[480px] xs:m-auto md:max-w-[312px] md:h-[512px] mb-[15px] ${
          hoverAction && "transform transition duration-500 scale-105"
        }`}
        onMouseOver={() => setHoverAction(true)}
        onMouseLeave={() => setHoverAction(false)}
      >
        <div>
          <div>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              pagination={{
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true,
              }}
              loop={true}
              centeredSlides
              slidesPerView={1}
              navigation={{
                nextEl: `.arrow-right${id}${advertise && id}`,
                prevEl: `.arrow-left${id}${advertise && id}`,
              }}
              className="cursor-pointer"
            >
              {images &&
                images?.map((item: any, key: number) => {
                  return (
                    <SwiperSlide key={key} className="h-[234px] bg-white">
                      <button
                        onClick={() => goToCatDetail(id)}
                        className="h-full w-full"
                      >
                        <img
                          src={item.imgs}
                          alt={String(item.imgs).substring(
                            String(item.imgs).lastIndexOf("/") + 1
                          )}
                          className={`lazyload h-full m-auto cursor-pointer object-cover overflow-hidden`}
                          onLoad={handleImageLoad}
                          width={imgWidth}
                          height={imgHeight}
                        />
                      </button>
                    </SwiperSlide>
                  );
                })}
              <div className="swiper-pagination custom-pagination-bullets"></div>
              {images && images?.length > 1 && (
                <>
                  <button
                    className={`arrow-left${id}${
                      advertise && id
                    } xs:hidden md:block`}
                  >
                    <div className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                      {/* <ArrowLeft /> */}
                      <svg
                        style={{ marginRight: "4px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="12.728"
                        height="12.728"
                        viewBox="0 0 12.728 12.728"
                      >
                        <path
                          id="arr_left"
                          d="M499-1749v8h-8"
                          transform="translate(-877.52 -1577.555) rotate(135)"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          opacity="0.75"
                        />
                      </svg>
                    </div>
                  </button>
                  <button
                    className={`arrow-right${id}${
                      advertise && id
                    } xs:hidden md:block`}
                  >
                    <div className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                      {/* <ArrowRight /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12.728"
                        height="12.728"
                        viewBox="0 0 12.728 12.728"
                      >
                        <path
                          id="arr_right"
                          d="M499-1749v8h-8"
                          transform="translate(890.247 1590.283) rotate(-45)"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          opacity="0.75"
                        />
                      </svg>
                    </div>
                  </button>
                </>
              )}
            </Swiper>
            <div
              className="absolute top-[8px] right-[8px] z-10"
              ref={recommendLoginElement}
              onMouseLeave={() => {
                if (!loginSectionHover) {
                  setRecommendLoginShow(false);
                  setLoginSectionHover(false);
                }
              }}
            >
              <span
                className="cursor-pointer rounded-full"
                onClick={handleRecommend}
              >
                {isRecommend ? (
                  <img
                    src="/assets/imgs/icons/recommend-on.webp"
                    alt="recommend-on"
                  />
                ) : (
                  <img
                    src="/assets/imgs/icons/recommend-off.webp"
                    alt="recommend-off"
                    width={48}
                    height={48}
                  />
                )}
              </span>
              {recommendLoginShow && (
                <span
                  className="absolute z-[9999] right-1 -bottom-[70px] w-[250px] bg-white px-4 py-2 shadow-md rounded-xl cursor-pointer"
                  onClick={() => navigate("/login")}
                  onMouseOver={() => setLoginSectionHover(true)}
                  onMouseLeave={() => {
                    setRecommendLoginShow(false);
                    setLoginSectionHover(false);
                  }}
                >
                  会員ログイン後にボタンを押すことが可能です
                  <div className="absolute right-2 -top-4 w-full flex justify-end">
                    <span className="w-2 h-4 z-20 border-8 border-transparent border-b-white"></span>
                  </div>
                </span>
              )}
            </div>
            {isNew && (
              <span className="absolute top-0 left-0 z-10">
                <img src="/assets/imgs/icons/parts-new.webp" alt="parts-new" />
              </span>
            )}
          </div>
          <div
            className={`px-[16px] h-[278px] ${
              is_public ? "bg-white" : "bg-[#ccc]"
            }`}
          >
            <div>
              <h3 className="text-[24px] font-bold text-left text-ellipsis overflow-hidden whitespace-nowrap">
                {cat_name}
              </h3>
            </div>
            <div className="flex justify-between">
              <button
                className={`underline text-[16px] text-ellipsis overflow-hidden tracking-tighter ${
                  hoverAction && "text-[#0000FF]"
                }`}
                onClick={() => navigate(`/nyanplace/${shop.id}`)}
              >
                {shop.shop_name}
              </button>
              <div>
                <CustomButton
                  value={shop.prefecture}
                  className={
                    hoverAction &&
                    "bg-[#CBB279] border-[#CBB279] text-white inline-block"
                  }
                />
              </div>
            </div>
            <div className="flex justify-content-start items-center mt-[15px] mb-[8px]">
              <span className=" flex d-inline-block align-items-center w-[24px] h-[24px]  mr-[9px]">
                <img
                  src="/assets/imgs/icons/recommend.webp"
                  className=" align-items-center"
                  alt="recommend"
                  width={24}
                  height={24}
                />
              </span>
              <h2 className="text-[24px] d-inline-block">
                {recommend && recommend.length}ニャン
              </h2>
            </div>
            <hr className="border border-[#CCC]" />
            <div className="flex justify-content-start items-center gap-1 pt-[10px] pb-[19px] ">
              <div>
                <img
                  src="/assets/imgs/icons/hear-yellow.webp"
                  alt="hear-yellow"
                  width={24}
                  height={24}
                />
              </div>
              <div className="px-[8px] whitespace-nowrap">
                <p>性格</p>
              </div>
              <div className="flex flex-wrap justify-start items-center gap-1 h-[60px] overflow-hidden">
                {character &&
                  character.slice(0, 3).map((item, key, arr) => (
                    <div className="" key={key}>
                      <CustomButton
                        value={item.character}
                        className={
                          hoverAction && "bg-[#CBB279] text-white border-0"
                        }
                      />
                    </div>
                  ))}
                {character && character.length > 3 && <span>...</span>}
              </div>
            </div>
            <div className=" pb-[43px]">
              <p className="break-words	text-[16px] text-ellipsis overflow-hidden whitespace-wrap h-12">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CatCard);
