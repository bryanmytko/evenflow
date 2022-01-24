import React from 'react';

import { Error } from '../';

import './style.css';

const ChartCreateForm = (props) => {
  const { formData, hasChildren } = props.state;
  return <>
    <div
      style={{ left: props.position.x, top: props.position.y }}
      className={`chart-create-form card ${props.state.hidden ? 'hide' : '' }`}>
      <Error error={props.error} />
      <label className={(formData._id && hasChildren) ? 'hide' : '' }>
        <input type="checkbox"
          className="white"
          checked={!!props.state.terminating}
          onChange={
            () => props.dispatch({ type: 'TERMINATING' })
          } />
        <span>Terminating node?</span>
      </label>
      <input value={props.state.formData.title}
        placeholder={props.state.formData.title}
        onChange={e => props.dispatch({
          type: 'VALUE_CHANGE',
          formData: { title: e.target.value }
        })} />
      <div className={ props.state.terminating ? 'hide' : '' }>
        <button className="btn" onClick={props.action}>Save Node</button>
      </div>
      <div className={ props.state.terminating ? '' : 'hide' }>
        <textarea value={props.state.formData.payload} onChange={
          e => props.dispatch({ type: 'VALUE_CHANGE', formData: { payload: e.target.value }})}>
        </textarea>
        <button className="btn" onClick={props.action}>Save Node</button>
      </div>
    </div>
  </>
};

export default ChartCreateForm;
