import React, { useRef, useState } from "react";
import axios from "axios";
import { PREFECTURE } from "../../../constant";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Store } from "react-notifications-component";

const SignupForm = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(true);
  const [values, setValues] = useState({
    username: "",
    prefecture: "北海道",
    email: "",
    password: "",
  });
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("username", values.username);
    formData.append("prefecture", values.prefecture);
    formData.append("email", values.email);
    formData.append("password", values.password);
    selectedFile != null && formData.append("avatar", selectedFile[0]);
    if (checked === true) {
      try {
        const res = await axios.post("register", formData);
        Store.addNotification({
          title: "Success!",
          message: "Successfully created!",
          type: "success",
          container: "top-right",
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
      } catch (error: any) {
        if (error.response.status === 400)
          Store.addNotification({
            title: "Warning!",
            message: "Already exist!",
            type: "warning",
            container: "top-right",
            dismiss: {
              duration: 2000,
              onScreen: true,
            },
          });
        else
          Store.addNotification({
            title: "Error!",
            message: "Server Error!",
            type: "danger",
            container: "top-right",
            dismiss: {
              duration: 2000,
              onScreen: true,
            },
          });
      }
    }
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((values) => ({ ...values, [name]: value }));
  };

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files);
  };

  return (
    <div className="bg-white p-[24px] pb-[40px]">
      <form className="" onSubmit={handleSubmit}>
        <div className="flex">
          <div className="flex">
            <div
              className="w-[72px] h-[72px] me-[38px] text-sm bg-[#ccc] rounded-full flex justify-center items-center text-center"
              onClick={() => {
                fileRef?.current?.click();
              }}
            >
              {selectedFile ? (
                selectedFile[0].name
              ) : (
                <img src="/assets/imgs/icon_add.png" alt="icon_add" />
              )}
            </div>
            <input
              type="file"
              name="icon"
              className="hidden"
              ref={fileRef}
              accept="image/*"
              onChange={selectFile}
            />
          </div>
          <div className="grow">
            <div className="flex justify-between h-[80px] border-b border-[#CCCCCC] items-center">
              <div className="flex items-center">
                <label htmlFor="username" className="w-[134px]">
                  ニックネーム
                </label>
                <input
                  className="bg-[#F7F7F7] border border-[#CCCCCC] rounded-[5px] me-auto h-[40px] w-[304px] p-2 focus:outline-none"
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center">
                <label htmlFor="residence" className="w-[96px]">
                  居住エリア
                </label>
                <div className="relative my-auto h-[40px]">
                  <select
                    id="prefecture"
                    name="prefecture"
                    onChange={handleChange}
                    className="appearance-none pr-8 bg-right bg-no-repeat rounded-full text-center text-[16px] w-[144px] bg-gradient-to-b from-[#EAEAEA] to-[#D3D3D3] border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {PREFECTURE.map((e, key) => (
                      <option value={e} key={key}>
                        {e[0]}
                      </option>
                    ))}
                  </select>
                  <div
                    className="w-[12px] h-[8px] absolute top-[18px] right-2"
                    style={{
                      backgroundImage:
                        "url('/assets/imgs/select_triangle.png')",
                    }}
                  ></div>
                </div>
              </div>
            </div>
            {/* row2 */}
            <div className="flex justify-between h-[80px] border-b border-[#CCCCCC] items-center mt-[4px]">
              <label htmlFor="email" className="w-[134px]">
                メールアドレス
              </label>
              <input
                className="bg-[#F7F7F7] border border-[#CCCCCC] rounded-[5px] me-auto h-[40px] w-full p-2 focus:outline-none"
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between h-[80px] border-b border-[#CCCCCC] items-center mt-[4px]">
              <label htmlFor="password" className="w-[134px]">
                パスワード
              </label>
              <input
                className="bg-[#F7F7F7] border border-[#CCCCCC] rounded-[5px] me-auto h-[40px] w-full p-2 focus:outline-none"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-[24px]">
          <div className="text-center">
            <label htmlFor="privacy" className="w-[134px]">
              個人情報の取扱い方針
            </label>
          </div>
          <textarea
            className="p-1 text-[12px] mt-3 text-left bg-[#F7F7F7] border border-[#CCCCCC] me-auto h-[160px] w-[528px] overflow-y-auto"
            name="privacy"
            id="privacy"
          >
            個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針
            個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針
            個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針
            個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針
            個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針
            個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針
            個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針
            個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針
            個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針
            個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針個人情報の取扱い方針
          </textarea>
          <div className="text-center mt-[27px] pb-[27px] border-b border-[#CCCCCC]">
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleChange1} />}
              label="同意するニャン"
            />
          </div>
          <div className="mt-[47px] text-center">
            <button
              type="submit"
              className={`text-[24px] ${
                checked ? "bg-[#FBA1B7]" : "bg-[#f8c6d2]"
              }  h-[48px] border-solid rounded-full py-2 ps-[42px] pe-[40px] leading-[32px] text-center text-white`}
            >
              確認ニャ！
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;

// bg-[#FBA1B7]
