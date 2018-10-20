import React from 'react'
import NewTeam from './NewTeam'

const Container = ({activeElement, addNewTeam}) => (
  <div>
    <NewTeam activeElement={activeElement} addNewTeam={addNewTeam}/>
  </div>
)

export default Container;
