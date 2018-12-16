import React from 'react'

class AccessRequests extends React.Component{

  componentWillMount() {
    const { getAccessRequests, userId } = this.props;
    getAccessRequests(userId);
  }

  render(){
    const { requests, permitAccess, userId} = this.props;
    return (
      <div >
        {
          requests.map(request=>{
            return (
              <ul className="">
              <p >{request.userId} ==> {request.teamId}
              <button onClick={()=>{permitAccess(userId,request.userId,request.teamId,"ADMIN")}} id="accessButton">Make Admin</button>
              <button onClick={() => { permitAccess(userId, request.userId, request.teamId, "GUEST") }}
                    id="accessButton">Make Guest</button></p>
              </ul>
            )
          })
        }
      </div>
    )
  }
}

export default AccessRequests;
