import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaGithub } from "react-icons/fa";
import { GiLaurelCrown } from "react-icons/gi";
import sidebarBg from "../../assets/bg2.jpg";
import { GiStrikingDiamonds } from "react-icons/gi";
import { Link } from "react-router-dom";

const SideBar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar } = props;
  const navigate = useNavigate();
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <div
              className=""
              style={{ width: "fit-content", cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            >
              <GiLaurelCrown
                size={40}
                style={{
                  color: "#fffa00",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              />
              QUIZZ
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<FaTachometerAlt />}
              // suffix={<span className="badge red">New</span>}
            >
              Dashboard
              <Link to="/admins"></Link>
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              // suffix={<span className="badge yellow">3</span>}
              // icon={<FaRegLaughWink />}
              icon={<GiStrikingDiamonds />}
              title="Features"
            >
              <MenuItem>
                Quản lý users
                <Link to="/admins/manage-user"></Link>
              </MenuItem>
              <MenuItem>
                Quản lý bài Quiz
                <Link to="/admins/manage-quiz"></Link>
              </MenuItem>
              <MenuItem>
                Quản lý câu hỏi<Link to="/admins/manage-questions"></Link>
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/azouaoui-med/react-pro-sidebar"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                viewSource
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
