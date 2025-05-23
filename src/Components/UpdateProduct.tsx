import { useUpdateProductMutation } from "../app/service/dummyData";

export const UpdateProduct = ({ productId }) => {
  const [updateProduct, { data, isLoading, isError }] =
    useUpdateProductMutation();

  const handleUpdateProduct = async () => {
    try {
      const updateProductData = {
        title: "Yellow Product",
        brand: "Cabin",
        price: 100
      };
      await updateProduct({
        id: productId,
        updatedProduct: updateProductData
      });
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
      <button onClick={handleUpdateProduct} disabled={isLoading}>
        Update Product
      </button>
    </div>
  );
};
