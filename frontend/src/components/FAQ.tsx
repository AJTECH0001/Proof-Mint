import { useState, useRef, useEffect } from "react";  
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";  
import { Link } from "react-router-dom";  

const FAQCard = ({ question, answer }) => {  
  const [isOpen, setIsOpen] = useState(false);  
  const contentRef = useRef(null);  
  const [contentHeight, setContentHeight] = useState("0px");  

  const toggleCard = () => {  
    setIsOpen(!isOpen);  
  };  

  useEffect(() => {  
    if (contentRef.current) {  
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");  
    }  
  }, [isOpen]);  

  return (  
    <>  
      <div className="w-full max-w-[882px] mx-auto p-4 border border-[#E0E0E0] rounded-lg shadow-sm bg-[#E0E0E0]">  
        <div  
          onClick={toggleCard}  
          className="flex justify-between items-center cursor-pointer w-full"  
        >  
          <h3 className="text-[12px] lg:text-[24px] leading-[31.2px] font-bold text-[#242E20] w-full">  
            {question}  
          </h3>  
          {isOpen ? (  
            <CiCircleMinus size={24} className="text-[#3C4D35]" />  
          ) : (  
            <CiCirclePlus size={24} className="text-[#3C4D35]" />  
          )}  
        </div>  
      </div>  
      <div  
        ref={contentRef}  
        className="overflow-hidden transition-all duration-300 ease-in-out w-full max-w-[882px] mx-auto"  
        style={{  
          maxHeight: contentHeight,  
          opacity: isOpen ? 1 : 0,  
        }}  
      >  
        <p className="text-[16px] leading-[20.8px] font-light text-[#242E20] py-9 px-2">  
          {answer}  
        </p>  
      </div>  
    </>  
  );  
};  

const FAQ = () => {  
  const faqs = [  
    {  
      question: "What is an NFT receipt?",  
      answer: "A digital proof of purchase stored on the blockchain that provides immutable evidence of ownership and transaction details.",  
    },  
    {  
      question: "How do I store my NFT receipts?",  
      answer: "Your NFT receipts are automatically stored in your digital wallet. You can access them anytime through your account dashboard.",  
    },  
    {  
      question: "Can I transfer my NFTs to another wallet?",  
      answer: " Yes, you can transfer your NFTs to any compatible wallet address on the same blockchain network.",  
    },  
    {  
      question: "How long does the minting process take?",  
      answer: " The minting process typically takes 1-2 minutes, depending on network congestion and gas fees.",  
    },  
    {  
      question: "Is it safe to store receipts on the blockchain?",  
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eleifend velit nec risus vestibulum, ac cursus eros tempus. Sed sed metus felis. Ut vitae tortor ac ligula tempor consectetur. Maecenas convallis, nisi a fermentum cursus, lacus justo convallis est, eget scelerisque eros",  
    },  
  ];  

  return (  
    <div className="w-full mt-10"> 
      <p className="text-[16px] leading-[20.8px] font-normal text-center">
        FAQ
      </p>
      <h4 className="font-bold text-[32px] text-center leading-[41.px]">
        Frequently asked questions
      </h4> 
      <div className="my-10 flex flex-col gap-2">
      {faqs.map((faq, index) => (  
        <FAQCard key={index} question={faq.question} answer={faq.answer} />  
      ))}  
      </div>
      
    </div>  
  );  
};  

export default FAQ;