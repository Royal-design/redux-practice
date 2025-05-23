import { useGetAllProductsQuery } from "../app/service/dummyData";

export const AllProduct = () => {
  const { data, isError, isLoading } = useGetAllProductsQuery({});
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Oops! Error</div>;

  return (
    <div className="">
      {data.products?.map((product: any) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.brand}</p>
        </div>
      ))}
    </div>
  );
};
