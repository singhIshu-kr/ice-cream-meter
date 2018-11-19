import React from 'react';

class MemberBar extends React.Component {
  renderButtonsForAdmin() {
    const { increaseScore, decreaseScore, removeMember, memberInfo } = this.props;
    return (
      <div>
        <span onClick={() => removeMember(memberInfo.id, memberInfo.teamID)} id="remove"><i className="fa fa-times-circle memberDelete"></i></span>
        <div className="memberScoreActionBtns">
          <span onClick={() => increaseScore(memberInfo.id, memberInfo.teamID)} id="add"><i className="fa fa-plus-square"></i></span>
          <span onClick={() => decreaseScore(memberInfo.id, memberInfo.teamID)} id="decrease"><i className="fa fa-minus-square"></i></span>
        </div>
      </div>
    )
  }

  render() {
    const { memberInfo, userType } = this.props;
    return (
      <div className="member">
        <div className="memberInfo">
          <h4 className="column" id="memberName" >{memberInfo.name}</h4>
          {userType !== "GUEST" && this.renderButtonsForAdmin()}
        </div>
        <div className="memberScore primary">
          <label id="score">{memberInfo.score}</label>
        </div>
      </div>
    )
  }
}

export default MemberBar;
