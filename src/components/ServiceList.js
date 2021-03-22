import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { removeService, fetchServices, changeServiceField } from '../actions/actionCreators';
import LoadingSpinner from './LoadingSpinner';
import Error from './Error';

function ServiceList(props) {
  const {items, loading, error} = useSelector(state => state.serviceList);
  const dispatch = useDispatch();

  const [reload, setReload] = useState(false);
  const reloadComponent = () => {
    setReload(!reload);
  }

  useEffect(() => {
    fetchServices(dispatch);
  }, [dispatch, reload]);

  const handleRemove = id => {
    removeService(dispatch, id);
  }

  const handleEdit = id => {
    dispatch(changeServiceField('id', id));
    props.history.push('/services/' + id);
  }

  if (loading) {
    // return <p>Loading...</p>;
    return (
      <div className="loader-wrapper">
        <LoadingSpinner />
      </div>
    )
  }

  // if (error) return (
  //   <Error reload={reloadComponent} errorMessage={error} />
  // );

  return (
    <ul>
      {items.map(o => (
        <li key={o.id}>
          {o.name} {o.price}
          <button onClick={() => handleEdit(o.id)}>✎</button>
          <button onClick={() => handleRemove(o.id)}>✕</button>
        </li>
      ))}
      {error && <Error reload={reloadComponent} errorMessage={error} />}
    </ul>
  );
}

export default ServiceList
