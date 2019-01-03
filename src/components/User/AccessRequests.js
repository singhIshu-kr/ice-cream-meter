import React from 'react'

class AccessRequests extends React.Component{

  componentWillMount() {
    const { getAccessRequests, userId } = this.props;
    getAccessRequests(userId);
  }

  render(){
    const { requests, permitAccess, userId} = this.props;
    return (
      <div className={"requestsContainer"}>
        {
          requests.map(request=>{
            return (
              <div className={"requests"}>
                {request.userId} would like to access <span className={"bolder"}>{request.teamId}</span><br/>
                <button onClick={()=>{permitAccess(userId,request.userId,request.teamId,"ADMIN")}} id="accessButton">Make Admin</button>&nbsp;
                <button onClick={() => { permitAccess(userId, request.userId, request.teamId, "GUEST") }} id="accessButton">Make Guest</button>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default AccessRequests;
