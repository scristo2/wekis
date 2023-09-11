import { NextPage } from "next";
import React from "react";

interface LayoutProps {

    children : React.ReactNode[]
}

const Layout : NextPage<LayoutProps> = (props) => {

    return (<div className="container">
      <header>
        {props.children[0]}
      </header>
      <main>
        {props.children[1]}
      </main>
      <footer>
           {props.children[2]}
      </footer>
    </div>)
}

export default Layout;