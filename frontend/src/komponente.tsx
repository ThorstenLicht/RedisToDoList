import { useEffect, useState } from "react";

export const apiUrl = `http://localhost:8080/api`;

function GetData() {
  const [data, setData] = useState<string>("");

  const loadData = async (): Promise<string> => {
    try {
      const request = await fetch(`${apiUrl}/test`);
      const response = await request.json();
      return response;
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result: string = await loadData();
      setData(result);
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <div>
      <p>Hallo du,</p>
      {data}
    </div>
  );
}
export default GetData;
