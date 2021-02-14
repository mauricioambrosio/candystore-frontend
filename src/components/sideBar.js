import React from "react";

const SideBar = () => {
  return (
    <div className="sidebar border rounded bg-light">
        <nav className="sidebar-nav ">
            <ul className="list-group">

                <li className="list-group-item">
                    <a className="nav-link" href="#">
                        Products
                    </a>
                </li>

                <li className="list-group-item">
                    <a className="nav-link" href="#">
                         Flavors
                    </a>
                </li>

            </ul>
        </nav>
 
</div>
  );
};

export default SideBar;
