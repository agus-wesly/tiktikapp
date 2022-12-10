import React from "react";
import { footerList1, footerList2, footerList3 } from "../utils/constants";

interface itemProps {
  items: string[];
}

const FooterList = ({ items }: itemProps) => (
  <div className="flex flex-wrap text-gray-500 text-sm gap-x-3">
    {items.map((itm, i) => (
      <p className="hover:underline cursor-pointer" key={i}>
        {itm}
      </p>
    ))}
  </div>
);

const Footer = () => {
  return (
    <div className="hidden xl:flex flex-col gap-3 mt-5 py-4">
      <FooterList items={footerList1} />
      <FooterList items={footerList2} />
      <FooterList items={footerList3} />
    </div>
  );
};

export default Footer;
