import meterUpdater from '../../src/reducers/meterUpdater'

const types = {
  SET_TEAM: "SET_TEAM",
  ABC: "ABC"
}

describe('reducer',()=>{
  it('should return the updated team', () => {
    expect(meterUpdater({ team: [] }, {
      type: types.SET_TEAM,
      payload: []
    })).toEqual(
      { "idInUse": false, "team": undefined, "teamName": undefined }
    )
  })

  it('should return initial state as default', () => {
    expect(meterUpdater(undefined, { type: types.ABC })).toEqual({ "idInUse": false, "team": [], "teamName": null })
  });
})
