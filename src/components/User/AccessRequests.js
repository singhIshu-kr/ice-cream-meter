import React from 'react'

class AccessRequests extends React.Component{

  componentWillMount() {
    const { getAccessRequests, userId } = this.props;
    getAccessRequests(userId);
  }

  render(){
    const { requests, permitAccess, userId} = this.props;
    return (
      <div className="access">
        {/* <h2>Access Requests</h2> */}
        {
          requests.map(request=>{
            return (
              <ol className="accessRequest">
              <div ><p id="request">{request.userId} ==> {request.teamId}</p></div>
              <button onClick={()=>{permitAccess(userId,request.userId,request.teamId,"ADMIN")}} id="accessButton">Make Admin</button>
              <button onClick={() => { permitAccess(userId, request.userId, request.teamId, "GUEST") }}
              id="accessButton">Make Guest</button>
              </ol>
            )
          })
        }
      </div>
    )
  }
}

export default AccessRequests;
