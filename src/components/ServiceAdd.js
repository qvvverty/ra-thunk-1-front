import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceField, addService, fetchService } from '../actions/actionCreators';
import LoadingSpinner from './LoadingSpinner';
import Error from './Error';

function ServiceAdd(props) {
  const {item, loading, error} = useSelector(state => state.serviceAdd);
  const dispatch = useDispatch();

  const [reload, setReload] = useState(false);
  const reloadComponent = () => {
    setReload(!reload);
  }

  useEffect(() => {
    fetchService(dispatch, props.match.params.id);
  }, [dispatch, props.match.params.id, reload]);

  const handleChange = evt => {
    const {name, value} = evt.target;
    dispatch(changeServiceField(name, value));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    addService(dispatch, item.name, item.price);
  }

  const handleCancel = evt => {
    evt.preventDefault();
    props.history.push('/services');
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
    <form onSubmit={handleSubmit}>
      <input name='name' onChange={handleChange} value={item.name} placeholder="name" />
      <input name='price' onChange={handleChange} value={item.price} placeholder="price" />
      <input name='content' onChange={handleChange} value={item.content} placeholder="content" />
      <button type='submit' disabled={loading || error}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
      {error && <Error reload={reloadComponent} errorMessage={error} />}
    </form>
  );
}

export default ServiceAdd;
