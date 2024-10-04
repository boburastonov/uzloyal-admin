import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Faqs = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [titleEn, setTitleEn] = useState();
  const [titleUz, setTitleUz] = useState();
  const [titleRu, setTitleRu] = useState();
  const [titleTr, setTitleTr] = useState();
  const [titleZh, setTitleZh] = useState();
  const [textEn, setTextEn] = useState();
  const [textUz, setTextUz] = useState();
  const [textRu, setTextRu] = useState();
  const [textTr, setTextTr] = useState();
  const [textZh, setTextZh] = useState();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  /* FormData datas */
  const formData = new FormData();
  formData.append("title_en", titleEn);
  formData.append("title_uz", titleUz);
  formData.append("title_ru", titleRu);
  formData.append("title_tr", titleTr);
  formData.append("title_zh", titleZh);
  formData.append("text_en", textEn);
  formData.append("text_uz", textUz);
  formData.append("text_ru", textRu);
  formData.append("text_tr", textTr);
  formData.append("text_zh", textZh);

  /* Open Add Modal */
  const openAddModal = () => {
    setOpenModal(true);
    setEditModal(false);
  };

  /* Open Edit Modal */
  const openEditModal = (status, item) => {
    setEditModal(true);
    setOpenModal(false);
    setIdBtn(item?.id);
  };

  /* Close All Modals */
  const closeAllModals = () => {
    setOpenModal(false);
    setEditModal(false);
  };

  /* When window clicked, opened all modals were close */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.id === "modal-background"
      ) {
        closeAllModals();
      }
    };

    if (openModal || editModal) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [openModal, editModal]);

  /* Get datas from API */
  const getFunction = () => {
    axios
      .get("https://api.dezinfeksiyatashkent.uz/api/faqs")
      .then((res) => setData(res?.data?.data))
      .catch((err) => console.error("API request failed: ", err));
  };

  useEffect(() => {
    getFunction();
  }, []);

  /* Add Function */
  const addFunction = (e) => {
    e.preventDefault(); // Form submitlashi oldini olish uchun
    setIsLoading(true);
    axios
      .post("https://api.dezinfeksiyatashkent.uz/api/faqs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          setOpenModal(false);
          getFunction(); // Ma'lumotlarni yangilash uchun chaqirish
        } else {
          toast.error(res?.data?.message);
          console.error("API request failed: ", res?.data?.message);
        }
      })
      .catch((err) => console.error("API request failed: ", err))
      .finally(() => {
        setIsLoading(false); // Tugma yuklanishdan chiqadi
      });
  };

  /* Edit Function */
  const [idBtn, setIdBtn] = useState();
  const editFunction = (e) => {
    e.preventDefault(); // Form submitlashi oldini olish uchun
    setIsLoading(true);
    axios
      .put(`https://api.dezinfeksiyatashkent.uz/api/faqs/${idBtn}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  /* Delete function */
  const deleteFunction = (id) => {
    setIsLoading(true); // Yuklanishni boshlash
    axios
      .delete(`https://api.dezinfeksiyatashkent.uz/api/faqs/${id}`, {
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
        <div1
          id="modal-background"
          className="fixed top-0 h-full w-full z-50 flex items-center justify-center bg-[#00000072]"
        >
          <div className="flex justify-center h-[100vh] w-2/3 m-2">
            <form
              onSubmit={addFunction}
              className="w-full bg-white shadow-md p-6 overflow-auto"
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="titleEn"
                  >
                    Title En
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTitleEn(e?.target?.value)}
                    name="titleEn"
                    id="titleEn"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="titleUz"
                  >
                    Title Uz
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTitleUz(e?.target?.value)}
                    name="titleUz"
                    id="titleUz"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="titleRu"
                  >
                    Title Ru
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTitleRu(e?.target?.value)}
                    name="titleRu"
                    id="titleRu"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="titleTr"
                  >
                    Title Tr
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTitleTr(e?.target?.value)}
                    name="titleTr"
                    id="titleTr"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="titleZh"
                  >
                    Title Zh
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTitleZh(e?.target?.value)}
                    name="titleZh"
                    id="titleZh"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="textEn"
                  >
                    Text En
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTextEn(e?.target?.value)}
                    name="textEn"
                    id="textEn"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="textUz"
                  >
                    Text Uz
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTextUz(e?.target?.value)}
                    name="textUz"
                    id="textUz"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="textRu"
                  >
                    Text Ru
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTextRu(e?.target?.value)}
                    name="textRu"
                    id="textRu"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="textTr"
                  >
                    Text Tr
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTextTr(e?.target?.value)}
                    name="textTr"
                    id="textTr"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="textZh"
                  >
                    Text Zh
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTextZh(e?.target?.value)}
                    name="textZh"
                    id="textZh"
                    required
                  />
                </div>
                <div className="w-full md:w-full px-3 mb-6">
                  <button className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:opacity-85">
                    {isLoading ? "Adding new data..." : "Add Category"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div1>
      ) : editModal ? (
        /*Edit  Modal */
        <div
          id="modal-background"
          className="fixed top-0 h-full w-full z-50 flex items-center justify-center bg-[#00000072]"
        >
          <div className="flex justify-center h-[100vh] w-2/3 m-2">
            <form
              onSubmit={editFunction}
              className="w-full bg-white shadow-md p-6 overflow-auto"
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="titleEn"
                  >
                    Title En
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTitleEn(e?.target?.value)}
                    name="titleEn"
                    id="titleEn"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="titleUz"
                  >
                    Title Uz
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTitleUz(e?.target?.value)}
                    name="titleUz"
                    id="titleUz"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="titleRu"
                  >
                    Title Ru
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTitleRu(e?.target?.value)}
                    name="titleRu"
                    id="titleRu"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="titleTr"
                  >
                    Title Tr
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTitleTr(e?.target?.value)}
                    name="titleTr"
                    id="titleTr"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="titleZh"
                  >
                    Title Zh
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTitleZh(e?.target?.value)}
                    name="titleZh"
                    id="titleZh"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="textEn"
                  >
                    Text En
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTextEn(e?.target?.value)}
                    name="textEn"
                    id="textEn"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="textUz"
                  >
                    Text Uz
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTextUz(e?.target?.value)}
                    name="textUz"
                    id="textUz"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="textRu"
                  >
                    Text Ru
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTextRu(e?.target?.value)}
                    name="textRu"
                    id="textRu"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="textTr"
                  >
                    Text Tr
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTextTr(e?.target?.value)}
                    name="textTr"
                    id="textTr"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="textZh"
                  >
                    Text Zh
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e) => setTextZh(e?.target?.value)}
                    name="textZh"
                    id="textZh"
                    required
                  />
                </div>
                <div className="w-full md:w-full px-3 mb-6">
                  <button className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:opacity-85">
                    {isLoading ? "Updating data..." : "Update Category"}
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
                    Name
                  </th>
                  <th className="bg-gray-700 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                    Actions
                  </th>
                  <th className="bg-gray-700 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                    <button
                      onClick={openAddModal}
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
                        {item?.text_uz}
                      </td>
                      <td
                        key={item?.index}
                        className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                      >
                        <button
                          onClick={() => openEditModal(true, item)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3"
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                          onClick={() => deleteFunction(id)}
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
      <ToastContainer />
    </section>
  );
};

export default Faqs;
