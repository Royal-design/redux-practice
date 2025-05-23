import { useGetProductByIdQuery } from "../app/service/dummyData";

export const SpecificProduct = () => {
  const { data, isError, isLoading } = useGetProductByIdQuery(2);

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
    </div>
  );
};
