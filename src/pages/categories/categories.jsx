"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { OpenContext } from "../../layout/layout";

const Categories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState();
  const [parentID, setParentID] = useState();
  const [name, setName] = useState();
  const { open } = useContext(OpenContext);
  const [description, setDescription] = useState();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const formData = new FormData();

  formData.append("parent_id", parentID);
  formData.append("name", name);
  formData.append("description", description);

  //!add categories modal open function
  const openAddModalItem = () => {
    setOpenModal(true);
    setEditModal(false);
  };
  const closeModalItem = () => {
    setOpenModal(false);
    setEditModal(false); // Edit modalni yopish
  };

  //!close two edit and add modal items
  const editModalFunction = (status, item) => {
    setOpenModal(false);
    setEditModal(true);
    setIdBtn(item?.id);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.id === "modal-background"
      ) {
        closeModalItem();
      }
    };

    if (openModal || editModal) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [openModal, editModal]);

  //Get datas from backend
  const getFunction = () => {
    axios
      .get("https://api.dezinfeksiyatashkent.uz/api/categories")
      .then((res) => setData(res?.data?.data))
      .catch((err) => console.error("API request failed: ", err));
  };
  useEffect(() => {
    getFunction();
  }, []);

  //Add function
  const addFunction = (e) => {
    e.preventDefault(); // Form submitlashi oldini olish uchun
    setIsLoading(true);
    axios
      .post("https://api.dezinfeksiyatashkent.uz/api/categories", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res?.data;
        if (data?.success) {
          toast.success(data?.message);
          setOpenModal(false);
          getFunction();
        } else {
          toast.error(data?.message);
          console.error("API request failed: ", res?.data?.message);
        }
      })
      .catch((err) => console.error("API request failed: ", err))
      .finally(() => {
        setIsLoading(false); // Tugma yuklanishdan chiqadi
      });
  };

  /* Edit function */
  const [idBtn, setIdBtn] = useState();
  const editFunction = (e) => {
    e.preventDefault(); // Form submitlashi oldini olish uchun
    setIsLoading(true);
    axios
      .put(
        `https://api.dezinfeksiyatashkent.uz/api/categories/${idBtn}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          setEditModal(false);
          getFunction(); // Ma'lumotlarni yangilash uchun chaqirish
        } else {
          toast.error(res?.data?.message);
          console.error(res?.data?.message);
        }
      })
      .catch((err) => console.error("API request failed: ", err))
      .finally(() => {
        setIsLoading(false); // Tugma yuklanishdan chiqadi
      });
  };

  /* Delete Function */
  const deleteFunction = (id) => {
    setIsLoading(true); // Yuklanishni boshlash
    axios
      .delete(`https://api.dezinfeksiyatashkent.uz/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          getFunction(); // Ma'lumotlarni yangilash uchun chaqirish
        } else {
          toast.error(res?.data?.message);
          console.error("API request failed: ", err);
        }
      })
      .catch((err) => console.error("API request failed: ", err))
      .finally(() => {
        setIsLoading(false); // Yuklanish tugadi
      });
  };

  return (
    <section>
      {openModal ? (
        /* Open Modal */
        <div
          id="modal-background"
          className="fixed top-0 h-full w-full z-50 flex items-center justify-center bg-[#00000072]"
        >
          <div className="flex justify-center w-2/3 m-2">
            <form
              onSubmit={addFunction}
              className="w-full bg-white shadow-md p-6"
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setName(e?.target?.value)}
                    name="name"
                    id="name"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setDescription(e?.target?.value)}
                    name="description"
                    id="description"
                    required
                  />
                </div>
                <div className="w-full md:w-full px-3 mb-6">
                  <button className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:opacity-85">
                    {isLoading ? "Adding new data..." : "Add Category "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : editModal ? (
        /*Edit Modal */
        <div
          id="modal-background"
          className="fixed top-0 h-full w-full z-50 flex items-center justify-center bg-[#00000072]"
        >
          <div className="flex justify-center w-2/3 m-2">
            <form
              onSubmit={editFunction}
              className="w-full bg-white shadow-md p-6"
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setName(e?.target?.value)}
                    name="name"
                    id="name"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setDescription(e?.target?.value)}
                    name="description"
                    id="description"
                    required
                  />
                </div>
                <div className="w-full md:w-full px-3 mb-6">
                  <button className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:opacity-85">
                    {isLoading ? "Updating data..." : "Update data"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      {
        <div
          className={`${
            open ? "w-[84.4%]" : "w-[93.8%]"
          } fixed top-[60px] bottom-[57px] right-0 p-[30px] ml-auto bg-[#4094f726] transition-all duration-[0.3s]`}
        >
          <div className="w-full h-[72vh] overflow-scroll overflow-x-hidden">
            <table className="w-full h-full border-collapse block md:table overflow-y-scroll">
              <thead className="block md:table-header-group sticky top-0">
                <tr className="border md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                  <th className="bg-gray-700 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                    &#8470;
                  </th>
                  <th className="bg-gray-700 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                    ID
                  </th>
                  <th className="bg-gray-700 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                    Name
                  </th>
                  <th className="bg-gray-700 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                    Description
                  </th>
                  <th className="bg-gray-700 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                    Actions
                  </th>
                  <th className="bg-gray-700 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                    <button
                      onClick={openAddModalItem}
                      className="bg-[#1677ff] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Add Categories
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {data &&
                  Array.isArray(data) &&
                  data.map((item, index) => (
                    <tr
                      key={item?.id}
                      className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                    >
                      <td
                        key={item?.index}
                        className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                      >
                        {index + 1}
                      </td>
                      <td
                        key={item?.index}
                        className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                      >
                        {item?.id}
                      </td>
                      <td
                        key={item?.index}
                        className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                      >
                        {item?.name}
                      </td>
                      <td
                        key={item?.index}
                        className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                      >
                        {item?.description}
                      </td>
                      <td
                        key={item?.index}
                        className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                      >
                        <button
                          onClick={() => editModalFunction(true, item)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3"
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                          onClick={() => deleteFunction(item?.id)}
                          disabled={isLoading}
                        >
                          {isLoading ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                      <td
                        key={item?.index}
                        className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                      ></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </section>
  );
};

export default Categories;
