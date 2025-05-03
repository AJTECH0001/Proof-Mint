import metamask from "../../assets/metamask.png";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";




export default function signup() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full h-screen bg-[url(/src/assets/bg.png)] bg-cover bg-center bg-no-repeat items-center">
   
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="w-[320px] h-[550px] lg:w-[422px] lg:h-[615px] rounded-xl bg-[#ffffff] flex flex-col items-center">
        {/* -------------------- EMAIL FORM -------------------------- */}
        <form
          action="#"
          // onSubmit={handleSubmit}
          className="flex flex-col items-center "
        >
          <div className="w-[350px] h-[64px] gap-2 flex flex-col items-center mt-[1rem] lg:mt-[3rem] ">
            <h2 className="font-montserrat font-semibold text-[20px] lg:text-2xl leading-8 text-[#292929]">
              Sign Up
            </h2>
            <p className="font-montserrat font-medium text-[12px] lg:text-[14px] leading-6 text-[#676767]">
              Create an account with us by email or wallet
            </p>
          </div>

          <div className="w-[260px] lg:w-[350px] h-[103px] gap-1 flex flex-col items-start mt-[1.4rem]">
            <label
              htmlFor="email"
              className="font-montserrat font-medium text-[14px] leading-6 text-[#292929]"
            >
              Email Address
            </label>
            <div className="relative flex items-center mt-[-1.8rem]">
              <input
                type="email"
                placeholder="Continue with email"
                // required
                aria-required="true"
                // onChange={(e) => setEmail(e.target.value)}
                className="w-[260px] lg:w-[350px] h-[47px] mt-[28px] px-[16px] py-[12px] gap-[16px] rounded-[6px] border-[1px]  border-[#DBDBDB] text-[14px] font-montserrat font-normal leading-[23px] text-[#a9a9a9]"
              />

              <button
                type="submit"
                disabled={loading}
                className="absolute right-0 lg:right-3  w-[36px] h-[33.33px] top-[35px] left-[220px] lg:left-[306px] rounded-[6.67px] p-[10px] gap-2.5 bg-[#2f66f6] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="animate-spin rounded-full border-2 border-white border-t-transparent h-5 w-5"></span>
                    Loading...
                  </>
                ) : (
                  <>
                    {" "}
                    <FaArrowRightLong className="text-[#fafafa] pointer-events-none " />{" "}
                  </>
                )}
              </button>
            </div>

            <div className="flex justify-center items-center w-[320px] lg:w-[340px] h-[24px] gap-1 ml-[-2rem] lg:ml-[-1rem]">
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                className="mt-[0.3rem]"
                defaultChecked={true}
                required
                aria-required="true"
              />
              <p className="font-montserrat font-medium text-[10px] lg:text-[12px] leading-6 text-[#292929]">
                Agree to our{" "}
                <span className="font-montserrat font-medium text-[10px] lg:text-[12px] leading-6 text-[#2f66f6]">
                  Terms and Condition
                </span>{" "}
                and{" "}
                <span className="font-montserrat font-medium text-[10px] lg:text-[12px] leading-6 text-[#2f66f6]">
                  Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </form>{" "}
        <div className="flex justify-center items-center w-[260px] lg:w-[350px] h-[24px] gap-3 mt-[1.5rem]">
          <span className="flex-grow border-t text-[#e6e6e6]"></span>
          <p className="mx-4 font-onset text-[#888888] font-normal text-[14px] leading-6">
            OR
          </p>
          <span className="flex-grow border-t text-[#e6e6e6]"></span>
        </div>
        {/* <div className="w-[350px] h-[64px] gap-2 flex flex-col items-center mt-[1rem] lg:mt-[3rem] ">
          <h2 className="font-montserrat font-semibold text-[20px] lg:text-2xl leading-8 text-[#292929]">
            Sign Up
          </h2>
          <p className="font-montserrat font-medium text-[12px] lg:text-[14px] leading-6 text-[#676767]">
            Create an account with us by connecting your wallet
          </p>
        </div> */}
        <div className="flex flex-col items-center gap-3 w-[300px] lg:w-[350px] h-[192px] ">
          {/* <button
            onClick={connectMetamask}
            disabled={loading}
            className={`flex items-center cursor-pointer w-[250px] lg:w-[350px] h-[56px] px-[24px] py-[16px] gap-[16px] rounded-[16px] border border-[#E8E8E8] bg-[#FAFAFA] ${
              loading ? "opacity-50" : ""
            }`}
          >
            <img src={metamask} alt="metamask logo" />
            <span className="font-montserrat font-medium text-[14px] leading-6 text-[#272954]">
              {loading ? "Connecting..." : "Connect Metamask"}
            </span>
          </button> */}
          {/* <button
onClick={handleStellarLogin}
disabled={loading}
className={`flex items-center cursor-pointer w-[250px] lg:w-[350px] h-[56px] px-[24px] py-[16px] gap-[16px] rounded-[16px] border border-[#E8E8E8] bg-[#FAFAFA] ${
  loading ? "opacity-50" : ""
}`}
>
<img src={stellar} alt="stellar logo" />
<span className="font-montserrat font-medium text-[14px] leading-6 text-[#272954]">
  {loading ? "Connecting..." : "Connect Stellar Wallet"}
</span>
</button> */}
          {/* Error display */}
          {/* {walletError && (
            <div className="text-red-500 text-sm mt-2 text-center">
              {walletError}
            </div>
          )} */}

          {/* <div className="flex justify-center items-center w-[260px] lg:w-[350px] h-[24px] gap-3 mt-[1.5rem]">
            <span className="flex-grow border-t text-[#e6e6e6]"></span>
            <p className="mx-4 font-onset text-[#888888] font-normal text-[14px] leading-6">
              OR
            </p>
            <span className="flex-grow border-t text-[#e6e6e6]"></span>
          </div> */}

          {/* <button className="flex items-center cursor-pointer w-[250px] lg:w-[350px] h-[56px] px-[24px] py-[16px] gap-[16px] rounded-[16px] border border-[#E8E8E8] bg-[#FAFAFA] ">
            <img src={wallet} alt="wallet logo" />
            <span className="font-montserrat font-medium text-[14px] leading-6 text-[#272954]">
              Wallet connect
            </span>
          </button> */}

          {/* UNCOMMENT HERE TO USE THE WALLET CONNECT BUTTON */}
          {/* <div className="mt-10">
            <ConnectButton label="Wallet Connect" />

          </div> */}
        </div>
        {/* Fix this */}
        {/* {walletError && (
          <div className="text-red-500 text-sm mt-2 text-center">
            {walletError}
          </div>
        )} */}
        {/* {walletError && <p className="text-red-800">Error: {walletError}</p>} */}
        <div className="w-[273px] h-[24px] gap-1 flex justify-center items-center mt-8">
          <p className="font-montserrat font-medium text-[14px] lg:text-base leading-6 text-[#292929]">
            Already have an account?
          </p>
          <Link
            to="/signin"
            className="font-montserrat font-medium text-[14px] lg:text-base leading-6 text-[#2f66f6] cursor-pointer"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}
