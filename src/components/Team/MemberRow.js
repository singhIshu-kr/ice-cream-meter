import React from 'react';
import prototype from 'prop-types'

const MemberBar =({increaseScore,decreaseScore,removeMember,memberInfo})=>(
  <div className ="member">
    <span onClick={() => removeMember(memberInfo.id,memberInfo.teamID)} id = "remove"><i className="fa fa-times-circle memberDelete"></i></span>  
    <div className="memberInfo">
      <h4 className="column" id= "memberName" >{memberInfo.name}</h4>
      <div className="memberScoreActionBtns">
        <span onClick={() => increaseScore(memberInfo.id,memberInfo.teamID)} id = "add"><i className="fa fa-plus-square"></i></span>
        <span onClick={() => decreaseScore(memberInfo.id,memberInfo.teamID)} id = "decrease"><i className="fa fa-minus-square"></i></span>
      </div>
    </div>
    <div className="memberScore primary">
      <label id="score">{memberInfo.score}</label>
    </div>
  </div>
)


MemberBar.prototype = {
  name: prototype.string.isRequired,
  id:prototype.number.isRequired,
  score: prototype.number.isRequired,
  increaseScore: prototype.func.isRequired,
  removeMember: prototype.func.isRequired,
}

export default MemberBar;
