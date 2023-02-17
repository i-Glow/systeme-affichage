import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import {ConatinerFLex,LeftSide,Main} from "../components/Style/Style"
export default function HomePage() {
  return (
    <ConatinerFLex >
        <LeftSide>
            <Link to="archive">Archive</Link>
            <Link to="Brouillons">Brouillons</Link>
            <Link to="Home">Home</Link>
        </LeftSide>
        <Main >
            <Outlet/>
        </Main>
    </ConatinerFLex>
  )
}
