import React from 'react'
import NewTeam from './NewTeam'

const Container = ({activeElement, addNewTeam, userId}) => (
  <div>
    <NewTeam activeElement={activeElement} addNewTeam={addNewTeam} userId={userId}/>
  </div>
)

export default Container;
