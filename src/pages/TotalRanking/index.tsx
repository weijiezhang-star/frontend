import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import SearchBar from "../../components/common/SearchBar";
import RankingBar from "../../components/common/RankingBar";
import Store from "../../components/common/Store";
import Notices from "../../components/common/Notices";
import LargeCatCard from "../../components/basic/LargeCatCard";
import CatCard from "../../components/basic/blog/CatCard";
import { CapSecond } from "../../components/basic/icons/CapSecond";
import { CapThird } from "../../components/basic/icons/CapThird";
import SmallCatCard from "../../components/basic/SmallCatCard";
import SocialLinkGroup from "../../components/common/SocialLinkGroup";
import axios from "axios";
import { CatObjectType } from "../../constant/type";

const isNew = false;

const TotalRanking = () => {
  const [list, setList] = useState<string[]>([]);
  const [catData, setCatData] = useState<CatObjectType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("totalrankingcat");
        setCatData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(catData);

  return (
    <MainLayout>
      <SocialLinkGroup />
      <SearchBar list={list} setList={setList} />
      <div className="bg-[#F5F4EC]">
        <div className="  w-[960px] m-auto ">
          <RankingBar />
          {/* <div className="text-[40px] leading-[53px]">
            <span>2023年11月</span>
          </div> */}
          <div className="ranking-1 mt-[24px] mb-[24px]">
            <div className="ranking-1-tle flex gap-[8px]">
              <img src="/assets/imgs/ranking-1-cap.svg" alt="cat" />{" "}
              <span className="text-[24px] font-bold leading-[32px]">1位</span>
            </div>
          </div>
          {catData[0] && (
            <LargeCatCard
              id={1}
              cat_name={catData[0].cat_name}
              shop_name={catData[0].shop_name}
              prefecture={catData[0].prefecture}
              cat_images={catData[0].cat_images}
              character={catData[0].character}
              favorite_things={catData[0].favorite_things}
              attendance={catData[0].attendance}
              description={catData[0].description}
              recommend_user={catData[0].recommend_user}
              isNew={isNew}
            />
          )}
          <div className="mt-[24px]">
            <div className="flex justify-between flex-wrap ">
              {catData &&
                catData.slice(1, 4).map((e, i) => (
                  <div className="flex flex-col">
                    <div className="flex leading-[27px] mb-[7px]">
                      {i === 0 && (
                        <div className="w-[36px] h-[26px] me-[12px]">
                          <CapSecond />
                        </div>
                      )}
                      {i === 1 && (
                        <div className="w-[36px] h-[26px] me-[12px]">
                          <CapThird />
                        </div>
                      )}
                      {i + 2}位
                    </div>
                    <CatCard
                      key={i}
                      id={e.id}
                      cat_name={e.cat_name}
                      shop_name={e.shop_name}
                      prefecture={e.prefecture}
                      cat_images={e.cat_images}
                      character={e.character}
                      favorite_things={e.favorite_things}
                      attendance={e.attendance}
                      description={e.description}
                      recommend_user={e.recommend_user}
                      isNew={false}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex-wrap mt-[16px] grid grid-cols-2 gap-x-[24px] gap-y-[16px] pb-[65px] border-b border-[#CBB279]">
            {catData &&
              catData.slice(4, 11).map((e, i) => (
                <div className="flex flex-col" key={i}>
                  <div className="flex leading-[27px] mb-[7px]">{i + 5}位</div>
                  <SmallCatCard
                    id={1}
                    cat_name={e.cat_name}
                    shop_name={e.shop_name}
                    prefecture={e.prefecture}
                    cat_images={e.cat_images}
                    character={e.character}
                    favorite_things={e.favorite_things}
                    attendance={e.attendance}
                    description={e.description}
                    recommend_user={e.recommend_user}
                    isNew={isNew}
                  />
                </div>
              ))}
          </div>
          <div>
            <div className="pt-[65px] pb-[80px]">
              <div className="mb-[24px] hover:opacity-70">
                <a href="/nyanplace" className="relative">
                  <img src="/assets/imgs/signboard.png" alt="signboard" />
                  <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[32px] text-white font-bold tracking-widest">
                    『看板猫に会える場所』一覧
                  </p>
                </a>
              </div>
              <div className="hover:opacity-70">
                <a href="/shopresister">
                  <img src="/assets/imgs/member.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Store />
      <Notices />
    </MainLayout>
  );
};

export default TotalRanking;
