import React, { useEffect, useState } from 'react';
import LinkForm from './LinkForm';
import { db } from '../firebase';
import { toast } from 'react-toastify';

const Links = () => {

  const [links, setLinks] = useState([]);
  const [currentId, setCurrentID] = useState('');

  const addTask = async (linkObject) => {
    if (currentId === '') {
      await db.collection('links').doc().set(linkObject);
      toast('New task add', {
        type: "success",
        position: "bottom-center"
      });
    } else {
      await db.collection('links').doc(currentId).update(linkObject);
      toast('updated', {
        type: "success",
        position: "bottom-center"
      });
      setCurrentID('');
    }
  };

  const getLinks = () => {
    // const querySnapshot = await db.collection('links').get(); solo obtiene una vez los datos
    db.collection('links').onSnapshot((querySnapshot) => {
      const docs = [];

      querySnapshot.forEach(doc => {
        docs.push({ ...doc.data(), id: doc.id });
      });

      setLinks(docs);

    });
  };

  const onDeleteLink = async id => {
    if (window.confirm('desea eliminar el enlace?')) {
      await db.collection('links').doc(id).delete();
      toast('success deleted', {
        type: "success",
        position: "bottom-center"
      });
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <div className="col-md-4 p-2">
        <LinkForm
          {...{ addTask, currentId, links }}
        />
      </div>
      <div className="col-md-8 p-2">
        {
          links.map(item => (
            <div key={item.id} className="card mb-1">
              <div className="card-body">

                <div className="d-flex justify-content-between">
                  <h4>{item.name}</h4>
                  <div>
                    <i className="material-icons text-danger" onClick={() => onDeleteLink(item.id)}>close</i>
                    <i className="material-icons text-danger" onClick={() => setCurrentID(item.id)}>create</i>
                  </div>
                </div>

                <p>{item.description}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer">Go to web site</a>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Links;