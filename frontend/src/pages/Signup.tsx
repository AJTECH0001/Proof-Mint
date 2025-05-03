import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header"; // Assuming Header is NewHeader
import Footer from "../components/Footer";
import { FaArrowRightLong } from "react-icons/fa6";
import metamask from "../assets/metamask.png";
import stellar from "../assets/wallet.png"; // Adjust path if different
import kit from "../utils/StellarWallet"; // Stellar Wallet Kit

export default function Signup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [walletError, setWalletError] = useState(null);
  const [detectWallet, setDetectWallet] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email field is empty
    if (!email) {
      alert("Enter email address to continue!");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    // Store email in localStorage
    localStorage.setItem("email", email);
    localStorage.setItem("walletClicked", "false");
    localStorage.setItem("detectWallet", "false");

    // Navigate to password page
    navigate("/password", { state: { email } });
  };

  const connectMetamask = async () => {
    if (!window.ethereum) {
      setWalletError("MetaMask is not installed!");
      return;
    }

    localStorage.setItem("walletClicked", "true");
    localStorage.setItem("detectWallet", "true");

    setDetectWallet(true);

    try {
      setLoading(true);

      // Request accounts
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("Please connect your MetaMask wallet");
      }

      const account = accounts[0];

      // Store essential data
      localStorage.setItem("userAddress", account);

      console.log("Wallet connected successfully");

      // Navigate to Persona
      navigate("/Persona", {
        replace: true,
        state: {
          account,
          detectWallet,
        },
      });
    } catch (error) {
      console.error("MetaMask error:", error);
      setWalletError(error.message || "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleStellarLogin = async () => {
    if (!kit) {
      setWalletError("Stellar Wallet Kit not initialized!");
      return;
    }

    localStorage.setItem("walletClicked", "true");
    localStorage.setItem("detectWallet", "true");

    setDetectWallet(true);

    try {
      setLoading(true);

      await kit.openModal({
        onWalletSelected: async (option) => {
          await kit.setWallet(option.id);
          const { address } = await kit.getAddress();

          localStorage.setItem("userAddress", address);

          console.log("Stellar Wallet connected successfully:", address);

          navigate("/Persona", {
            replace: true,
            state: {
              account: address,
              detectWallet,
            },
          });
        },
        onClosed: (err) => {
          if (err) {
            setWalletError(
              err.message ||
                "Please install a Stellar wallet extension (e.g., Freighter)."
            );
          }
        },
        modalTitle: "Connect Stellar Wallet",
        notAvailableText: "This wallet is not installed",
      });
    } catch (error) {
      console.error("Stellar Wallet error:", error);
      setWalletError(error.message || "Failed to connect Stellar wallet");
    } finally {
      setLoading(false);
    }
  };

  // Update cursor based on loading state
  useEffect(() => {
    document.body.style.cursor = loading ? "wait" : "default";
  }, [loading]);

  return (
    <div>
      <Header />
      <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center flex-grow w-full">
          <div className="w-[320px] h-[550px] lg:w-[422px] lg:h-[615px] rounded-xl bg-[#ffffff] flex flex-col items-center">
            {/* Email Form */}
            <form
              action="#"
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <div className="w-[350px] h-[64px] gap-2 flex flex-col items-center mt-[1rem] lg:mt-[3rem]">
                <h2 className="font-montserrat font-semibold text-[20px] lg:text-2xl leading-8 text-[#292929]">
                  Sign Up
                </h2>
                <p className="font-montserrat font-medium text-[12px] lg:text-[ドイツpx] leading-6 text-[#676767]">
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
                    aria-required="true"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[260px] lg:w-[350px] h-[47px] mt-[28px] px-[16px] py-[12px] gap-[16px] rounded-[6px] border-[1px] border-[#DBDBDB] text-[14px] font-montserrat font-normal leading-[23px] text-[#a9a9a9]"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-0 lg:right-3 w-[36px] h-[33.33px] top-[35px] left-[220px] lg:left-[306px] rounded-[6.67px] p-[10px] gap-2.5 bg-green-500 hover:bg-green-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="animate-spin rounded-full border-2 border-white border-t-transparent h-5 w-5"></span>
                    ) : (
                      <FaArrowRightLong className="text-[#fafafa] pointer-events-none" />
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
                    <span className="font-montserrat font-medium text-[10px] lg:text-[12px] leading-6 text-green-500">
                      Terms and Condition
                    </span>{" "}
                    and{" "}
                    <span className="font-montserrat font-medium text-[10px] lg:text-[12px] leading-6 text-green-500">
                      Privacy Policy
                    </span>
                  </p>
                </div>
              </div>
            </form>

            <div className="flex justify-center items-center w-[260px] lg:w-[350px] h-[24px] gap-3 mt-[1.5rem]">
              <span className="flex-grow border-t text-[#e6e6e6]"></span>
              <p className="mx-4 font-onset text-[#888888] font-normal text-[14px] leading-6">
                OR
              </p>
              <span className="flex-grow border-t text-[#e6e6e6]"></span>
            </div>

            <div className="flex flex-col items-center gap-3 w-[300px] lg:w-[350px] mt-4">
              <button
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
              </button>
              <button
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
              </button>
              {walletError && (
                <div className="text-red-500 text-sm mt-2 text-center">
                  {walletError}
                </div>
              )}
            </div>

            <div className="w-[273px] h-[24px] gap-1 flex justify-center items-center mt-8">
              <p className="font-montserrat font-medium text-[14px] lg:text-base leading-6 text-[#292929]">
                Already have an account?
              </p>
              <Link
                to="/signin"
                className="font-montserrat font-medium text-[14px] lg:text-base leading-6 text-green-500 cursor-pointer"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}