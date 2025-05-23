import { useDeleteProductMutation } from "../app/service/dummyData";

export const DeleteProduct = ({ productId }) => {
  const [deleteProduct, { data, isLoading, error }] =
    useDeleteProductMutation();

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(productId);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Oops! Error</div>;
  return (
    <div>
      <h3>{data?.title ? `${data.title} successfully deleted` : ""}</h3>
      <button onClick={() => handleDeleteProduct} disabled={isLoading}>
        Delete Product
      </button>
    </div>
  );
};
