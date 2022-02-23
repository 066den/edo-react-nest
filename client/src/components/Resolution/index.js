import { useCallback } from "react";
import Executor from "./Executor";

const Resolution = ({ executors, setExecutors }) => {
  const delExecutor = useCallback((exId) => {
    setExecutors((prevValue) => prevValue.filter((el) => el.id !== exId));
  }, []);

  const addComment = (id, comment) => {
    setExecutors(
      executors.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            comment: comment,
          };
        } else {
          return el;
        }
      })
    );
  };

  return (
    <div className="resolution">
      {executors.map((el) => (
        <Executor
          key={el.id}
          id={el.id}
          name={el.full_name}
          delExecutor={delExecutor}
          addComment={addComment}
        />
      ))}
    </div>
  );
};

export default Resolution;
