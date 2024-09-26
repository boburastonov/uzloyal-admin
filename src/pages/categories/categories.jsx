import React from "react";

const Categories = () => {
  return (
    <div
      className={`${
        open ? "w-[84.4%]" : "w-[93.8%]"
      } fixed top-[60px] bottom-[57px] right-0 p-[30px] ml-auto bg-[#4094f726] transition-all duration-[0.3s]`}
    >
      <div className="w-full h-[72vh] overflow-scroll overflow-x-hidden">
        <table className="w-full h-full border-collapse block md:table overflow-y-scroll">
          <thead className="block md:table-header-group sticky top-0">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                &#8470;
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                Name
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                Image
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                Actions
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                <button
                  onClick={openModalItem}
                  className="bg-[#1677ff] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  Add Brand
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {filteredData &&
              Array.isArray(filteredData) &&
              filteredData.map((item, index) => (
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
                    {item?.title}
                  </td>
                  <td
                    key={item?.index}
                    className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                  >
                    <Image
                      src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`}
                      width={60}
                      height={60}
                      alt={item?.title}
                    />
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
                    >
                      Delete
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
  );
};

export default Categories;
