import { useState, useRef, useEffect } from 'react';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const FAQCard = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState('0px');

  const toggleCard = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  return (
    <>
      <div
        className="w-full max-w-[882px] mx-auto p-4 border border-[#E0E0E0] rounded-lg shadow-sm bg-[#E0E0E0]"
        role="button"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        onClick={toggleCard}
      >
        <div className="flex justify-between items-center cursor-pointer">
          <h3 className="text-lg lg:text-xl font-bold text-[#242E20]">{question}</h3>
          {isOpen ? <CiCircleMinus size={24} className="text-[#3C4D35]" /> : <CiCirclePlus size={24} className="text-[#3C4D35]" />}
        </div>
      </div>
      <div
        id={`faq-answer-${index}`}
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 w-full max-w-[882px] mx-auto"
        style={{ maxHeight: contentHeight, opacity: isOpen ? 1 : 0 }}
      >
        <p className="text-base text-[#242E20] py-4 px-2">{answer}</p>
      </div>
    </>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: 'What is an NFT receipt?',
      answer: 'A digital proof of purchase stored on the blockchain, providing immutable evidence of ownership and transaction details.',
    },
    {
      question: 'How do I store my NFT receipts?',
      answer: 'Your NFT receipts are automatically stored in your digital wallet, accessible via your account dashboard.',
    },
    {
      question: 'Can I transfer my NFTs to another wallet?',
      answer: 'Yes, you can transfer your NFTs to any compatible wallet address on the same blockchain network.',
    },
    {
      question: 'How long does the minting process take?',
      answer: 'Minting typically takes 1-2 minutes, depending on network congestion and gas fees.',
    },
    {
      question: 'Is it safe to store receipts on the blockchain?',
      answer: 'Yes, blockchain ensures high security through immutability and decentralization, protecting your receipts from tampering or loss.',
    },
  ];

  return (
    <div className="w-full py-12">
      <p className="text-lg font-normal text-center text-gray-600">FAQ</p>
      <h4 className="font-bold text-3xl text-center mb-8">Frequently Asked Questions</h4>
      <div className="flex flex-col gap-2 max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <FAQCard key={index} question={faq.question} answer={faq.answer} index={index} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/support">
          <button className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 hover:scale-105 transition-all">
            Contact Support
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FAQ;