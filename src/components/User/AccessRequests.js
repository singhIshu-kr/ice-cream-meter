import React from 'react'

class AccessRequests extends React.Component{

  componentWillMount() {
    const { getAccessRequests, userId } = this.props;
    getAccessRequests(userId);
  }

  render(){
    const { requests} = this.props;
    return (
      <div>
        {
          requests.map(request=>{
            return (
              <ol>
              <h3>{request.userId} ==> {request.teamId}</h3>
              {/* <button onClick={()=>{giveAccess("ADMIN")}}></button> */}
              </ol>
            )
          })
        }
      </div>
    )
  }
}

export default AccessRequests;
