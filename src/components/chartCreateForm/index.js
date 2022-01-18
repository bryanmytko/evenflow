import React from 'react';

const ChartCreateForm = (props) => {
  return <>
    <div
      style={{ left: props.position.x, top: props.position.y }}
      className={`chart-create-form card ${(props.state.hidden ? 'hide' : '')}`}>
      <label>
        <input type="checkbox"
          className="white"
          checked={!!props.state.terminating}
          onChange={
            () => props.dispatch({ type: 'TERMINATING' })
          } />
        <span>Terminating node?</span>
      </label>
      <input value={props.state.formData.title}
        placeholder="Title"
        onChange={e => props.dispatch({
          type: 'VALUE_CHANGE',
          formData: { title: e.target.value }
        })} />
      <div className={ props.state.terminating ? 'hide' : '' }>
        <button className="btn" onClick={props.createChild}>Save Node</button>
      </div>
      <div className={ props.state.terminating ? '' : 'hide' }>
        <textarea value={props.state.formData.payload} onChange={
          e => props.dispatch({ type: 'VALUE_CHANGE', formData: { payload: e.target.value }})}>
        </textarea>
        <button className="btn" onClick={props.createChild}>Save Node</button>
      </div>
    </div>
  </>
};

export default ChartCreateForm;