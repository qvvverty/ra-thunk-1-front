import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { removeService, fetchServices } from '../actions/actionCreators';
import LoadSpinner from './LoadSpinner';

function ServiceList(props) {
  const {items, loading, error} = useSelector(state => state.serviceList);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchServices(dispatch);
  }, [dispatch])

  const handleRemove = id => {
    removeService(dispatch, id);
  }

  const handleEdit = id => {
    props.history.push('/services/' + id);
  }

  if (loading) {
    // return <p>Loading...</p>;
    return (
      <div className="loader-wrapper">
        <LoadSpinner />
      </div>
    )
  }

  if (error) {
    return <p>Something went wrong try again</p>;
  }

  return (
    <ul>
      {items.map(o => (
        <li key={o.id}>
          {o.name} {o.price}
          <button onClick={() => handleEdit(o.id)}>✎</button>
          <button onClick={() => handleRemove(o.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
}

export default ServiceList
