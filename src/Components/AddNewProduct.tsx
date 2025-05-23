import { useAddNewProductMutation } from "../app/service/dummyData";

export const AddNewProduct = () => {
  const [addNewProduct, { data, isLoading, isError }] =
    useAddNewProductMutation();
  const handleAddNewProduct = async () => {
    try {
      const newProduct = {
        id: 1,
        title: "Biscuit Product",
        brand: "Cabin",
        price: 100
      };
      await addNewProduct(newProduct);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Oops! Error</div>}
      {data && (
        <div>
          <h3>{data.title}</h3>
          <p>{data.brand}</p>
        </div>
      )}
      <button onClick={handleAddNewProduct} disabled={isLoading}>
        Add New Product
      </button>
    </div>
  );
};
