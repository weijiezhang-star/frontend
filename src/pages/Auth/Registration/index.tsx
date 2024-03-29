import { lazy } from "react";
import MainLayout from "../../../layouts/MainLayout";
import Container from "../../../components/basic/Container";
import HelmetPage from "../../../layouts/MainLayout/HelmetPage";
import Title from "../../../components/common/Typography/Title";
import PageBar from "../../../components/common/PageBar";
import SocialLinkGroup from "../../../components/common/SocialLinkGroup";
const SignupForm = lazy(() => import("../../../components/common/SignupForm"));

const Registration = () => {
  return (
    <>
      <HelmetPage
        title="推しニャン｜会員登録ページ"
        description="推しニャンに会員登録をするページ。メールアドレスだけで簡単登録が可能です。"
        keywords="看板猫, 推しニャン, 猫のいる店"
      />
      <MainLayout>
        <SocialLinkGroup />
        <Container>
          <PageBar page="会員登録ニャ！" />
          <Title title="会員登録ニャ！" />
          <div className="mt-[16px] text-[16px] leading-[21px]">
            会員登録して、推しニャンを見つけて楽しむニャー
          </div>
          <div className="mt-[32px] mb-[56px]">
            <SignupForm />
          </div>
        </Container>
      </MainLayout>
    </>
  );
};

export default Registration;
