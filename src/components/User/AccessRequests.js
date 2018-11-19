import React from 'react'

class AccessRequests extends React.Component{

  componentWillMount() {
    const { getAccessRequests, userId } = this.props;
    getAccessRequests(userId);
  }

  render(){
    const { requests, permitAccess, userId} = this.props;
    return (
      <div>
        {
          requests.map(request=>{
            return (
              <ol>
              <h3>{request.userId} ==> {request.teamId}</h3>
              <button onClick={()=>{permitAccess(userId,request.userId,request.teamId,"ADMIN")}}>Make Admin</button>
              <button onClick={() => { permitAccess(userId, request.userId, request.teamId, "GUEST") }}>Make Guest</button>
              </ol>
            )
          })
        }
      </div>
    )
  }
}

export default AccessRequests;
