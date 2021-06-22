import React from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Http from '../../models/Http';

const DeleteItem = (props) => {
  const id = useParams().id;
  const deleteItem = async () => await Http.deleteItem(`users/${id}`);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'ui button red',
      cancelButton: 'ui button',
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        deleteItem();
        swalWithBootstrapButtons.fire('Deleted!', 'Your user has been deleted.', 'success');
        props.history.replace('/admins/users');
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire('Cancelled', 'Your user is safe :)', 'error');
        props.history.replace('/admins/users');
      }
    });
  return null;
};
export default DeleteItem;
