import { FiCheckCircle } from "react-icons/fi";

export const DailyLogIn = () => {
  const renderItems = () => Array.from({ length: 35 }, (_, index) => (
    <div key={index} className="bg-[#FEE3B7] p-3">
      +{index + 1}
    </div>
  ));

  return (
    <div className="grid grid-cols-9 gap-2">
      <div className="bg-[#77A000] p-3">
        <FiCheckCircle className="text-2xl"/>
      </div>
      {renderItems()}
    </div>
  );
};
