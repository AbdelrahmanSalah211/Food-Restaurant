import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Admin({
  items,
  categories,
  actionRollback,
  handleDeleteProduct,
  handleEditProduct,
  handleAddProduct,
}) {
  const addModalRef = useRef();
  const editModalRef = useRef();
  
  const [addForm, setAddForm] = useState({
    name: "",
    price: "",
    category: "1",
  })

  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    category: "1",
  });

  const handleAddChange = (e) =>{
    setAddForm({
      ...addForm,
      [e.target.name]: e.target.value
    });
  }

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSubmit = async (e) =>{
      e.preventDefault();

      const data = {
        ...addForm,
        id: (parseInt(items[items.length - 1].id) + 1).toString(),
        count: 0,
        isCart: false,
      }
      let itemsBeforeAdd;

      try {
        itemsBeforeAdd = handleAddProduct(data);
        addModalRef.current.close();
        toast.success("Product added successfully");
        const addResponse = await fetch('http://localhost:3000/product', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          }
        })
        if(!addResponse.ok){
          throw new Error("Error adding product")
        }
        setAddForm({
          name: "",
          price: "",
          category: "1",
        });
      } catch (error) {
        actionRollback(itemsBeforeAdd);
        toast.error("Error adding product");
        console.error("Error deleting product", error);
      }
    }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const productId = editModalRef.current.getAttribute("data-id");
    const editedProduct = {
      ...editForm,
      id: productId.toString(),
    };
    let itesmsBeforeEdit;
    try {
      itesmsBeforeEdit = handleEditProduct(editedProduct);
      editModalRef.current.close();
      toast.success("Product edited successfully");
      const editedResponse = await fetch(
        `http://localhost:3000/product/${productId}`,
        {
          method: "PATCH",
          body: JSON.stringify(editedProduct),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (!editedResponse.ok) {
        throw new Error("Error editing product");
      }
    } catch (error) {
      console.error("Error editing product", error);
      actionRollback(itesmsBeforeEdit);
      toast.error("Error editing product. Restoring product");
    }
  };

  const handleDelete = async (id) => {
    let itesmsBeforeDelete;
    try {
      itesmsBeforeDelete = handleDeleteProduct(id);
      toast.success("Product deleted successfully");
      const response = await fetch(`http://localhost:3000/product/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.status !== 200) {
        throw new Error("Error deleting product");
      }
    } catch (error) {
      actionRollback(itesmsBeforeDelete);
      toast.error("Error deleting product. Restoring product");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl m-auto mt-2">
      <button onClick={() => addModalRef.current.showModal()} className="btn btn-primary float-end">
        Add
      </button>
      <div className="overflow-x-auto col-span-2 flex flex-col gap-10 clear-both">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>name</th>
              <th>price</th>
              <th>category</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{categories.find((c) => c.id === item.category).name}</td>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 cursor-pointer text-blue-600 hover:text-blue-800"
                    onClick={() => {
                      setEditForm({
                        name: item.name,
                        price: item.price,
                        category: item.category,
                      });
                      editModalRef.current.setAttribute("data-id", item.id);
                      editModalRef.current.showModal();
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </td>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 cursor-pointer text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(item.id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <dialog ref={editModalRef} className="modal">
          <div className="modal-box">
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-2 ">
                <label htmlFor="name">Name</label>
                <input
                  onChange={handleEditChange}
                  type="text"
                  name="name"
                  id="name"
                  value={editForm.name}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="grid grid-cols-2 ">
                <label htmlFor="price">Price</label>
                <input
                  onChange={handleEditChange}
                  type="number"
                  name="price"
                  id="price"
                  value={editForm.price}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="grid grid-cols-2 ">
                <label htmlFor="categoty">categoty</label>
                <select
                  onChange={handleEditChange}
                  name="category"
                  id="category"
                  value={editForm.category}
                  className="select select-bordered"
                  required
                >
                  {[...categories].splice(1).map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="btn w-24 btn-soft self-center"
                  onClick={() => editModalRef.current.close()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn w-24 btn-primary self-center"
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </dialog>
        <dialog ref={addModalRef} className="modal">
          <div className="modal-box">
            <form onSubmit={handleAddSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-2 ">
                <label htmlFor="name">Name</label>
                <input
                  onChange={handleAddChange}
                  type="text"
                  name="name"
                  id="name"
                  value={addForm.name}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="grid grid-cols-2 ">
                <label htmlFor="price">Price</label>
                <input
                  onChange={handleAddChange}
                  type="number"
                  name="price"
                  id="price"
                  value={addForm.price}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="grid grid-cols-2 ">
                <label htmlFor="categoty">categoty</label>
                <select
                  onChange={handleAddChange}
                  name="category"
                  id="category"
                  value={addForm.category}
                  className="select select-bordered"
                  required
                >
                  {[...categories].splice(1).map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="btn w-24 btn-soft self-center"
                  onClick={() => addModalRef.current.close()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn w-24 btn-primary self-center"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
}
