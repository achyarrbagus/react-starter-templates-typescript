import { Menu, Input, Space } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/BBC_logo_(1997-2021).svg.png";
import { useState } from "react";

const { Search } = Input;

function Navbar({ searchTerm, setSearchTerm }: any) {
  const onSearch = (value: string) => setSearchTerm(value);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <>
      <div className="w-full bg-white">
        <div className="ps-16">
          <Menu mode="horizontal">
            <Menu.Item key="home">
              <Link to={"/"}>
                <div className="pt-2">
                  <img src={logo} alt="logo" style={{ width: "100px" }} />{" "}
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item key="sub2">
              <div className="pt-2">
                <Search
                  placeholder="input search text"
                  allowClear
                  onSearch={onSearch}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ width: 200 }}
                />
              </div>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </>
  );
}

export default Navbar;
