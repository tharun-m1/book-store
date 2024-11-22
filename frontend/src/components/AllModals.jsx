import React from "react";
import { useSelector } from "react-redux";
import LogoutModal from "./LogoutModal";
import AddBookModal from "./AddBookModal";
import DeleteModal from "./DeleteModal";

function AllModals() {
  const logout = useSelector((state) => state.logout.show);
  const book_modal = useSelector((state) => state.bookModal.show);
  const delete_modal = useSelector((state) => state.deleteModal.show);
  return (
    <>
      {logout && <LogoutModal />}
      {book_modal && <AddBookModal />}
      {delete_modal && <DeleteModal />}
    </>
  );
}

export default AllModals;
