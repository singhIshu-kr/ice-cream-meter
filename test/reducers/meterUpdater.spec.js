import meterUpdater from '../../src/reducers/meterUpdater'

const types = {
  SET_TEAM: "SET_TEAM",
  ABC: "ABC",
  SIGNOUT_TEAM:"SIGNOUT_TEAM",
  NAME_IN_USE:"NAME_IN_USE"
}

describe('reducer',()=>{
  it('should return the updated team', () => {
    expect(meterUpdater({ team: [] }, {
      type: types.SET_TEAM,
      payload: []
    })).toEqual(
      { "nameInUse": false, "team": undefined, "teamName": undefined }
    )
  })

  it('should return initial state as default', () => {
    expect(meterUpdater(undefined, { type: types.ABC })).toEqual({ "nameInUse": false, "team": [], "teamName": null })
  });

  it('should return make the email undefined on signout team action', () => {
    const state = { nameInUse:false,email:"abc" };
    expect(meterUpdater(state, { type: types.SIGNOUT_TEAM })).toEqual({ "nameInUse": false, email:undefined})
  });

  it('should return name in use as true on the name in use action', () => {
    const state = { nameInUse: false, email: "abc" };
    expect(meterUpdater(state, { type: types.NAME_IN_USE })).toEqual({ "nameInUse": true, email: "abc" })
  });
})
